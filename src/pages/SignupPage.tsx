import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = typeof location.state?.from === 'string'
    ? location.state.from
    : location.state?.from
      ? `${location.state.from.pathname}${location.state.from.search || ''}${location.state.from.hash || ''}`
      : '/builder'
  const { signupWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await signupWithEmail(email, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please go to Log in instead.')
      } else {
        setError(err?.message || 'Failed to create an account.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
        
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-['Outfit']">CV Spark</span>
        </Link>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-2">Create an account</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Join CV Spark and build your dream resume today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={6}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </motion.div>
          )}

          <button type="submit" disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 shadow-lg shadow-blue-500/25 transition-all">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
