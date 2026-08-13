import React from 'react'
import { Award, Plus, Trash2, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const CertificationsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { certifications } = resumeData

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now().toString(),
          name: '',
          issuer: '',
          date: '',
          credentialId: '',
          link: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }

  return (
    <SectionCard 
      title="Certifications" 
      description="Add professional certificates and licenses."
      icon={Award}
    >
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(cert.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Certification Name</label>
                <input 
                  type="text" 
                  value={cert.name}
                  onChange={e => handleChange(cert.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Issuing Organization</label>
                <input 
                  type="text" 
                  value={cert.issuer}
                  onChange={e => handleChange(cert.id, 'issuer', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Amazon Web Services"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Earned</label>
                <input 
                  type="text" 
                  value={cert.date}
                  onChange={e => handleChange(cert.id, 'date', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. June 2022"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Credential ID</label>
                <input 
                  type="text" 
                  value={cert.credentialId}
                  onChange={e => handleChange(cert.id, 'credentialId', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. 123456ABC"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Credential URL</label>
                <input 
                  type="text" 
                  value={cert.link}
                  onChange={e => handleChange(cert.id, 'link', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. https://verify.com/credential"
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
          Add Certification
        </button>
      </div>
    </SectionCard>
  )
}

export default CertificationsForm
