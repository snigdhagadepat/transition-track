import { motion } from 'framer-motion'
import { ExternalLink, Download, Play } from 'lucide-react'

const links = [
  {
    category: 'Official CAO & College',
    items: [
      { name: 'CAO.ie', desc: 'Central Applications Office — apply for third-level courses', url: 'https://www.cao.ie', icon: '🎓' },
      { name: 'Qualifax.ie', desc: "Ireland's National Learners' Database — every course in one place", url: 'https://www.qualifax.ie', icon: '📚' },
      { name: 'CareersPortal.ie', desc: 'Career profiles, college info, and guidance resources', url: 'https://careersportal.ie', icon: '🧭' },
    ],
  },
  {
    category: 'Career Guidance',
    items: [
      { name: 'Euréka (NCGE)', desc: 'National Centre for Guidance in Education', url: 'https://www.ncge.ie', icon: '💡' },
      { name: 'SOLAS Apprenticeships', desc: 'Explore trade and craft apprenticeship routes', url: 'https://www.solas.ie', icon: '🔧' },
      { name: 'Institute of Guidance Counsellors', desc: 'Find a career guidance counsellor near you', url: 'https://www.igc.ie', icon: '🤝' },
    ],
  },
  {
    category: 'Free Learning',
    items: [
      { name: 'Codecademy', desc: 'Learn coding for free — great for tech careers', url: 'https://www.codecademy.com', icon: '💻' },
      { name: 'Khan Academy', desc: 'Free maths, science, and humanities tutorials', url: 'https://www.khanacademy.org', icon: '📐' },
      { name: 'Future Learn', desc: 'Free online courses from top universities', url: 'https://www.futurelearn.com', icon: '🌍' },
    ],
  },
]

const videos = [
  { title: 'A Day in the Life of a Medical Student — UCD', videoId: 'dQw4w9WgXcQ', college: 'UCD' },
  { title: 'TY Students Talk About Career Exploration', videoId: 'dQw4w9WgXcQ', college: 'TY Guide' },
  { title: 'How to Choose Your CAO Course — Top Tips', videoId: 'dQw4w9WgXcQ', college: 'CAO Advice' },
  { title: 'Engineering at University of Limerick', videoId: 'dQw4w9WgXcQ', college: 'UL' },
]

const checklist = [
  '✅ Completed at least one work experience placement',
  '✅ Attended a college open day or virtual info session',
  '✅ Researched 5+ CAO courses on Qualifax',
  '✅ Taken the TransitionTrack Interest Quiz',
  '✅ Spoken to a professional in my area of interest',
  '✅ Completed an online course or gained a skill',
  '✅ Participated in a TY mini-company or project',
  '✅ Written a reflection on my TY experiences',
  '✅ Built my 3D Mind Map of interests',
  '✅ Discussed my results with a guidance counsellor',
]

export default function Resources() {
  const handleDownloadChecklist = () => {
    const content = `TransitionTrack — TY Year Planning Checklist\n${'='.repeat(45)}\n\n${checklist.join('\n')}\n\n---\nPowered by TransitionTrack | transitiontrack.ie`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'TY-Planning-Checklist.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title">📖 Resources</h1>
        <p className="section-subtitle">
          Everything you need to make the most of your Transition Year — official links, videos, and planning tools.
        </p>
      </div>

      {/* Link sections */}
      <div className="space-y-8 mb-12">
        {links.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <h2 className="text-lg font-bold text-slate-100 mb-4">{section.category}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Videos */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-lg font-bold text-slate-100 mb-4">🎬 Career & College Videos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {videos.map((v) => (
            <div key={v.title} className="card">
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-slate-900/50" />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/80 flex items-center justify-center mx-auto mb-2">
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  </div>
                  <p className="text-xs text-slate-400">Click to play on YouTube</p>
                </div>
              </div>
              <p className="font-medium text-slate-200 text-sm">{v.title}</p>
              <p className="text-xs text-slate-500 mt-1">{v.college}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Checklist download */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-100">📋 TY Year Planning Checklist</h2>
            <p className="text-slate-400 text-sm mt-1">
              Print this out or download it — tick off your TY goals as you go.
            </p>
          </div>
          <button onClick={handleDownloadChecklist} className="btn-primary flex items-center gap-2 flex-shrink-0">
            <Download size={15} /> Download
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/50">
              <span className="text-sm leading-relaxed text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
