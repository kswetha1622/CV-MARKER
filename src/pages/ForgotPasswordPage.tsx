import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Mail, Loader2, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)
    try {
      await resetPassword(email.trim())
      setSuccess(
        `Password reset email sent to ${email}! Please check your inbox (and spam/junk folder). Click the link in the email to create a new password.`
      )
      setEmail('')
    } catch (err: any) {
      const code = err?.code
      if (code === 'auth/user-not-found') {
        setError('No account found with this email address. Please check the email or sign up first.')
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before trying again.')
      } else {
        setError(err?.message || 'Failed to send reset email. Please try again.')
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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-2">Reset Password</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the email address you used to register, and we'll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Registered email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm outline-none transition-all" 
              />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>{success}</span>
            </motion.div>
          )}

          <button type="submit" disabled={loading || !!success}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-60">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
          </button>

          {success && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
              Didn't receive the email? <button type="button" onClick={() => setSuccess('')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Try again</button>
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
