import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Settings, Bell, Palette, Globe, 
  Moon, Sun, Save, ArrowLeft, Shield, Smartphone,
  Mail, Key, Sparkles
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'

const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'notifications' | 'language' | 'security'>('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'theme', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language & Region', icon: Globe },
  ] as const

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 sticky top-28">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[600px]">
            
            <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] capitalize">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Manage your account and preferences.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-300 dark:text-slate-600 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700">
                        {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : user?.email?.substring(0, 2).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                          Change Photo
                        </button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
                        <input type="text" defaultValue={user?.displayName || ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed outline-none" readOnly />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                        <input type="tel" defaultValue={user?.phoneNumber || ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed outline-none" readOnly />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Theme Settings */}
                {activeTab === 'theme' && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Appearance</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                        
                        <button 
                          onClick={() => !darkMode && toggleDarkMode()}
                          className={`p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${
                            !darkMode ? 'border-blue-500 bg-blue-50/50 dark:bg-transparent' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${!darkMode ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Sun className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white mb-1">Light Mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Clean and bright look.</p>
                          </div>
                        </button>

                        <button 
                          onClick={() => darkMode && toggleDarkMode()}
                          className={`p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${
                            darkMode ? 'border-blue-500 bg-blue-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Moon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white mb-1">Dark Mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Easy on the eyes.</p>
                          </div>
                        </button>

                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-2xl"
                  >
                    {[
                      { title: 'Email Notifications', desc: 'Receive weekly tips on resume building.', default: true, icon: Mail },
                      { title: 'Push Notifications', desc: 'Get alerted when a recruiter views your linked resume.', default: false, icon: Smartphone },
                      { title: 'Product Updates', desc: 'Be the first to know about new templates and features.', default: true, icon: Sparkles },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                        <div className="flex gap-4">
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 h-fit">
                            <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer mt-1">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Security */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8 max-w-2xl"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Add an extra layer of security to your account.</p>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm shadow-sm">
                        <Key className="w-4 h-4" />
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Language */}
                {activeTab === 'language' && (
                  <motion.div
                    key="language"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-md space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">App Language</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish (ES)</option>
                        <option>French (FR)</option>
                        <option>German (DE)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Timezone</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Coordinated Universal Time (UTC)</option>
                        <option>Central European Time (CET)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            
            {/* Action Bar */}
            <div className="p-6 md:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-3 mt-auto">
              <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
