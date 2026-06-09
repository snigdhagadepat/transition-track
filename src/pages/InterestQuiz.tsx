import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { quizQuestions, quizCategories } from '../data/quiz'
import { careers } from '../data/careers'
import { courses } from '../data/courses'
import { useStore } from '../store/useStore'

type Scores = Record<string, number>

export default function InterestQuiz() {
  const { setQuizResult, quizResult, addMindMapNode } = useStore()
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Scores>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(!!quizResult)

  const q = quizQuestions[current]
  const total = quizQuestions.length
  const progress = ((current) / total) * 100

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)
    const newScores = { ...scores }
    const option = q.options[optionIndex]
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val
    })

    setTimeout(() => {
      if (current + 1 < total) {
        setCurrent((c) => c + 1)
        setSelected(null)
      } else {
        // Calculate results
        const sorted = Object.entries(newScores)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([id, score]) => {
            const cat = quizCategories.find((c) => c.id === id)
            return { id, label: cat?.label || id, score }
          })

        const result = { topCategories: sorted, completedAt: new Date().toISOString() }
        setQuizResult(result)

        // Add top careers to mind map
        sorted.forEach((cat) => {
          const matchedCareers = careers.filter((c) =>
            quizCategories.find((qc) => qc.id === cat.id)?.careers.includes(c.title)
          ).slice(0, 2)
          matchedCareers.forEach((c) => {
            addMindMapNode({ id: c.id, label: c.title, category: 'career', description: c.description })
          })
        })

        setDone(true)
        setScores(newScores)
      }
    }, 380)
  }

  const handleReset = () => {
    setCurrent(0)
    setScores({})
    setSelected(null)
    setDone(false)
  }

  if (done && quizResult) {
    const topCategories = quizResult.topCategories

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Your Results Are In!</h1>
            <p className="text-slate-400">Based on your answers, here are your top career matches.</p>
          </div>

          {/* Top 3 matches */}
          <div className="space-y-4 mb-8">
            {topCategories.map((cat, i) => {
              const matchedCareers = careers.filter((c) =>
                quizCategories.find((qc) => qc.id === cat.id)?.careers.includes(c.title)
              )
              const matchedCourses = courses.filter((c) =>
                matchedCareers.some((mc) => mc.relatedCourses.some((rc) => rc.includes(c.collegeCode)))
              ).slice(0, 3)

              const medals = ['🥇', '🥈', '🥉']
              const barWidths = [100, 75, 55]

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{medals[i]}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-100">{cat.label}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 bg-slate-700 rounded-full flex-1 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${barWidths[i]}%` }}
                          />
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">{barWidths[i]}% match</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Matched Careers</p>
                    <div className="flex flex-wrap gap-2">
                      {matchedCareers.map((mc) => (
                        <span key={mc.id} className="badge bg-slate-700 text-slate-300">
                          {mc.icon} {mc.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {matchedCourses.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Suggested CAO Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {matchedCourses.map((c) => (
                          <span key={c.id} className="badge bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                            {c.collegeCode}: {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/mindmap" className="btn-primary flex-1 text-center flex items-center justify-center gap-2">
              <Sparkles size={16} /> View in Mind Map
            </Link>
            <Link to="/careers" className="btn-secondary flex-1 text-center">
              Explore Matched Careers
            </Link>
            <button onClick={handleReset} className="btn-secondary flex items-center gap-2 justify-center">
              <RotateCcw size={15} /> Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="section-title">🧭 Interest Quiz</h1>
          <span className="text-slate-500 text-sm">{current + 1} / {total}</span>
        </div>
        <p className="section-subtitle">Answer honestly — there are no right or wrong answers!</p>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <div className="card mb-6">
            <p className="text-xs text-emerald-400 font-medium mb-3 uppercase tracking-wide">
              Question {current + 1}
            </p>
            <h2 className="text-xl font-bold text-slate-100 leading-relaxed">{q.question}</h2>
          </div>

          <div className="space-y-3">
            {q.options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: selected === null ? 1.01 : 1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3 ${
                  selected === i
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : selected !== null
                    ? 'border-slate-700 bg-slate-800/50 text-slate-500 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-700'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  selected === i ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-600 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {option.label}
                {selected === i && <ChevronRight size={16} className="ml-auto text-emerald-400" />}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
