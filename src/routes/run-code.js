/**
 * Run code via Judge0 (RapidAPI) for CandidateFrontend Practice.
 * Wraps user code in language-specific boilerplate that reads test input from stdin,
 * calls the user's function with those args, and prints the result.
 * Judge0 API key is loaded from superadmin_db.settings (key: judge0Settings).
 */
const express = require('express');
const router = express.Router();
const { getBoilerplateByLanguage, toSnakeCase } = require('../lib/boilerplate');
const { pool } = require('../config/db');

const JUDGE0_SETTINGS_KEY = 'judge0Settings';
const JUDGE0_CACHE_TTL_MS = 60 * 1000;
const LANGUAGE_IDS = {
  javascript: 63,
  js: 63,
  python: 71,
  python3: 71,
  java: 62,
};

let judge0Cache = {
  fetchedAt: 0,
  config: null,
};

function parseJudge0ConfigValue(rawValue) {
  if (!rawValue) return null;
  try {
    const parsed = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    if (!parsed) return null;
    if (typeof parsed !== 'object') return null;

    const apiKeyCandidate = [parsed.apiKey, parsed.rapidApiKey].find(
      (v) => typeof v === 'string' && v.trim().length > 0
    );
    const apiKey = String(apiKeyCandidate ?? '').trim();
    const baseUrl = String(parsed.baseUrl ?? '').trim().replace(/\/+$/, '');
    let apiHost = String(parsed.apiHost ?? '').trim();
    if (!apiHost && baseUrl) {
      try {
        apiHost = new URL(baseUrl).host;
      } catch (_) {
        apiHost = '';
      }
    }
    if ([apiKey, baseUrl, apiHost].some((v) => !v)) return null;
    return { apiKey, baseUrl, apiHost };
  } catch (_) {
    return null;
  }
}

async function getJudge0Config() {
  const now = Date.now();
  if (judge0Cache.config && (now - judge0Cache.fetchedAt) < JUDGE0_CACHE_TTL_MS) {
    return judge0Cache.config;
  }

  let dbConfig = null;
  try {
    const [rows] = await pool.query(
      'SELECT `value` FROM superadmin_db.settings WHERE `key` = ? LIMIT 1',
      [JUDGE0_SETTINGS_KEY]
    );
    if (rows.length > 0) {
      dbConfig = parseJudge0ConfigValue(rows[0].value);
    }
  } catch (err) {
    console.warn('[run-code] Failed to load Judge0 config from DB:', err.message);
  }

  const config = {
    apiKey: dbConfig?.apiKey ?? '',
    baseUrl: dbConfig?.baseUrl ?? '',
    apiHost: dbConfig?.apiHost ?? '',
  };

  judge0Cache = {
    fetchedAt: now,
    config,
  };
  return config;
}

function getLanguageId(lang) {
  const key = (lang || '').toLowerCase().trim();
  return LANGUAGE_IDS[key] ?? 71;
}

/** Extract content inside the first matching parentheses (e.g. "[1, 3, 4]" from "scoresIncreasing([1, 3, 4])"). */
function extractArgsFromInput(inputStr) {
  if (!inputStr || typeof inputStr !== 'string') return '';
  const open = inputStr.indexOf('(');
  if (open === -1) return inputStr.trim();
  let depth = 1;
  for (let i = open + 1; i < inputStr.length; i++) {
    const c = inputStr[i];
    if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth === 0) return inputStr.substring(open + 1, i).trim();
    }
  }
  return inputStr.substring(open + 1).trim();
}

/** Normalize test input to a single JSON array line for stdin (runner parses as args array). */
function normalizeStdinForTestCase(inputStr) {
  const inner = extractArgsFromInput(inputStr);
  if (!inner) return '[]';
  return '[' + inner + ']';
}

