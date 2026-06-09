import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import type React from 'react'
import { useStore } from '../../store/useStore'
import {
  LayoutDashboard, Briefcase, BookOpen, MapPin, Brain,
  HelpCircle, Library, Moon, Sun, Menu, X, Sparkles
} from 'lucide-react'

const navItems: { to: string; label: string; icon: React.ElementType; highlight?: boolean }[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/careers', label: 'Careers', icon: Briefcase },
  { to: '/courses', label: 'CAO Courses', icon: BookOpen },
  { to: '/tracker', label: 'Tracker', icon: MapPin },
  { to: '/mindmap', label: 'Mind Map', icon: Brain },
  { to: '/quiz', label: 'Quiz', icon: HelpCircle },
  { to: '/pathfinder', label: 'Pathfinder', icon: Sparkles, highlight: true },
  { to: '/resources', label: 'Resources', icon: Library },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { darkMode, toggleDarkMode, studentName } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold">
              TT
            </div>
            <span className="font-bold text-lg hidden sm:block">
              <span className="text-emerald-400">Transition</span>
              <span className="text-slate-100">Track</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon, highlight }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === to
                    ? highlight
                      ? 'bg-violet-600/20 text-violet-400'
                      : 'bg-emerald-600/20 text-emerald-400'
                    : highlight
                      ? 'text-violet-400 hover:bg-violet-600/10 hover:text-violet-300'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon size={15} />
                {label}
                {highlight && pathname !== to && (
                  <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {studentName && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
                  {studentName[0].toUpperCase()}
                </div>
                <span className="text-sm text-slate-300">{studentName}</span>
              </div>
            )}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur">
          <div className="px-4 py-3 grid grid-cols-2 gap-1">
            {navItems.map(({ to, label, icon: Icon, highlight }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === to
                    ? highlight ? 'bg-violet-600/20 text-violet-400' : 'bg-emerald-600/20 text-emerald-400'
                    : highlight ? 'text-violet-400 hover:bg-violet-600/10' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                {label}
                {highlight && pathname !== to && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse ml-auto" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
