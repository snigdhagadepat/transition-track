import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ChevronDown, ChevronUp, BookmarkCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { careers, careerCategories, type Career } from '../data/careers'
import { useStore } from '../store/useStore'

export default function CareerExplorer() {
  const { savedCareers, toggleSavedCareer, addMindMapNode } = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [salaryMin, setSalaryMin] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || c.category === category
      const matchSalary = c.salary.max >= salaryMin
      return matchSearch && matchCat && matchSalary
    })
  }, [search, category, salaryMin])

  const handleSave = (career: Career) => {
    toggleSavedCareer(career.id)
    addMindMapNode({ id: career.id, label: career.title, category: 'career', description: career.description })
    const isSaved = savedCareers.includes(career.id)
    toast.success(isSaved ? `Removed ${career.title}` : `Saved ${career.title} to Mind Map!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-2">💼 Career Explorer</h1>
        <p className="section-subtitle">
          Explore {careers.length} career paths — find what excites you and save it to your Mind Map.
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-9"
              placeholder="Search careers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {careerCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">
              Min Salary: €{salaryMin.toLocaleString()}
            </label>
            <input
              type="range"
              min={0}
              max={150000}
              step={10000}
              value={salaryMin}
              onChange={(e) => setSalaryMin(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-slate-500 text-sm mb-5">
        Showing {filtered.length} of {careers.length} careers
        {savedCareers.length > 0 && (
          <span className="ml-2 badge bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            {savedCareers.length} saved
          </span>
        )}
      </p>

      {/* Career cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((career, i) => (
            <motion.div
              key={career.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className="card flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{career.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-100">{career.title}</h3>
                    <span className={`badge text-xs ${career.color} border`}>{career.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSave(career)}
                  className={`p-2 rounded-lg transition-all ${
                    savedCareers.includes(career.id)
                      ? 'text-emerald-400 bg-emerald-500/20'
                      : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                  aria-label={savedCareers.includes(career.id) ? 'Unsave career' : 'Save career'}
                >
                  {savedCareers.includes(career.id) ? <BookmarkCheck size={18} /> : <Heart size={18} />}
                </button>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-400 font-semibold text-sm">
                  €{career.salary.min.toLocaleString()} – €{career.salary.max.toLocaleString()}
                </span>
                <span className="text-slate-600 text-xs">/ year</span>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                {career.description}
              </p>

              {/* Subjects */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-1.5">Required LC Subjects</p>
                <div className="flex flex-wrap gap-1.5">
                  {career.requiredSubjects.map((s) => (
                    <span key={s} className="badge bg-slate-700 text-slate-300 text-xs">{s}</span>
                  ))}
                </div>
              </div>

              {/* Expand / collapse day-in-life */}
              <button
                onClick={() => setExpanded(expanded === career.id ? null : career.id)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors mb-2"
              >
                {expanded === career.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Day in the life
              </button>

              <AnimatePresence>
                {expanded === career.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-sm italic leading-relaxed border-l-2 border-emerald-500/40 pl-3 mb-3">
                      "{career.dayInLife}"
                    </p>
                    <div>
                      <p className="text-xs text-slate-500 mb-1.5">Related CAO Courses</p>
                      <div className="flex flex-wrap gap-1.5">
                        {career.relatedCourses.map((c) => (
                          <span key={c} className="badge bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">{c}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>No careers match your filters. Try broadening your search.</p>
        </div>
      )}
    </div>
  )
}
