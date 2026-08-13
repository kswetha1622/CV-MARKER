import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import {
  Sparkles, ArrowRight, Check, Star, ChevronDown, ChevronUp,
  Zap, Layout, Eye, Download, Shield, Smartphone,
  Play, TrendingUp, Users, Award, MessageSquare
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { features, testimonials, faqs, stats, templates } from '../data/mockData'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles, Layout, Eye, Download, Shield, Smartphone, Zap
}

// ─── Fade-in animation wrapper ───────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f1230] to-[#1a0a2e]">
    {/* Background effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl" />
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Builder
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">NEW</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6 font-['Outfit']"
          >
            Build a Resume That{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Gets You Hired
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
          >
            Create stunning, ATS-optimized resumes in minutes with AI assistance. Choose from 50+ premium templates and land your dream job.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              to="/builder"
              id="hero-build-btn"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-lg shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 transition-all duration-200"
            >
              Build My Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/templates"
              id="hero-get-started-btn"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-lg backdrop-blur-sm transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              View Templates
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center gap-6 text-sm text-slate-400"
          >
            {['No credit card required', 'Free forever plan', '2.4M+ resumes created'].map(badge => (
              <span key={badge} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — Resume Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-violet-600/30 rounded-3xl blur-2xl scale-105" />

            {/* Resume Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-float">
              {/* Header Bar */}
              <div className="h-16 bg-gradient-to-r from-blue-500 to-violet-600 flex items-center px-6 gap-3">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm">AJ</div>
                <div>
                  <p className="text-white font-bold text-sm">Alex Johnson</p>
                  <p className="text-blue-100 text-xs">Senior Software Engineer</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Contact row */}
                <div className="flex gap-4 flex-wrap">
                  {['📧 alex@email.com', '📱 (555) 123-4567', '📍 San Francisco'].map(item => (
                    <span key={item} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>

                {/* Summary */}
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1.5">Summary</div>
                  <div className="space-y-1">
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-4/5" />
                    <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Experience</div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">TC</div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-slate-800 rounded w-32 mb-1" />
                      <div className="h-2 bg-slate-200 rounded w-24 mb-2" />
                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-100 rounded w-full" />
                        <div className="h-1.5 bg-slate-100 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-slate-100"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">ATS Score</p>
                <p className="text-sm font-bold text-emerald-500">96%</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-slate-100"
            >
              <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">AI Enhanced</p>
                <p className="text-xs text-slate-500">Summary improved ✨</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map(stat => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
)

// ─── Features ─────────────────────────────────────────────────────────────────
const Features: React.FC = () => (
  <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Features
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
          Everything You Need to{' '}
          <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Stand Out
          </span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Powerful tools designed to help you create the perfect resume and land interviews faster.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Sparkles
          return (
            <FadeIn key={feature.title} delay={i * 0.08}>
              <div className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default h-full">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </div>
  </section>
)

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WhyChooseUs: React.FC = () => (
  <section className="py-24 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Why Choose CV Spark
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-['Outfit']">
            The Smartest Way to Build Your{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Career Story</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            We combine beautiful design with cutting-edge AI to give you an unfair advantage in the job market.
          </p>
          <div className="space-y-4">
            {[
              { title: 'AI-Written Content', desc: 'Our AI transforms your bullet points into compelling, quantified achievements that impress recruiters.' },
              { title: 'Recruiter-Tested', desc: '200+ recruiters reviewed and approved our templates. They\'re proven to generate more interviews.' },
              { title: 'One-Click Customization', desc: 'Swap colors, fonts, and layouts instantly. Your resume, your style, in seconds.' },
              { title: 'Always Up-to-Date', desc: 'We continuously update templates to match the latest hiring trends and ATS algorithms.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-violet-500/30 group-hover:scale-110 transition-transform">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-0.5">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {/* Visual side */}
        <FadeIn delay={0.2}>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: 'Users', value: '2.4M+', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { icon: TrendingUp, label: 'Interview Rate', value: '+340%', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { icon: Award, label: 'Jobs Landed', value: '180K+', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
                { icon: Star, label: 'Avg Rating', value: '4.9★', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`${card.bg} rounded-2xl p-6 border border-slate-100 dark:border-slate-700 text-center`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">{card.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
)

// ─── Templates Showcase ───────────────────────────────────────────────────────
const TemplatesShowcase: React.FC = () => (
  <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
          <Layout className="w-4 h-4" />
          Templates
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
          Start with a{' '}
          <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Stunning Template
          </span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          50+ professionally designed templates for every industry and career level.
        </p>
      </FadeIn>

      {/* Scrollable template row */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 snap-x snap-mandatory">
        {templates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.4) }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex-none w-48 snap-center cursor-pointer group"
          >
            {/* Preview Card */}
            <div className={`h-64 rounded-2xl bg-gradient-to-br ${t.gradient} p-4 relative overflow-hidden mb-3 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
              {t.popular && (
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-white/90 text-slate-700 px-2 py-0.5 rounded-full">Popular</span>
              )}
              {/* Mini resume lines */}
              <div className="mt-6 space-y-2">
                <div className="h-2 bg-white/50 rounded w-20" />
                <div className="h-1.5 bg-white/30 rounded w-14" />
                <div className="mt-3 space-y-1">
                  {[1,2,3,4,5].map(j => (
                    <div key={j} className="h-1.5 bg-white/20 rounded" style={{ width: `${60 + j * 5}%` }} />
                  ))}
                </div>
                <div className="flex gap-1 mt-3 flex-wrap">
                  {[1,2,3].map(j => (
                    <div key={j} className="h-4 w-10 bg-white/20 rounded-md" />
                  ))}
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl">
                <Link
                  to={`/builder?template=${t.id}`}
                  className="px-4 py-2 bg-white text-slate-800 text-xs font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Use Template
                </Link>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white text-center">{t.name}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center">{t.category}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
        >
          Browse All Templates <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
)

// ─── AI Section ───────────────────────────────────────────────────────────────
const AISection: React.FC = () => (
  <section id="ai" className="py-24 bg-gradient-to-br from-slate-950 via-[#0f1230] to-[#1a0a2e] relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Resume Assistant
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Outfit']">
            Your Personal{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              AI Career Coach
            </span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Struggling with what to write? Our AI assistant analyzes your experience and generates compelling, job-winning content instantly.
          </p>
          <div className="space-y-4">
            {[
              'Generate a powerful professional summary',
              'Improve bullet points with action verbs',
              'Tailor your resume to any job description',
              'Get ATS optimization suggestions',
              'Create skill-matched achievements',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-violet-400" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              Try AI Assistant <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {/* AI Chat UI Mockup */}
        <FadeIn delay={0.2}>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI Resume Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs">Online</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6 h-56 overflow-hidden">
              {[
                { role: 'user', msg: 'Help me improve my professional summary' },
                { role: 'ai', msg: 'Sure! I\'ll craft a compelling summary that highlights your impact. Tell me your top 2-3 achievements...' },
                { role: 'user', msg: 'I led a team that increased revenue by 40%' },
                { role: 'ai', msg: '✨ Here\'s your improved summary:\n\n"Results-driven engineer with 6+ years of experience leading high-impact teams. Spearheaded initiatives delivering 40% revenue growth..."' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white'
                      : 'bg-white/10 text-slate-200 border border-white/10'
                  }`}>
                    {m.msg}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask AI anything about your resume..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
)

// ─── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials: React.FC = () => (
  <section className="py-24 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
          <Star className="w-4 h-4 fill-current" />
          Testimonials
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
          Loved by{' '}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            2.4 Million
          </span>{' '}
          Job Seekers
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.1}>
            <div className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-4">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
)

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-['Outfit']">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
const CTABanner: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Outfit']">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join 2.4 million professionals who already use CV Spark to build winning resumes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-4 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Start Building — It's Free
          </Link>
          <Link
            to="/templates"
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            Browse Templates
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
)

// ─── Main Landing Page ─────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <TemplatesShowcase />
      <AISection />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default LandingPage
