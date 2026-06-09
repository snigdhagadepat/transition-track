import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { Briefcase, BookOpen, Brain, MapPin, HelpCircle, ArrowRight, Sparkles } from 'lucide-react'
import type React from 'react'

const quickCards: {
  to: string; icon: React.ElementType; title: string; desc: string; color: string; glow: string; badge?: string
}[] = [
  {
    to: '/careers',
    icon: Briefcase,
    title: 'Explore Careers',
    desc: 'Discover 15+ career paths with salaries and required subjects.',
    color: 'from-blue-600 to-blue-700',
    glow: 'hover:shadow-blue-500/20',
  },
  {
    to: '/courses',
    icon: BookOpen,
    title: 'Browse CAO Courses',
    desc: 'Find the right course across 8 Irish universities.',
    color: 'from-emerald-600 to-emerald-700',
    glow: 'hover:shadow-emerald-500/20',
  },
  {
    to: '/mindmap',
    icon: Brain,
    title: 'My Mind Map',
    desc: 'Visualise your interests as an interactive 3D galaxy.',
    color: 'from-purple-600 to-purple-700',
    glow: 'hover:shadow-purple-500/20',
  },
  {
    to: '/tracker',
    icon: MapPin,
    title: 'Progress Tracker',
    desc: 'Track work experience, career talks, and skills.',
    color: 'from-rose-600 to-rose-700',
    glow: 'hover:shadow-rose-500/20',
  },
  {
    to: '/quiz',
    icon: HelpCircle,
    title: 'Interest Quiz',
    desc: '20 questions to discover your ideal career path.',
    color: 'from-amber-600 to-amber-700',
    glow: 'hover:shadow-amber-500/20',
  },
  {
    to: '/pathfinder',
    icon: Sparkles,
    title: 'Pathfinder AI',
    desc: 'Chat with AI to discover niche, global careers you\'ve never heard of.',
    color: 'from-violet-600 to-blue-700',
    glow: 'hover:shadow-violet-500/20',
    badge: 'NEW',
  },
]

const stats = [
  { label: 'Irish Universities', value: '8', icon: '🎓' },
  { label: 'Career Paths', value: '15', icon: '🚀' },
  { label: 'CAO Courses', value: '30+', icon: '📚' },
  { label: 'Quiz Questions', value: '20', icon: '💡' },
]

export default function Dashboard() {
  const { studentName, setStudentName, savedCareers, savedCourses, tracker, quizzesTaken } = useStore()
  const [nameInput, setNameInput] = useState(studentName)
  const [editingName, setEditingName] = useState(!studentName)

  const totalTrackerItems = tracker.reduce((a, c) => a + c.items.length, 0)
  const completedItems = tracker.reduce((a, c) => a + c.items.filter((i) => i.completed).length, 0)
  const trackerPct = totalTrackerItems ? Math.round((completedItems / totalTrackerItems) * 100) : 0

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const handleNameSave = () => {
    if (nameInput.trim()) {
      setStudentName(nameInput.trim())
      setEditingName(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-900/50 p-8 mb-8"
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-3">
            <Sparkles size={14} />
            <span>Ireland's TY Career Portal</span>
          </div>

          {studentName && !editingName ? (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
                {greeting}, <span className="gradient-text">{studentName}</span>! 👋
              </h1>
              <p className="text-slate-400 text-lg mb-6">
                Your Transition Year journey starts here. Let's explore what the future holds.
              </p>
              <button
                onClick={() => setEditingName(true)}
                className="text-sm text-slate-500 hover:text-slate-300 underline"
              >
                Change name
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                Welcome to <span className="gradient-text">TransitionTrack</span> 🇮🇪
              </h1>
              <p className="text-slate-400 mb-6">
                Your personalised guide to CAO courses, careers, and Transition Year — made for Irish students.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  className="input"
                  placeholder="Enter your first name..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                  autoFocus
                />
                <button onClick={handleNameSave} className="btn-primary whitespace-nowrap">
                  Get Started
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card text-center"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-emerald-400">{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress summary (if student has done anything) */}
      {studentName && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            📊 Your Progress Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ProgressPill label="Careers Saved" value={savedCareers.length} max={15} color="blue" />
            <ProgressPill label="Courses Saved" value={savedCourses.length} max={30} color="emerald" />
            <ProgressPill label="Tasks Done" value={completedItems} max={totalTrackerItems} color="rose" extra={`${trackerPct}%`} />
            <ProgressPill label="Quizzes Taken" value={quizzesTaken} max={1} color="amber" />
          </div>
        </motion.div>
      )}

      {/* Quick access cards */}
      <h2 className="text-xl font-bold text-slate-100 mb-4">Where to next?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quickCards.map(({ to, icon: Icon, title, desc, color, glow, badge }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to={to}
              className={`block card group cursor-pointer hover:shadow-xl ${glow} hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
            >
              {badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">
                  {badge}
                </span>
              )}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-1 group-hover:text-white">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              <div className={`flex items-center gap-1 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${badge ? 'text-violet-400' : 'text-emerald-400'}`}>
                Let's go <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Irish universities row */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Irish Universities Covered</h2>
        <div className="flex flex-wrap gap-3">
          {['🏛️ UCD', '🏰 TCD', '🌊 UCC', '🦋 DCU', '🌿 NUIG', '🌁 UL', '⛪ MU', '🏥 RCSI', '🎨 TU Dublin'].map((u) => (
            <span key={u} className="badge bg-slate-800 text-slate-300 border border-slate-700">
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressPill({ label, value, max, color, extra }: {
  label: string; value: number; max: number; color: string; extra?: string
}) {
  const pct = max ? Math.min((value / max) * 100, 100) : 0
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
    amber: 'bg-amber-500',
  }

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300 font-medium">{extra || `${value}/${max}`}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
