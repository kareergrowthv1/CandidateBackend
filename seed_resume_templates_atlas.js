require('dotenv').config();
const { MongoClient } = require('mongodb');

const TEMPLATES = [
  {
    key: 'classic',
    styleConfig: { fontFamily: 'Georgia, Times New Roman, serif', headingColor: '#171717', bodyColor: '#3f3f46', accentColor: '#2563eb' },
    layout: { type: 'single', header: 'centered-border' },
    sectionStyles: { experience: 'plain', skills: 'dot-join', hobbies: 'plain', languages: 'plain' },
    sections: [
      { id: 'summary',      title: 'Professional Summary',    type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Professional Experience', type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Projects',                type: 'projects',     enabled: true },
      { id: 'education',    title: 'Education',               type: 'education',    enabled: true },
      { id: 'skills',       title: 'Core Skills',             type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',          type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',            type: 'achievements', enabled: true },
      { id: 'languages',    title: 'Languages',               type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Hobbies & Interests',     type: 'hobbies',      enabled: true },
    ],
  },
  {
    key: 'modern',
    styleConfig: { fontFamily: 'Arial, Helvetica, sans-serif', headingColor: '#1f2937', bodyColor: '#4b5563', accentColor: '#10B981' },
    layout: { type: 'two-col-bottom', header: 'accent-bg', twoColBottom: { left: ['hobbies'], right: ['languages'] } },
    sectionStyles: { experience: 'plain', skills: 'pills', hobbies: 'dot-list', languages: 'dot-list' },
    sections: [
      { id: 'summary',      title: 'Professional Summary', type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Experience',           type: 'experience',   enabled: true },
      { id: 'education',    title: 'Education',            type: 'education',    enabled: true },
      { id: 'projects',     title: 'Projects',             type: 'projects',     enabled: true },
      { id: 'skills',       title: 'Skills',               type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',       type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',         type: 'achievements', enabled: true },
      { id: 'hobbies',      title: 'Hobbies & Interests',  type: 'hobbies',      enabled: true },
      { id: 'languages',    title: 'Languages',            type: 'languages',    enabled: true },
    ],
  },
  {
    key: 'minimal',
    styleConfig: { fontFamily: 'Cambria, Georgia, serif', headingColor: '#111827', bodyColor: '#4b5563', accentColor: '#8B5CF6' },
    layout: { type: 'single', header: 'left-minimal' },
    sectionStyles: { experience: 'plain', skills: 'dot-join', hobbies: 'dot-join', languages: 'dot-join' },
    sections: [
      { id: 'summary',      title: 'Summary',          type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Experience',       type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Projects',         type: 'projects',     enabled: true },
      { id: 'education',    title: 'Education',        type: 'education',    enabled: true },
      { id: 'skills',       title: 'Skills',           type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',   type: 'certificates', enabled: true },
      { id: 'languages',    title: 'Languages',        type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',        type: 'hobbies',      enabled: true },
    ],
  },
  {
    key: 'minimal-image',
    styleConfig: { fontFamily: 'Arial, Helvetica, sans-serif', headingColor: '#1f2937', bodyColor: '#4b5563', accentColor: '#EF4444' },
    layout: { type: 'sidebar-left', header: 'accent-bg', showProfileImage: true, sidebar: { sections: ['contact','education','skills','languages','hobbies'], bg: 'dark' } },
    sectionStyles: { experience: 'dot-list', skills: 'dot-list', hobbies: 'dot-join', languages: 'dot-join' },
    sections: [
      { id: 'contact',      title: 'Contact',          type: 'contact',      enabled: true },
      { id: 'education',    title: 'Education',        type: 'education',    enabled: true },
      { id: 'skills',       title: 'Skills',           type: 'skills',       enabled: true },
      { id: 'languages',    title: 'Languages',        type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',        type: 'hobbies',      enabled: true },
      { id: 'summary',      title: 'About Me',         type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Experience',       type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Projects',         type: 'projects',     enabled: true },
      { id: 'certificates', title: 'Certifications',   type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',     type: 'achievements', enabled: true },
    ],
    dummyData: {
      personal_info: {
        full_name: 'Alex Johnson',
        profession: 'Software Engineer',
        email: 'alex@example.com',
        phone: '+1 555 123 4567',
        location: 'New York, NY',
        linkedin: 'https://www.linkedin.com/in/alexj',
        github: 'https://github.com/alexj',
        facebook: '',
        instagram: '',
        website: 'https://alexjohnson.dev',
        image: null,
      },
      professional_summary:
        'Experienced software engineer with 5+ years building scalable web applications. Passionate about clean code, developer experience, and shipping quality products.',
      experience: [
        {
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          location: 'New York, NY',
          project_title: 'Microservices Migration',
          project_link: 'https://github.com/techcorp/microservices',
          start_date: '2021-03',
          end_date: null,
          is_current: true,
          description:
            'Led architecture of microservices platform handling 10M daily requests.\nMentored 4 junior engineers and drove adoption of TypeScript across the team.',
        },
        {
          company: 'Startup Labs',
          position: 'Full Stack Developer',
          location: 'San Francisco, CA',
          project_title: '',
          project_link: '',
          start_date: '2019-06',
          end_date: '2021-02',
          is_current: false,
          description:
            'Built and shipped 3 B2B SaaS products from scratch using React and Node.js.\nReduced API response times by 40% via query optimization and Redis caching.',
        },
      ],
      education: [
        {
          institution: 'State University',
          location: 'New York',
          degree: 'B.S.',
          field: 'Computer Science',
          start_date: '2015-08',
          graduation_date: '2019-05',
          gpa: '3.8',
          description: "Dean's List all 4 years, graduated with honors.\nRelevant coursework: Data Structures, Algorithms, Operating Systems, Distributed Computing.",
        },
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
      skillGroups: [
        { category: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'RESTful APIs', 'JPA', 'Hibernate'] },
        { category: 'Frontend', skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
        { category: 'Database', skills: ['MySQL', 'PostgreSQL', 'MongoDB'] },
        { category: 'Cloud & Tools', skills: ['AWS', 'Git', 'GitHub', 'Swagger', 'Postman'] },
        { category: 'Concepts', skills: ['Microservices', 'System Design', 'JWT Authentication', 'Agile', 'AI/ML Integration'] },
      ],
      project: [
        {
          name: 'OpenDash',
          link: 'https://github.com/alexj/opendash',
          description: 'Developer analytics dashboard built with Next.js and D3.js.',
          bullets: '2k+ GitHub stars and 500+ weekly active users.\nIntegrated with GitHub, Jira, and Slack APIs.\nDeployed on AWS with CI/CD via GitHub Actions.',
        },
      ],
      certificates: [
        {
          title: 'AWS Solutions Architect',
          issuer: 'Amazon Web Services',
          link: 'https://aws.amazon.com/certification/',
          date: '2022-08',
          description: 'Covers cloud architecture, security, and deployment best practices on AWS.',
        },
      ],
      achievements: [
        {
          title: 'Revenue and Operations Excellence',
          date: '2023',
          points:
            'Achieved a 30% increase in sales revenue within one year by implementing targeted marketing strategies and optimizing customer engagement initiatives.\nStreamlined operational processes, resulting in a 20% reduction in costs while improving service delivery times by 15%.\nSpearheaded a cross-functional team project that enhanced product quality, leading to a 25% decrease in customer complaints.\nDeveloped and launched a new training program that improved employee productivity by 40% and reduced onboarding time by 50%.\nSuccessfully negotiated contracts with key suppliers, yielding a 15% savings on procurement expenses.',
        },
        {
          title: 'Market Growth and Product Launch Impact',
          date: '2022',
          points:
            'Exceeded sales targets by 30% within a competitive market, driving revenue growth and enhancing customer engagement.\nDeveloped and implemented a new marketing strategy that increased brand awareness by 45%, resulting in a significant rise in lead generation.\nStreamlined operational processes, reducing costs by 20% and improving overall efficiency.\nLed a cross-functional team to successfully launch a product line, achieving $2 million in sales within the first year.\nCultivated strong relationships with key stakeholders, enhancing collaboration and driving project success.',
        },
      ],
      languages: ['English', 'Spanish'],
      hobbies: ['Open source', 'Rock climbing', 'Photography'],
    },
  },
  {
    key: 'executive',
    styleConfig: { fontFamily: 'Cambria, Georgia, serif', headingColor: '#0f172a', bodyColor: '#1f2937', accentColor: '#F59E0B' },
    layout: { type: 'sidebar-left', header: 'accent-bg', sidebar: { sections: ['contact','skills','education','languages','hobbies'], bg: 'gray' } },
    sectionStyles: { experience: 'border-left', skills: 'dot-list', hobbies: 'dot-join', languages: 'dot-list' },
    sections: [
      { id: 'contact',      title: 'Contact',                 type: 'contact',      enabled: true },
      { id: 'skills',       title: 'Core Skills',             type: 'skills',       enabled: true },
      { id: 'education',    title: 'Education',               type: 'education',    enabled: true },
      { id: 'languages',    title: 'Languages',               type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',               type: 'hobbies',      enabled: true },
      { id: 'summary',      title: 'Executive Summary',       type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Professional Experience', type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Projects',                type: 'projects',     enabled: true },
      { id: 'certificates', title: 'Certifications',          type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',            type: 'achievements', enabled: true },
    ],
  },
  {
    key: 'academic',
    styleConfig: { fontFamily: 'Georgia, Times New Roman, serif', headingColor: '#171717', bodyColor: '#3f3f46', accentColor: '#EC4899' },
    layout: { type: 'single', header: 'centered-serif' },
    sectionStyles: { experience: 'academic-inline-date', skills: 'grid2', hobbies: 'dot-list', languages: 'dot-list' },
    sections: [
      { id: 'summary',      title: 'Research Interests',       type: 'paragraph',    enabled: true },
      { id: 'education',    title: 'Education',                type: 'education',    enabled: true },
      { id: 'experience',   title: 'Professional Experience',  type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Publications & Research',  type: 'projects',     enabled: true },
      { id: 'skills',       title: 'Skills & Competencies',    type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',           type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Honors & Awards',          type: 'achievements', enabled: true },
      { id: 'languages',    title: 'Languages',                type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',                type: 'hobbies',      enabled: true },
    ],
  },
  {
    key: 'ats',
    styleConfig: { fontFamily: 'Georgia, Times New Roman, serif', headingColor: '#111827', bodyColor: '#374151', accentColor: '#06B6D4' },
    layout: { type: 'single', header: 'left-border-bottom' },
    sectionStyles: { experience: 'plain', skills: 'dot-join', hobbies: 'dot-join', languages: 'dot-join' },
    sections: [
      { id: 'summary',      title: 'Professional Summary', type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Work Experience',      type: 'experience',   enabled: true },
      { id: 'projects',     title: 'Projects',             type: 'projects',     enabled: true },
      { id: 'education',    title: 'Education',            type: 'education',    enabled: true },
      { id: 'skills',       title: 'Skills',               type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',       type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',         type: 'achievements', enabled: true },
      { id: 'languages',    title: 'Languages',            type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',            type: 'hobbies',      enabled: true },
    ],
  },
  {
    key: 'ats-compact',
    styleConfig: { fontFamily: 'Arial, Helvetica, sans-serif', headingColor: '#111827', bodyColor: '#374151', accentColor: '#171717' },
    layout: { type: 'single', header: 'three-col' },
    sectionStyles: { experience: 'compact', skills: 'grid3', hobbies: 'dot-join', languages: 'dot-join' },
    sections: [
      { id: 'summary',      title: 'Summary',          type: 'paragraph',    enabled: true },
      { id: 'experience',   title: 'Experience',       type: 'experience',   enabled: true },
      { id: 'education',    title: 'Education',        type: 'education',    enabled: true },
      { id: 'projects',     title: 'Projects',         type: 'projects',     enabled: true },
      { id: 'skills',       title: 'Skills',           type: 'skills',       enabled: true },
      { id: 'certificates', title: 'Certifications',   type: 'certificates', enabled: true },
      { id: 'achievements', title: 'Achievements',     type: 'achievements', enabled: true },
      { id: 'languages',    title: 'Languages',        type: 'languages',    enabled: true },
      { id: 'hobbies',      title: 'Interests',        type: 'hobbies',      enabled: true },
    ],
  },
];

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const col = client.db('kareergrowth').collection('sql');

  for (const tpl of TEMPLATES) {
    const result = await col.updateOne(
      { key: tpl.key },
      {
        $set: {
          styleConfig:   tpl.styleConfig,
          layout:        tpl.layout,
          sectionStyles: tpl.sectionStyles,
          sections:      tpl.sections,
          updatedAt:     new Date(),
        },
      }
    );
    const status = result.matchedCount > 0
      ? (result.modifiedCount > 0 ? 'UPDATED' : 'ALREADY UP TO DATE')
      : 'NOT FOUND';
    console.log(`${tpl.key.padEnd(14)} -> ${status}`);
  }

  await client.close();
  console.log('\nDone.');
}

main().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
