import React from 'react'
import { Languages, Plus, Trash2, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'
import type { Language } from '../../types'

const LanguagesForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { languages } = resumeData

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now().toString(),
          name: '',
          proficiency: 'Intermediate'
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const proficiencies = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

  return (
    <SectionCard 
      title="Languages" 
      description="List the languages you speak and your proficiency level."
      icon={Languages}
    >
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div key={lang.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700 flex items-center gap-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 text-slate-400 shrink-0">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  value={lang.name}
                  onChange={e => handleChange(lang.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 bg-transparent text-slate-900 dark:text-white outline-none transition-colors" 
                  placeholder="e.g. English, Spanish..."
                />
              </div>
              <div>
                <select
                  value={lang.proficiency}
                  onChange={e => handleChange(lang.id, 'proficiency', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                  {proficiencies.map(prof => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => handleRemove(lang.id)}
              className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0 p-2"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Language
        </button>
      </div>
    </SectionCard>
  )
}

export default LanguagesForm
