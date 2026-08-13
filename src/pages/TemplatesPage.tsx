import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Search, Sparkles, Star, ChevronRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { templates, templateCategories } from '../data/mockData'

const TemplatesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 text-xs font-semibold mb-4">
                <Layout className="w-3.5 h-3.5" />
                Template Library
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
                Choose your <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">perfect design</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Start with a professionally designed template, customize it to match your personal brand, and land your dream job.
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {templateCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              >
                {filteredTemplates.map((template, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    key={template.id}
                    className="group relative"
                  >
                    {/* Card container for aspect ratio */}
                    <div className="relative pt-[141.4%] w-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      
                      {/* Gradient preview background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} p-4 sm:p-6 opacity-90`}>
                        {/* Fake resume preview lines to look like a resume */}
                        <div className="w-full h-full bg-white/95 rounded-lg shadow-sm p-4 overflow-hidden flex flex-col gap-3">
                          <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-slate-200" />
                            <div className="flex-1 space-y-1.5">
                              <div className="h-2.5 bg-slate-300 rounded-full w-1/2" />
                              <div className="h-1.5 bg-slate-200 rounded-full w-1/3" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                            <div className="h-1.5 bg-slate-200 rounded-full w-5/6" />
                            <div className="h-1.5 bg-slate-200 rounded-full w-4/5" />
                          </div>
                          <div className="flex-1 mt-2 flex gap-3">
                            <div className="w-1/3 space-y-2 border-r border-slate-100 pr-2">
                              <div className="h-2 bg-slate-300 rounded-full w-1/2 mb-3" />
                              <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                              <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                              <div className="h-1.5 bg-slate-200 rounded-full w-4/5" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-2 bg-slate-300 rounded-full w-1/3 mb-3" />
                              <div className="h-1.5 bg-slate-200 rounded-full w-3/4" />
                              <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                              <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                              <div className="h-1.5 bg-slate-100 rounded-full w-5/6 mb-4" />
                              
                              <div className="h-1.5 bg-slate-200 rounded-full w-2/3" />
                              <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                              <div className="h-1.5 bg-slate-100 rounded-full w-4/5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        {template.popular && (
                          <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            <Star className="w-3 h-3 fill-current" /> Popular
                          </span>
                        )}
                        <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full border border-white/20">
                          {template.category}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col items-center justify-center p-6 gap-3 z-10">
                        <Link
                          to={`/builder?template=${template.id}`}
                          className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-lg"
                        >
                          Use Template <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl border border-white/30 transition-colors backdrop-blur-md">
                          Preview
                        </button>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: template.color }} />
                          <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{template.color.replace('#', 'Theme ')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No templates found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  We couldn't find any templates matching "{searchQuery}" in {activeCategory}.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                  }}
                  className="px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default TemplatesPage
