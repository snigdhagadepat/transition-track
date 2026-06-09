import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { courses, colleges, subjectAreas, type Course } from '../data/courses'
import { useStore } from '../store/useStore'

const collegeColors: Record<string, string> = {
  UCD: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  TCD: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  UCC: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  DCU: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  NUIG: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  UL: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  MU: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  RCSI: 'bg-red-500/20 text-red-400 border-red-500/30',
  'TU Dublin': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

function PointsMeter({ points }: { points: number }) {
  const pct = Math.min((points / 625) * 100, 100)
  const color = points >= 550 ? 'bg-red-500' : points >= 450 ? 'bg-amber-500' : points >= 350 ? 'bg-emerald-500' : 'bg-blue-500'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">CAO Points</span>
        <span className={`font-bold ${points >= 550 ? 'text-red-400' : points >= 450 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {points}
        </span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function CAOBrowser() {
  const { savedCourses, toggleSavedCourse, addMindMapNode } = useStore()
  const [search, setSearch] = useState('')
  const [college, setCollege] = useState('All')
  const [area, setArea] = useState('All')
  const [maxPoints, setMaxPoints] = useState(625)

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.college.toLowerCase().includes(search.toLowerCase())
      const matchCollege = college === 'All' || c.collegeCode === college
      const matchArea = area === 'All' || c.subjectArea === area
      const matchPoints = c.points <= maxPoints
      return matchSearch && matchCollege && matchArea && matchPoints
    })
  }, [search, college, area, maxPoints])

  const handleSave = (course: Course) => {
    toggleSavedCourse(course.id)
    addMindMapNode({ id: `college-${course.collegeCode}`, label: course.collegeCode, category: 'college', description: course.college })
    const isSaved = savedCourses.includes(course.id)
    toast.success(isSaved ? `Removed ${course.name}` : `Added ${course.name} to Tracker!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-2">📚 CAO Course Browser</h1>
        <p className="section-subtitle">
          Browse {courses.length} courses across 9 Irish colleges. Filter by points, college, or subject area.
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input pl-9" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="input" value={college} onChange={(e) => setCollege(e.target.value)}>
            <option value="All">All Colleges</option>
            {colleges.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input" value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="All">All Subject Areas</option>
            {subjectAreas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Max Points: {maxPoints}</label>
            <input
              type="range" min={200} max={625} step={25} value={maxPoints}
              onChange={(e) => setMaxPoints(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>
      </div>

      <p className="text-slate-500 text-sm mb-5">
        Showing {filtered.length} courses
        {savedCourses.length > 0 && (
          <span className="ml-2 badge bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            {savedCourses.length} saved
          </span>
        )}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="card flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`badge border text-xs mb-2 ${collegeColors[course.collegeCode] || 'bg-slate-700 text-slate-300'}`}>
                    {course.collegeCode}
                  </span>
                  <h3 className="font-bold text-slate-100 leading-tight">{course.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{course.college}</p>
                </div>
                <button
                  onClick={() => handleSave(course)}
                  className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                    savedCourses.includes(course.id)
                      ? 'text-emerald-400 bg-emerald-500/20'
                      : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                  aria-label="Save course"
                >
                  {savedCourses.includes(course.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>

              <PointsMeter points={course.points} />

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>📅 {course.duration} years</span>
                <span>🏷️ {course.subjectArea}</span>
                <span className="font-mono text-slate-600">{course.code}</span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{course.description}</p>

              <div>
                <p className="text-xs text-slate-500 mb-1.5">Career Paths</p>
                <div className="flex flex-wrap gap-1.5">
                  {course.careerPaths.map((p) => (
                    <span key={p} className="badge bg-slate-700 text-slate-300 text-xs">{p}</span>
                  ))}
                </div>
              </div>

              <a
                href="https://www.qualifax.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink size={12} /> View on Qualifax
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-4xl mb-3">🎓</div>
          <p>No courses match. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
