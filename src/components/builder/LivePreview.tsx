import React from 'react'
import { Briefcase, Code, Globe } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

// Color palette for each template
const TEMPLATE_COLORS: Record<string, { primary: string; primaryDark: string; headerBg: string; headerBg2: string; subText: string; skillBg: string; skillText: string; skillBorder: string; sectionBorder: string; sideHeading: string; mainHeading: string; accent: string }> = {
  modern: { // Blue
    primary: '#2563eb', primaryDark: '#1e40af', headerBg: '#2563eb', headerBg2: '#1d4ed8',
    subText: '#bfdbfe', skillBg: '#eff6ff', skillText: '#1e40af', skillBorder: '#bfdbfe',
    sectionBorder: '#93c5fd', sideHeading: '#1e40af', mainHeading: '#1e40af', accent: '#2563eb',
  },
  executive: { // Black
    primary: '#171717', primaryDark: '#0a0a0a', headerBg: '#171717', headerBg2: '#000000',
    subText: '#a3a3a3', skillBg: '#f5f5f5', skillText: '#171717', skillBorder: '#d4d4d4',
    sectionBorder: '#a3a3a3', sideHeading: '#000000', mainHeading: '#000000', accent: '#404040',
  },
  creative: { // Pink
    primary: '#ec4899', primaryDark: '#be185d', headerBg: '#ec4899', headerBg2: '#db2777',
    subText: '#fbcfe8', skillBg: '#fdf2f8', skillText: '#be185d', skillBorder: '#f9a8d4',
    sectionBorder: '#f472b6', sideHeading: '#be185d', mainHeading: '#be185d', accent: '#ec4899',
  },
  minimal: { // Dark Green
    primary: '#0f766e', primaryDark: '#134e4a', headerBg: '#0f766e', headerBg2: '#042f2e',
    subText: '#99f6e4', skillBg: '#f0fdfa', skillText: '#134e4a', skillBorder: '#99f6e4',
    sectionBorder: '#5eead4', sideHeading: '#134e4a', mainHeading: '#134e4a', accent: '#0f766e',
  },
  engineering: { // Light Green
    primary: '#10b981', primaryDark: '#059669', headerBg: '#10b981', headerBg2: '#059669',
    subText: '#a7f3d0', skillBg: '#ecfdf5', skillText: '#047857', skillBorder: '#a7f3d0',
    sectionBorder: '#6ee7b7', sideHeading: '#047857', mainHeading: '#047857', accent: '#10b981',
  },
  nursing: { // Red (Healthcare Pro / Healthcare)
    primary: '#dc2626', primaryDark: '#991b1b', headerBg: '#dc2626', headerBg2: '#b91c1c',
    subText: '#fecaca', skillBg: '#fef2f2', skillText: '#991b1b', skillBorder: '#fecaca',
    sectionBorder: '#fca5a5', sideHeading: '#991b1b', mainHeading: '#991b1b', accent: '#dc2626',
  },
  it: { // Blue
    primary: '#3b82f6', primaryDark: '#1d4ed8', headerBg: '#3b82f6', headerBg2: '#2563eb',
    subText: '#dbeafe', skillBg: '#eff6ff', skillText: '#1d4ed8', skillBorder: '#bfdbfe',
    sectionBorder: '#93c5fd', sideHeading: '#1d4ed8', mainHeading: '#1d4ed8', accent: '#3b82f6',
  },
  designer: { // Light Pink
    primary: '#f472b6', primaryDark: '#db2777', headerBg: '#f472b6', headerBg2: '#ec4899',
    subText: '#fce7f3', skillBg: '#fdf2f8', skillText: '#db2777', skillBorder: '#fbcfe8',
    sectionBorder: '#f9a8d4', sideHeading: '#db2777', mainHeading: '#db2777', accent: '#f472b6',
  },
  fresher: { // Blue
    primary: '#0ea5e9', primaryDark: '#0369a1', headerBg: '#0ea5e9', headerBg2: '#0284c7',
    subText: '#bae6fd', skillBg: '#f0f9ff', skillText: '#0369a1', skillBorder: '#bae6fd',
    sectionBorder: '#7dd3fc', sideHeading: '#0369a1', mainHeading: '#0369a1', accent: '#0ea5e9',
  },
  business: { // Orange
    primary: '#f97316', primaryDark: '#c2410c', headerBg: '#f97316', headerBg2: '#ea580c',
    subText: '#fed7aa', skillBg: '#fff7ed', skillText: '#c2410c', skillBorder: '#fed7aa',
    sectionBorder: '#fdba74', sideHeading: '#c2410c', mainHeading: '#c2410c', accent: '#f97316',
  },
  academic: { // Gray
    primary: '#64748b', primaryDark: '#334155', headerBg: '#64748b', headerBg2: '#475569',
    subText: '#e2e8f0', skillBg: '#f8fafc', skillText: '#334155', skillBorder: '#cbd5e1',
    sectionBorder: '#94a3b8', sideHeading: '#334155', mainHeading: '#334155', accent: '#64748b',
  },
  bold: { // Red (Fallback for any bold template)
    primary: '#ef4444', primaryDark: '#b91c1c', headerBg: '#ef4444', headerBg2: '#dc2626',
    subText: '#fecaca', skillBg: '#fef2f2', skillText: '#b91c1c', skillBorder: '#fecaca',
    sectionBorder: '#fca5a5', sideHeading: '#b91c1c', mainHeading: '#b91c1c', accent: '#ef4444',
  },
}

