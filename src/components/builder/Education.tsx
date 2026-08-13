import React from 'react'
import { GraduationCap, Plus, Trash2, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const EducationForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { education } = resumeData

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  return (
    <SectionCard 
      title="Education" 
      description="Add your educational background, degrees, and academic achievements."
      icon={GraduationCap}
    >
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            {/* Action buttons */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(edu.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">School / University</label>
                <input 
                  type="text" 
                  value={edu.institution}
                  onChange={e => handleChange(edu.id, 'institution', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Degree</label>
                <input 
                  type="text" 
                  value={edu.degree}
                  onChange={e => handleChange(edu.id, 'degree', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Field of Study</label>
                <input 
                  type="text" 
                  value={edu.field}
                  onChange={e => handleChange(edu.id, 'field', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Start Date</label>
                <input 
                  type="text" 
                  value={edu.startDate}
                  onChange={e => handleChange(edu.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Aug 2014"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">End Date</label>
                <input 
                  type="text" 
                  value={edu.endDate}
                  onChange={e => handleChange(edu.id, 'endDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. May 2018 or Present"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GPA / Grade (Optional)</label>
                <input 
                  type="text" 
                  value={edu.gpa}
                  onChange={e => handleChange(edu.id, 'gpa', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. 3.8/4.0"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description (Optional)</label>
                <textarea 
                  value={edu.description}
                  onChange={e => handleChange(edu.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y" 
                  placeholder="e.g. Relevant coursework, honors, or activities..."
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>
    </SectionCard>
  )
}

export default EducationForm