/** Get function name from Java-style signature (e.g. "public boolean scoresIncreasing(int[] scores)" -> "scoresIncreasing"). */
function getFunctionName(signature) {
  if (!signature || typeof signature !== 'string') return 'solution';
  const m = signature.trim().match(/\b(\w+)\s*\(/);
  return m ? m[1] : 'solution';
}

/**
 * Build full runnable source: user code + boilerplate. Uses stored boilerplateByLanguage from MongoDB when provided.
 */
function buildFullSourceCode(language, functionName, _functionSignature, userCode, boilerplateByLanguage) {
  const lang = (language || 'javascript').toLowerCase().trim();
  const fn = functionName || 'solution';
  const snake = toSnakeCase(fn);
  const code = (userCode || '').trim();
  const stored = boilerplateByLanguage && typeof boilerplateByLanguage === 'object';

  if (lang === 'javascript' || lang === 'js') {
    const boiler = stored && boilerplateByLanguage.javascript
      ? boilerplateByLanguage.javascript
      : getBoilerplateByLanguage(fn, _functionSignature).javascript;
    return code + '\n\n' + boiler;
  }

  if (lang === 'python' || lang === 'python3') {
    const boiler = stored && boilerplateByLanguage.python
      ? boilerplateByLanguage.python
      : getBoilerplateByLanguage(fn, _functionSignature).python;
    return code + '\n\n' + boiler;
  }

  if (lang === 'java') {
    // 1. Remove "public class {Name} {" and the final "}" if present
    let innerCode = code;
    const classMatch = innerCode.match(/(?:public\s+)?class\s+\w+\s*\{/);
    if (classMatch) {
      innerCode = innerCode.substring(classMatch.index + classMatch[0].length);
      const lastBrace = innerCode.lastIndexOf('}');
      if (lastBrace !== -1) {
        innerCode = innerCode.substring(0, lastBrace) + innerCode.substring(lastBrace + 1);
      }
    }

    // 2. Ensure the main or solution method is static
    const withStatic = innerCode.replace(/\bpublic\s+(?!static)((?:\w+(?:\[\])?|<.*>)?)\s+(\w+)\s*\(/, 'public static $1 $2 (');

    // 3. For raw code execution (LessonPage), we just use the user's code directly as Main
    // but we need to ensure their class is called Main and isn't public.
    if (!boilerplateByLanguage && !_functionSignature) {
      let rawClassAdjusted = code.replace(/public\s+class\s+\w+/, 'class Main');
      rawClassAdjusted = rawClassAdjusted.replace(/class\s+\w+/, 'class Main');
      return rawClassAdjusted;
    }

    const javaBoiler = stored && boilerplateByLanguage.java
      ? boilerplateByLanguage.java.replace('__USER_CODE__', withStatic)
      : null;
    if (javaBoiler) return javaBoiler;
    const sig = (_functionSignature || '').toLowerCase();
    const useStringArray = sig.includes('string[]');
    const useIntArray = !useStringArray || sig.includes('int[]');
    let mainBody;
    if (useStringArray && !useIntArray) {
      mainBody = `
            Object parsed = parseJsonArgs(line);
            if (parsed instanceof String[]) {
                System.out.println(${fn}((String[]) parsed));
            } else if (parsed instanceof Object[]) {
                Object[] oa = (Object[]) parsed;
                if (oa.length == 1 && oa[0] instanceof String[]) {
                    System.out.println(${fn}((String[]) oa[0]));
                } else {
                    System.out.println(${fn}(new String[0]));
                }
            } else {
                System.out.println(${fn}(new String[0]));
            }`;
    } else {
      mainBody = `
            Object parsed = parseJsonArgs(line);
            if (parsed instanceof int[]) {
                System.out.println(${fn}((int[]) parsed));
            } else if (parsed instanceof Object[]) {
                Object[] oa = (Object[]) parsed;
                if (oa.length == 1 && oa[0] instanceof int[]) {
                    System.out.println(${fn}((int[]) oa[0]));
                } else {
                    int[] ints = new int[oa.length];
                    for (int i = 0; i < oa.length; i++) ints[i] = ((Number) oa[i]).intValue();
                    System.out.println(${fn}(ints));
                }
            } else {
                System.out.println(${fn}(new int[0]));
            }`;
    }
    return `import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

class Main {
${withStatic}

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line == null) line = "";
            line = line.trim();
            if (line.isEmpty()) continue;
            ${mainBody.trim()}
        }
    }

    private static Object parseJsonArgs(String s) {
        if (s == null || s.isEmpty()) return new int[0];
        s = s.trim();
        if (s.startsWith("[[") && s.endsWith("]]")) {
            String inner = s.substring(2, s.length() - 2).trim();
            return parseOneArray(inner);
        }
        if (s.startsWith("[") && s.endsWith("]")) {
            String inner = s.substring(1, s.length() - 1).trim();
            if (inner.isEmpty()) return new int[0];
            if (inner.startsWith("\\"")) return parseStringArray(inner);
            return parseOneArray(inner);
        }
        return new int[0];
    }

    private static int[] parseOneArray(String s) {
        List<Integer> list = new ArrayList<>();
        String[] parts = s.split(",");
        for (String p : parts) {
            String t = p.trim().replaceAll("[\\\\[\\\\]]", "");
            if (!t.isEmpty()) list.add(Integer.parseInt(t));
        }
        int[] out = new int[list.size()];
        for (int i = 0; i < list.size(); i++) out[i] = list.get(i);
        return out;
    }

    private static String[] parseStringArray(String s) {
        List<String> list = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '"') {
                i++;
                StringBuilder sb = new StringBuilder();
                while (i < s.length() && s.charAt(i) != '"') {
                    if (s.charAt(i) == '\\\\') i++;
                    if (i < s.length()) sb.append(s.charAt(i++));
                }
                list.add(sb.toString());
            }
            i++;
        }
        return list.toArray(new String[0]);
    }
}
`;
  }

  return code;
}

function normalizeOutput(s) {
  if (s == null || s === undefined) return '';
  return String(s).trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function outputsMatch(actual, expected) {
  const a = normalizeOutput(actual);
  const e = normalizeOutput(expected);
  if (a === e) return true;
  // Case-insensitive for strings (e.g. "true" vs "True", "false" vs "False")
  if (a.toLowerCase() === e.toLowerCase()) return true;
  try {
    return Math.abs(parseFloat(a) - parseFloat(e)) < 1e-9;
  } catch (_) {
    return false;
  }
}

function base64Encode(str) {
  return Buffer.from(String(str), 'utf8').toString('base64');
}

function base64Decode(str) {
  if (!str) return '';
  try {
    return Buffer.from(String(str), 'base64').toString('utf8');
  } catch (_) {
    return String(str);
  }
}

/** Submit once to Judge0 and poll until done; returns { stdout, stderr, statusId, statusDesc, time, memory } or throws. */
async function submitAndWait({ sourceCode, languageId, stdin, timeoutSeconds, judge0Config }) {
  const key = judge0Config?.apiKey;
  if (!key) throw new Error('Judge0 API key not configured');
  const baseUrl = judge0Config?.baseUrl;
  const apiHost = judge0Config?.apiHost;
  if (!baseUrl || !apiHost) throw new Error('Judge0 base URL/host not configured');

  const payload = {
    language_id: languageId,
    source_code: base64Encode(sourceCode),
    stdin: base64Encode(stdin || ''),
  };

  const subRes = await fetch(`${baseUrl}/submissions?base64_encoded=true&wait=false&fields=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': key,
    },
    body: JSON.stringify(payload),
  });

  if (subRes.status !== 201) {
    const text = await subRes.text();
    throw new Error(`Judge0 submit: ${subRes.status} ${text}`);
  }

  const subJson = await subRes.json();
  const token = subJson.token;
  if (!token) throw new Error('No token from Judge0');

  const deadline = Date.now() + (timeoutSeconds || 10) * 1000;
  let data;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch(`${baseUrl}/submissions/${token}?base64_encoded=true&fields=*`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': key,
      },
    });
    if (res.status !== 200) throw new Error(`Judge0 result: ${res.status}`);
    data = await res.json();
    const statusId = data.status?.id;
    if (statusId !== 1 && statusId !== 2) break;
  }

  return {
    stdout: base64Decode(data?.stdout),
    stderr: base64Decode(data?.stderr) || base64Decode(data?.compile_output) || '',
    statusId: data?.status?.id,
    statusDesc: data?.status?.description || 'Unknown',
    time: data?.time ?? '0',
    memory: data?.memory ?? '0',
  };
}

/** Run all test cases in one Judge0 submission: combined stdin (one line per test), parse stdout to one result per test. */
async function runAllTestCasesInOneSubmission({ sourceCode, languageId, testCases, timeoutSeconds, judge0Config }) {
  const key = judge0Config?.apiKey;
  if (!key) {
    return testCases.map((tc, i) => ({
      testCaseId: tc.testCaseId || `tc-${i}`,
      input: tc.input ?? '',
      expectedOutput: tc.expectedOutput ?? '',
      actualOutput: '',
      passed: false,
      executionTime: '0',
      memoryUsed: '0',
      errorMessage: 'Judge0 API key not configured',
      status: 'System Error',
      locked: false,
    }));
  }

  const combinedStdin = testCases
    .map((tc) => normalizeStdinForTestCase(tc.input ?? ''))
    .join('\n');

  try {
    const { stdout, stderr, statusId, statusDesc, time, memory } = await submitAndWait({
      sourceCode,
      languageId,
      stdin: combinedStdin,
      timeoutSeconds,
      judge0Config,
    });

    const lines = (stdout || '').split(/\r?\n/).map((s) => s.trim());
    const actualOutputs = [];
    if (testCases.length === 1) {
      // For single test case (practice mode), return the full stdout
      actualOutputs.push((stdout || '').trim());
    } else {
      for (let i = 0; i < testCases.length; i++) {
        actualOutputs.push(lines[i] ?? '');
      }
    }

    return testCases.map((tc, i) => {
      const expected = tc.expectedOutput ?? '';
      const actual = actualOutputs[i] ?? '';
      const passed = statusId === 3 && outputsMatch(actual, expected);
      return {
        testCaseId: tc.testCaseId || `tc-${i}`,
        input: tc.input ?? '',
        expectedOutput: expected,
        actualOutput: actual,
        passed,
        executionTime: String(time),
        memoryUsed: String(memory),
        errorMessage: i === 0 ? stderr : '',
        status: statusId === 3 ? (passed ? 'Accepted' : 'Wrong Answer') : statusDesc,
        locked: false,
      };
    });
  } catch (err) {
    return testCases.map((tc, i) => ({
      testCaseId: tc.testCaseId || `tc-${i}`,
      input: tc.input ?? '',
      expectedOutput: tc.expectedOutput ?? '',
      actualOutput: '',
      passed: false,
      executionTime: '0',
      memoryUsed: '0',
      errorMessage: err.message || String(err),
      status: 'System Error',
      locked: false,
    }));
  }
}

const authMiddleware = require('../middlewares/auth.middleware');

/**
 * POST /run-code
 * Body: { sourceCode, language, testCases: [{ testCaseId?, input, expectedOutput }], timeoutSeconds?, functionName?, functionSignature? }
 * Runs ALL test cases in ONE Judge0 submission: combined stdin (one line per test), one execution, parse stdout to one result per test.
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { sourceCode, language, testCases, timeoutSeconds = 10, functionName, functionSignature, boilerplateByLanguage, rawCode } = req.body ?? {};
    if (!sourceCode || typeof sourceCode !== 'string') {
      return res.status(400).json({ success: false, message: 'sourceCode is required' });
    }

    const judge0Config = await getJudge0Config();
    if ([judge0Config?.apiKey, judge0Config?.baseUrl, judge0Config?.apiHost].some((v) => !v)) {
      return res.status(503).json({
        success: false,
        message: 'Judge0 settings are incomplete. Configure apiKey/baseUrl/apiHost in Superadmin > Settings > Judge0.',
      });
    }

    const languageId = getLanguageId(language);

    if (rawCode) {
      let finalCode = sourceCode;
      if (languageId === 62) { // Java
        // Normalize class name to Main and remove public to avoid compilation error
        // Also handle cases where the class name might have extra spaces or newlines
        finalCode = finalCode.replace(/(?:public\s+)?class\s+\w+/, 'class Main');
      }
      const { stdout, stderr, statusId, statusDesc, time, memory } = await submitAndWait({
        sourceCode: finalCode,
        languageId,
        stdin: (Array.isArray(testCases) && testCases.length > 0) ? (testCases[0].input || '') : '',
        timeoutSeconds,
        judge0Config,
      });

      return res.status(200).json({
        success: true,
        data: {
          results: [{
            actualOutput: stdout || '',
            errorMessage: stderr || (statusId > 3 ? statusDesc : ''),
            status: statusDesc,
            executionTime: time,
            memoryUsed: memory,
          }]
        }
      });
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one test case is required when not using rawCode' });
    }

    const lang = (language || 'javascript').toLowerCase().trim();
    const fnName = functionName || getFunctionName(functionSignature);
    const fullSource = buildFullSourceCode(lang, fnName, functionSignature, sourceCode, boilerplateByLanguage);

    const results = await runAllTestCasesInOneSubmission({
      sourceCode: fullSource,
      languageId,
      testCases,
      timeoutSeconds,
      judge0Config,
    });

    return res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (e) {
    console.error('run-code error:', e);
    return res.status(500).json({
      success: false,
      message: e.message || 'Code execution failed',
    });
  }
});

module.exports = router;
