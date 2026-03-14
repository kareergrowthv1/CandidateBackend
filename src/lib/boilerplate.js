/**
 * Boilerplate code for Judge0 run (JavaScript, Java, Python).
 * Used to populate MongoDB boilerplateByLanguage and by run-code when building full source.
 */

function toSnakeCase(name) {
  if (!name) return 'solution';
  return name.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

/**
 * Returns boilerplate for each language. Used for the given function name and signature.
 * - javascript / python: runner only (prepend user code when running).
 * - java: full class with __USER_CODE__ placeholder (replace with user's static method when running).
 * @param {string} functionName - e.g. "scoresIncreasing"
 * @param {string} functionSignature - e.g. "public boolean scoresIncreasing(int[] scores)"
 * @returns {{ javascript: string, python: string, java: string }}
 */
function getBoilerplateByLanguage(functionName, functionSignature) {
  const fn = functionName || 'solution';
  const snake = toSnakeCase(fn);
  const sig = (functionSignature || '').toLowerCase();
  const useStringArray = sig.includes('string[]');
  const useIntArray = !useStringArray || sig.includes('int[]');

  const javascript = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const lines = input.split(/\\n/).map(s => s.trim()).filter(Boolean);
for (const line of lines) {
  let args = [];
  try { args = JSON.parse(line); } catch (_) { args = [line]; }
  if (!Array.isArray(args)) args = [args];
  const result = args.length === 1 ? ${fn}(args[0]) : ${fn}(...args);
  console.log(result);
}
`.trim();

  const python = `
import json, sys
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    try:
        args = json.loads(line)
    except Exception:
        args = []
    if not isinstance(args, list):
        args = [args]
    result = ${snake}(*args) if len(args) != 1 else ${snake}(args[0])
    print(result)
`.trim();

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

  const java = `import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

class Main {
__USER_CODE__

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

  return { javascript, python, java };
}

module.exports = { getBoilerplateByLanguage, toSnakeCase };
