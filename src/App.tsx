import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import CareerExplorer from './pages/CareerExplorer'
import CAOBrowser from './pages/CAOBrowser'
import ProgressTracker from './pages/ProgressTracker'
import MindMapPage from './pages/MindMapPage'
import InterestQuiz from './pages/InterestQuiz'
import Resources from './pages/Resources'
import Pathfinder from './pages/Pathfinder'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/careers" element={<CareerExplorer />} />
              <Route path="/courses" element={<CAOBrowser />} />
              <Route path="/tracker" element={<ProgressTracker />} />
              <Route path="/mindmap" element={<MindMapPage />} />
              <Route path="/quiz" element={<InterestQuiz />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/pathfinder" element={<Pathfinder />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
