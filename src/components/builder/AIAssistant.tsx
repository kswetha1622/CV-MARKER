import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react'
import { aiSuggestions } from '../../data/mockData'

interface AIAssistantProps {
  onClose: () => void
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm your AI Resume Assistant. I can help you write a compelling summary, improve your bullet points, or tailor your resume to a specific job description. How can I help you today?" }
  ])

  const handleSend = () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I've analyzed your request. Here's a suggested improvement you can apply directly to your resume:\n\n"Spearheaded the development of a high-performance React application, resulting in a 40% reduction in load times and a 15% increase in user retention."`
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.3)] border-l border-slate-200 dark:border-slate-800 flex flex-col z-40"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-violet-50 dark:bg-violet-900/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">AI Assistant</h3>
            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Powered by GPT-4</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
                : 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400'
            }`}>
              {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Actions */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none flex gap-2">
        {aiSuggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => setInput(suggestion)}
            className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-300 hover:text-violet-600 dark:hover:border-violet-700 dark:hover:text-violet-400 transition-colors shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask AI to write or improve content..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none resize-none overflow-hidden h-12"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              input.trim() && !isTyping
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Always review the content before saving.
        </p>
      </div>
    </motion.div>
  )
}

export default AIAssistant
