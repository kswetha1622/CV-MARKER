import type { Template } from '../types'

export const templates: Template[] = [
  { id: 'modern', name: 'Modern Pro', category: 'Professional', color: '#4c6ef5', gradient: 'from-blue-500 to-violet-600', preview: '', popular: true },
  { id: 'executive', name: 'Executive', category: 'Professional', color: '#1e293b', gradient: 'from-slate-700 to-slate-900', preview: '' },
  { id: 'creative', name: 'Creative Spark', category: 'Creative', color: '#ec4899', gradient: 'from-pink-500 to-rose-600', preview: '', popular: true },
  { id: 'minimal', name: 'Minimal Clean', category: 'Modern', color: '#0f766e', gradient: 'from-teal-600 to-cyan-700', preview: '' },
  { id: 'engineering', name: 'Tech Engineer', category: 'Engineering', color: '#059669', gradient: 'from-emerald-500 to-green-600', preview: '' },
  { id: 'nursing', name: 'Healthcare Pro', category: 'Nursing', color: '#dc2626', gradient: 'from-red-500 to-rose-600', preview: '' },
  { id: 'it', name: 'IT Specialist', category: 'IT', color: '#7c3aed', gradient: 'from-violet-600 to-purple-700', preview: '', popular: true },
  { id: 'business', name: 'Business Leader', category: 'Business', color: '#d97706', gradient: 'from-amber-500 to-orange-600', preview: '' },
  { id: 'fresher', name: 'Fresh Graduate', category: 'Fresher', color: '#0284c7', gradient: 'from-sky-500 to-blue-600', preview: '' },
  { id: 'academic', name: 'Academic CV', category: 'Professional', color: '#475569', gradient: 'from-slate-500 to-gray-600', preview: '' },
  { id: 'designer', name: 'Creative Designer', category: 'Creative', color: '#be185d', gradient: 'from-pink-700 to-fuchsia-700', preview: '' },
  { id: 'bold', name: 'Bold Impact', category: 'Modern', color: '#b91c1c', gradient: 'from-red-700 to-orange-600', preview: '' },
]

export const templateCategories = ['All', 'Professional', 'Engineering', 'Nursing', 'IT', 'Business', 'Fresher', 'Creative', 'Modern']

export const features = [
  {
    icon: 'Sparkles',
    title: 'AI-Powered Writing',
    description: 'Our AI assistant helps craft compelling summaries, improve your skills section, and tailor content to job descriptions.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: 'Layout',
    title: 'Premium Templates',
    description: 'Choose from 50+ professionally designed templates created by expert designers and recruiters.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: 'Eye',
    title: 'Live Preview',
    description: 'See your resume update in real-time as you type. No guessing, no delays — what you see is what you get.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: 'Download',
    title: 'One-Click Export',
    description: 'Download as PDF, PNG, or print directly. Your resume is always ready when opportunity knocks.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: 'Shield',
    title: 'ATS Optimized',
    description: 'Every template is built to pass Applicant Tracking Systems used by top companies worldwide.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: 'Smartphone',
    title: 'Works Everywhere',
    description: 'Build and edit your resume on any device — desktop, tablet, or mobile. Your data syncs seamlessly.',
    gradient: 'from-red-500 to-pink-600',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    avatar: 'PS',
    content: 'CV Spark helped me land my dream job at Google! The AI suggestions completely transformed my resume. I got 5x more interview calls.',
    rating: 5,
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Marcus Williams',
    role: 'Product Manager at Meta',
    avatar: 'MW',
    content: "I was struggling to articulate my experience. The AI assistant rewrote my summary and it sounded 10x better. Got my Meta offer in 3 weeks!",
    rating: 5,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'Sarah Kim',
    role: 'Data Scientist at Netflix',
    avatar: 'SK',
    content: 'The templates are absolutely gorgeous. My resume finally looks as impressive as my work. Three recruiters reached out within a day.',
    rating: 5,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    name: 'James Rodriguez',
    role: 'Full Stack Developer at Airbnb',
    avatar: 'JR',
    content: "Best resume builder I've ever used. The live preview makes it so easy to perfect every section. Highly recommend to anyone job hunting.",
    rating: 5,
    color: 'from-pink-500 to-rose-600',
  },
]

export const faqs = [
  {
    question: 'Is CV Spark really free to use?',
    answer: 'Yes! CV Spark offers a generous free plan that includes access to basic templates and the resume editor. Premium plans unlock AI features, advanced templates, and unlimited downloads.',
  },
  {
    question: 'Can I download my resume as a PDF?',
    answer: 'Absolutely. You can download your resume as a PDF, PNG, or print it directly from your browser — all with one click.',
  },
  {
    question: 'Is my data secure?',
    answer: 'We take data security seriously. All your resume data is encrypted and stored securely. We never share your personal information with third parties.',
  },
  {
    question: 'Are the templates ATS-friendly?',
    answer: 'Yes! Every template is carefully tested to ensure compatibility with Applicant Tracking Systems used by Fortune 500 companies.',
  },
  {
    question: 'How does the AI assistant work?',
    answer: 'Our AI assistant analyzes your input and job market data to suggest improvements. It can rewrite your summary, enhance skill descriptions, and tailor your resume to specific job postings.',
  },
  {
    question: 'Can I have multiple resumes?',
    answer: 'Yes! You can create and save multiple versions of your resume — perfect for applying to different roles or industries.',
  },
]

export const stats = [
  { label: 'Resumes Created', value: '2.4M+' },
  { label: 'Jobs Landed', value: '180K+' },
  { label: 'Templates', value: '50+' },
  { label: 'Countries', value: '120+' },
]

export const mockResumes = [
  { id: 1, name: 'Software Engineer CV', template: 'Modern Pro', updated: '2 hours ago', score: 92, color: 'from-blue-500 to-violet-600' },
  { id: 2, name: 'Product Manager Resume', template: 'Executive', updated: 'Yesterday', score: 87, color: 'from-slate-600 to-slate-800' },
  { id: 3, name: 'Freelance Designer CV', template: 'Creative Spark', updated: '3 days ago', score: 95, color: 'from-pink-500 to-rose-600' },
]

export const aiSuggestions = [
  'Improve your professional summary with stronger action verbs',
  'Add measurable achievements to your experience section',
  'Include relevant keywords for ATS optimization',
  'Expand your skills section with trending technologies',
  'Quantify your project impact with specific metrics',
]
