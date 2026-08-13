import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Code, MessageCircle, Briefcase, Mail, Heart } from 'lucide-react'

const Footer: React.FC = () => {
  const footerLinks = {
    Product: [
      { label: 'Features', href: '/#features' },
      { label: 'Templates', href: '/templates' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'AI Assistant', href: '/#ai' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact Us', href: '/#contact' },
      { label: 'Status', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  }

  return (
    <footer id="contact" className="bg-slate-950 dark:bg-black text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-['Outfit']">
                CV Spark
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Build professional resumes powered by AI. Land your dream job with a resume that stands out from the crowd.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: MessageCircle, label: 'Twitter', href: '#' },
                { icon: Code, label: 'GitHub', href: '#' },
                { icon: Briefcase, label: 'LinkedIn', href: '#' },
                { icon: Mail, label: 'Email', href: '#' },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-violet-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-1">Stay in the loop</h3>
              <p className="text-slate-400 text-sm">Get tips, templates and job market insights.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/20 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            © 2024 CV Spark. Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for job seekers worldwide.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
