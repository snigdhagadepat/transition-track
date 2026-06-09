import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'

function RingChart({ pct, color }: { pct: number; color: string }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <svg width="72" height="72" className="rotate-[-90deg]">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
      <circle
        cx="36" cy="36" r={r} fill="none" stroke={color}
        strokeWidth="6" strokeDasharray={circ}
        strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  )
}

export default function ProgressTracker() {
  const { tracker, toggleTrackerItem, addTrackerItem } = useStore()
  const [newItem, setNewItem] = useState<Record<string, string>>({})
  const [adding, setAdding] = useState<string | null>(null)

  const ringColors = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#f43f5e']

  const totalAll = tracker.reduce((a, c) => a + c.items.length, 0)
  const completedAll = tracker.reduce((a, c) => a + c.items.filter((i) => i.completed).length, 0)
  const overallPct = totalAll ? Math.round((completedAll / totalAll) * 100) : 0

  const handleAdd = (catId: string) => {
    const label = (newItem[catId] || '').trim()
    if (!label) return
    addTrackerItem(catId, label)
    setNewItem((prev) => ({ ...prev, [catId]: '' }))
    setAdding(null)
    toast.success('Item added!')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title">📍 Progress Tracker</h1>
        <p className="section-subtitle">
          Track your Transition Year milestones — work experience, career talks, skills, and more.
        </p>
      </div>

      {/* Overall progress */}
      <div className="card mb-8 flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <RingChart pct={overallPct} color="#10b981" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-emerald-400">{overallPct}%</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100">Overall TY Progress</h2>
          <p className="text-slate-400 text-sm">
            {completedAll} of {totalAll} tasks completed across all categories
          </p>
          {overallPct === 100 && (
            <p className="text-emerald-400 text-sm font-medium mt-1">🎉 Amazing — you've completed everything!</p>
          )}
          {overallPct >= 50 && overallPct < 100 && (
            <p className="text-amber-400 text-sm mt-1">💪 Great progress — keep it up!</p>
          )}
          {overallPct < 50 && (
            <p className="text-slate-500 text-sm mt-1">🚀 You've got this — start ticking off tasks below!</p>
          )}
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-5">
        {tracker.map((category, ci) => {
          const done = category.items.filter((i) => i.completed).length
          const pct = category.items.length ? Math.round((done / category.items.length) * 100) : 0
          const color = ringColors[ci % ringColors.length]

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08 }}
              className="card"
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${color}22` }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">{category.label}</h3>
                    <p className="text-slate-500 text-xs">{done}/{category.items.length} completed</p>
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <RingChart pct={pct} color={color} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>

              {/* Items */}
              <div className="space-y-2">
                <AnimatePresence>
                  {category.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group ${
                        item.completed
                          ? 'bg-slate-900/50'
                          : 'hover:bg-slate-900/80'
                      }`}
                      onClick={() => toggleTrackerItem(category.id, item.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          item.completed
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-slate-600 group-hover:border-slate-400'
                        }`}
                      >
                        {item.completed && <Check size={12} className="text-white" />}
                      </div>
                      <span
                        className={`text-sm transition-all ${
                          item.completed ? 'line-through text-slate-500' : 'text-slate-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add item */}
              <div className="mt-3">
                <AnimatePresence>
                  {adding === category.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2"
                    >
                      <input
                        autoFocus
                        className="input text-sm"
                        placeholder="Add a custom task..."
                        value={newItem[category.id] || ''}
                        onChange={(e) => setNewItem((p) => ({ ...p, [category.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAdd(category.id)
                          if (e.key === 'Escape') setAdding(null)
                        }}
                      />
                      <button onClick={() => handleAdd(category.id)} className="btn-primary text-sm px-3">Add</button>
                      <button onClick={() => setAdding(null)} className="p-2.5 text-slate-500 hover:text-slate-300">
                        <X size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setAdding(category.id)}
                      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-emerald-400 transition-colors mt-1"
                    >
                      <Plus size={14} /> Add custom task
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
