import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/#pricing', badge: 'Soon' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const isDashboard = ['/dashboard', '/builder', '/settings', '/templates'].some(p =>
    location.pathname.startsWith(p)
  )

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isDashboard
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-200/50 dark:border-slate-700/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-['Outfit']">
                CV Spark
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => {
                    if (link.href.startsWith('/#')) {
                      e.preventDefault()
                      if (location.pathname !== '/') {
                        navigate('/')
                        setTimeout(() => {
                          document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                        }, 300)
                      } else {
                        document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    location.pathname === link.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : scrolled || isDashboard
                      ? 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  scrolled || isDashboard
                    ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  scrolled || isDashboard
                    ? 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                scrolled || isDashboard
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  : 'bg-white/10 text-white'
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-['Outfit']">
                    CV Spark
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={e => {
                      setIsOpen(false)
                      if (link.href.startsWith('/#')) {
                        e.preventDefault()
                        document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                      darkMode ? 'bg-blue-500' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
