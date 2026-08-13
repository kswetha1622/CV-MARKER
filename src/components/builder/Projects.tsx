import React, { useState } from 'react'
import { Code, Plus, Trash2, GripVertical, Sparkles, Loader2 } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'
import { improveDescription } from '../../utils/aiHelper'

const ProjectsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { projects } = resumeData
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: '',
          description: '',
          technologies: '',
          link: '',
          github: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }))
  }

  const handleAiImprove = async (id: string, currentText: string, name: string) => {
    if (loadingIds[id]) return
    setLoadingIds(prev => ({ ...prev, [id]: true }))
    try {
      const contextTitle = name || 'project features'
      const improved = await improveDescription(currentText, contextTitle)
      handleChange(id, 'description', improved)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingIds(prev => ({ ...prev, [id]: false }))
    }
  }

  return (
    <SectionCard 
      title="Projects" 
      description="Highlight key projects that showcase your skills."
      icon={Code}
    >
      <div className="space-y-6">
        {projects.map((proj, index) => (
          <div key={proj.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(proj.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Name</label>
                <input 
                  type="text" 
                  value={proj.name}
                  onChange={e => handleChange(proj.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. AI Resume Builder"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Technologies Used</label>
                <input 
                  type="text" 
                  value={proj.technologies}
                  onChange={e => handleChange(proj.id, 'technologies', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. React, TypeScript, Node.js"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Link</label>
                <input 
                  type="text" 
                  value={proj.link}
                  onChange={e => handleChange(proj.id, 'link', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. cvspark.dev"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Repository</label>
                <input 
                  type="text" 
                  value={proj.github}
                  onChange={e => handleChange(proj.id, 'github', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. github.com/user/project"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <button 
                    type="button"
                    onClick={() => handleAiImprove(proj.id, proj.description, proj.name)}
                    disabled={loadingIds[proj.id]}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-medium rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors disabled:opacity-75"
                  >
                    {loadingIds[proj.id] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {loadingIds[proj.id] ? 'Writing...' : 'Write with AI'}
                  </button>
                </div>
                <textarea 
                  value={proj.description}
                  onChange={e => handleChange(proj.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y leading-relaxed" 
                  placeholder="Describe the project, your role, and the impact..."
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
          Add Project
        </button>
      </div>
    </SectionCard>
  )
}

export default ProjectsForm
