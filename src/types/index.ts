export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  address: string
  linkedin: string
  github: string
  portfolio: string
  profilePhoto: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
  github: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId: string
  link: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  email: string
  phone: string
}

export interface CodingProfile {
  id: string
  platform: 'LeetCode' | 'HackerRank' | 'Codeforces' | 'CodeChef' | 'HackerEarth' | string
  url: string
  problemsSolved: string
  rating: string
  badges: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  skills: string[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  achievements: Achievement[]
  languages: Language[]
  interests: string[]
  references: Reference[]
  codingProfiles: CodingProfile[]
}

export interface Template {
  id: string
  name: string
  category: string
  color: string
  gradient: string
  preview: string
  popular?: boolean
}

export type ActiveSection =
  | 'personal'
  | 'summary'
  | 'education'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'interests'
  | 'references'
  | 'codingProfiles'
