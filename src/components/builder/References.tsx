import React from 'react'
import { Users, Plus, Trash2, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const ReferencesForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { references } = resumeData

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      references: [
        ...prev.references,
        {
          id: Date.now().toString(),
          name: '',
          position: '',
          company: '',
          email: '',
          phone: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map(ref => 
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }))
  }

  return (
    <SectionCard 
      title="References" 
      description="Include references only if specifically requested in the job description."
      icon={Users}
    >
      <div className="space-y-6">
        {references.map((ref, index) => (
          <div key={ref.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(ref.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text" 
                  value={ref.name}
                  onChange={e => handleChange(ref.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Sarah Chen"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Title</label>
                <input 
                  type="text" 
                  value={ref.position}
                  onChange={e => handleChange(ref.id, 'position', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Engineering Manager"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
                <input 
                  type="text" 
                  value={ref.company}
                  onChange={e => handleChange(ref.id, 'company', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. TechCorp Inc."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input 
                  type="email" 
                  value={ref.email}
                  onChange={e => handleChange(ref.id, 'email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. sarah@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                <input 
                  type="tel" 
                  value={ref.phone}
                  onChange={e => handleChange(ref.id, 'phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. +1 (555) 987-6543"
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
          Add Reference
        </button>
      </div>
    </SectionCard>
  )
}

export default ReferencesForm