const LivePreview: React.FC = () => {
  const { resumeData, selectedTemplate } = useResume()
  const { personalInfo, experience, education, skills, projects, certifications, achievements, languages, codingProfiles } = resumeData

  // Resolve color palette — fall back to 'modern' (blue) if unknown template
  const c = TEMPLATE_COLORS[selectedTemplate] ?? TEMPLATE_COLORS['modern']

  return (
    <div className="transform scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-[0.9] transition-transform duration-300 origin-top">
      <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl overflow-hidden relative">

        {/* Header section — uses template color */}
        <div style={{ background: `linear-gradient(to right, ${c.headerBg}, ${c.headerBg2})`, color: '#fff', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {personalInfo.profilePhoto && (
              <img
                src={personalInfo.profilePhoto}
                alt="Profile"
                style={{ width: '5rem', height: '5rem', borderRadius: '9999px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)', background: '#fff' }}
              />
            )}
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
              <h2 style={{ fontSize: '1.25rem', color: c.subText, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{personalInfo.jobTitle || 'JOB TITLE'}</h2>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', textAlign: 'right', fontSize: '0.875rem', color: c.subText, alignItems: 'flex-end' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: c.subText }}>
                  <Briefcase style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: c.subText }}>
                  <Code style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>GitHub</span>
                </a>
              )}
              {personalInfo.portfolio && (
                <a href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: c.subText }}>
                  <Globe style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          {/* Left Sidebar */}
          <div style={{ width: '33.333%', padding: '2rem', background: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>

            {/* Skills */}
            {skills.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.sectionBorder}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.sideHeading }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.map((skill, index) => (
                    <span key={index} style={{ fontSize: '0.875rem', background: c.skillBg, color: c.skillText, padding: '0.25rem 0.5rem', borderRadius: '0.125rem', border: `1px solid ${c.skillBorder}` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.sectionBorder}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.sideHeading }}>Education</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>{edu.degree}</h4>
                      <div style={{ fontSize: '0.875rem', color: c.accent }}>{edu.field}</div>
                      <div style={{ fontSize: '0.875rem', color: '#475569' }}>{edu.institution}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{edu.startDate} - {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.sectionBorder}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.sideHeading }}>Certifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {certifications.map(cert => (
                    <div key={cert.id}>
                      <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem', lineHeight: '1.25' }}>{cert.name}</h4>
                      <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>{cert.issuer}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.sectionBorder}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.sideHeading }}>Languages</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {languages.map(lang => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b' }}>{lang.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.sectionBorder}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.sideHeading }}>Achievements</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {achievements.map(ach => (
                    <div key={ach.id}>
                      <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem', lineHeight: '1.25' }}>{ach.title}</h4>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.25rem 0' }}>{ach.date}</div>
                      <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: '1.5' }}>{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div style={{ width: '66.667%', padding: '2rem' }}>

            {/* Summary */}
            {personalInfo.summary && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.mainHeading }}>Professional Summary</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.75', color: '#334155', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.mainHeading }}>Experience</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: 700, color: '#1e293b' }}>{exp.position}</h4>
                        <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: c.accent }}>{exp.company}</span>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{exp.location}</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', lineHeight: '1.75', color: '#334155', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.mainHeading }}>Projects</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: 700, color: '#1e293b' }}>{proj.name}</h4>
                        {proj.link && (
                          <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: c.accent, textDecoration: 'underline', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {proj.link}
                          </a>
                        )}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.5rem' }}>{proj.technologies}</div>
                      <p style={{ fontSize: '0.875rem', lineHeight: '1.75', color: '#334155', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coding Profiles */}
            {codingProfiles && codingProfiles.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', color: c.mainHeading }}>Coding Profiles</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {codingProfiles.map(profile => (
                    <div key={profile.id} style={{ border: '1px solid #f1f5f9', borderRadius: '0.375rem', padding: '0.75rem', background: '#f8fafc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>{profile.platform}</h4>
                        {profile.url && (
                          <a href={profile.url.startsWith('http') ? profile.url : `https://${profile.url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: c.accent, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Code style={{ width: '0.75rem', height: '0.75rem' }} />
                            View Profile
                          </a>
                        )}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: '#475569' }}>
                        {profile.problemsSolved && <div><span style={{ fontWeight: 500, color: '#334155' }}>Problems Solved:</span> {profile.problemsSolved}</div>}
                        {profile.rating && <div><span style={{ fontWeight: 500, color: '#334155' }}>Contest Rating:</span> {profile.rating}</div>}
                      </div>
                      {profile.badges && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#475569' }}>
                          <span style={{ fontWeight: 500, color: '#334155' }}>Badges/Achievements:</span> {profile.badges}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default LivePreview
