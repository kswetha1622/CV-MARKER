/**
 * AI Resume Enhancement Utilities (Simulated High-Impact AI)
 * Provides context-aware improvements for summaries and job/project descriptions.
 */

// Helper to simulate network latency for realistic premium feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ACTION_VERBS = [
  'Spearheaded', 'Engineered', 'Architected', 'Pioneered', 'Optimized',
  'Accelerated', 'Cultivated', 'Orchestrated', 'Designed', 'Formulated',
  'Revamped', 'Streamlined', 'Synthesized', 'Expanded', 'Maximised'
];

const METRICS = [
  'by 35% within the first two quarters',
  'improving system uptime to 99.99%',
  'reducing development cycle time by 25%',
  'resulting in a 15% increase in user engagement',
  'saving over $20k in operational overhead annually',
  'boosting core application performance by 40%',
  'scaling active user base to 10k+ users concurrent'
];

export const improveSummary = async (current: string, jobTitle?: string): Promise<string> => {
  await delay(800); // Simulate API latency
  
  const title = jobTitle || 'Professional';
  
  if (!current.trim()) {
    // Generate new summary
    return `Results-driven and highly motivated ${title} with a proven track record of designing and executing high-impact solutions. Adept at collaborating with cross-functional teams to streamline workflows, optimize core systems, and deliver premium user experiences. Committed to leveraging emerging technologies and industry best practices to drive organizational growth.`;
  }

  // Refine existing summary
  const cleanSummary = current.replace(/^(I am a|I'm a|Professional)\s+/i, '');
  return `Results-driven ${title} specialized in high-performance delivery. ${cleanSummary.charAt(0).toUpperCase() + cleanSummary.slice(1)} Proven expertise in optimization, cross-functional leadership, and deploying robust solutions to maximize business value.`;
};

export const improveDescription = async (current: string, contextTitle?: string): Promise<string> => {
  await delay(800); // Simulate API latency
  
  const title = contextTitle || 'key features';
  const verb1 = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const verb2 = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const metric1 = METRICS[Math.floor(Math.random() * METRICS.length)];
  const metric2 = METRICS[Math.floor(Math.random() * METRICS.length)];

  if (!current.trim()) {
    // Generate new description bullet points
    return `• ${verb1} end-to-end development of ${title} components, ensuring strict alignment with modern architectural standards.
• ${verb2} key system integrations and optimized data retrieval paths, ${metric1}.
• Collaborated closely with cross-functional stakeholders to deliver premium features, ${metric2}.`;
  }

  // Improve existing bullet points or plain text
  const lines = current
    .split('\n')
    .map(line => line.replace(/^[•\-\*\s]+/, '').trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    return `• ${verb1} core features for ${title}, ${metric1}.`;
  }

  const improvedLines = lines.map((line, idx) => {
    // Check if line already starts with an action verb (simple regex)
    const startsWithVerb = /^[A-Z][a-z]+ed\b/.test(line);
    const prefix = startsWithVerb ? '' : `${ACTION_VERBS[(idx) % ACTION_VERBS.length]} `;
    const suffix = line.includes('%') || line.includes('$') || line.includes('uptime') ? '' : `, ${METRICS[idx % METRICS.length]}`;
    return `• ${prefix}${line.charAt(0).toLowerCase() + line.slice(1)}${suffix}`;
  });

  return improvedLines.join('\n');
};
