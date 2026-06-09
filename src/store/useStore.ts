import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TrackerCategory {
  id: string
  label: string
  icon: string
  color: string
  items: TrackerItem[]
}

export interface TrackerItem {
  id: string
  label: string
  completed: boolean
  date?: string
}

export interface MindMapNode {
  id: string
  label: string
  category: 'career' | 'subject' | 'skill' | 'college' | 'hobby'
  description?: string
}

export interface QuizResult {
  topCategories: { id: string; label: string; score: number }[]
  completedAt: string
}

interface AppState {
  studentName: string
  setStudentName: (name: string) => void

  darkMode: boolean
  toggleDarkMode: () => void

  savedCareers: string[]
  toggleSavedCareer: (id: string) => void

  savedCourses: string[]
  toggleSavedCourse: (id: string) => void

  mindMapNodes: MindMapNode[]
  addMindMapNode: (node: MindMapNode) => void
  removeMindMapNode: (id: string) => void

  tracker: TrackerCategory[]
  toggleTrackerItem: (categoryId: string, itemId: string) => void
  addTrackerItem: (categoryId: string, label: string) => void

  quizResult: QuizResult | null
  setQuizResult: (result: QuizResult) => void

  coursesExplored: number
  quizzesTaken: number
  incrementCoursesExplored: () => void
}

const defaultTracker: TrackerCategory[] = [
  {
    id: 'work-experience',
    label: 'Work Experience',
    icon: '💼',
    color: 'bg-blue-500',
    items: [
      { id: 'we1', label: 'Complete a work experience placement', completed: false },
      { id: 'we2', label: 'Write a reflection on your placement', completed: false },
      { id: 'we3', label: 'Get a reference letter', completed: false },
    ],
  },
  {
    id: 'career-talks',
    label: 'Career Talks',
    icon: '🎤',
    color: 'bg-purple-500',
    items: [
      { id: 'ct1', label: 'Attend a school career talk', completed: false },
      { id: 'ct2', label: 'Visit a college open day', completed: false },
      { id: 'ct3', label: 'Chat with a professional in your field of interest', completed: false },
    ],
  },
  {
    id: 'courses-researched',
    label: 'Courses Researched',
    icon: '📖',
    color: 'bg-emerald-500',
    items: [
      { id: 'cr1', label: 'Research 5 CAO courses on Qualifax', completed: false },
      { id: 'cr2', label: 'Compare entry points for 3 courses', completed: false },
      { id: 'cr3', label: 'Attend a virtual college info session', completed: false },
    ],
  },
  {
    id: 'skills',
    label: 'Skills Learned',
    icon: '⚡',
    color: 'bg-amber-500',
    items: [
      { id: 'sl1', label: 'Complete an online course (e.g. Codecademy, Khan Academy)', completed: false },
      { id: 'sl2', label: 'Learn a new skill outside the classroom', completed: false },
      { id: 'sl3', label: 'Earn a certificate or badge', completed: false },
    ],
  },
  {
    id: 'mini-projects',
    label: 'Mini Projects',
    icon: '🚀',
    color: 'bg-rose-500',
    items: [
      { id: 'mp1', label: 'Complete a TY mini-company project', completed: false },
      { id: 'mp2', label: 'Write a project report or portfolio', completed: false },
      { id: 'mp3', label: 'Present your project to the class', completed: false },
    ],
  },
]

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      studentName: '',
      setStudentName: (name) => set({ studentName: name }),

      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      savedCareers: [],
      toggleSavedCareer: (id) =>
        set((s) => ({
          savedCareers: s.savedCareers.includes(id)
            ? s.savedCareers.filter((c) => c !== id)
            : [...s.savedCareers, id],
        })),

      savedCourses: [],
      toggleSavedCourse: (id) =>
        set((s) => ({
          savedCourses: s.savedCourses.includes(id)
            ? s.savedCourses.filter((c) => c !== id)
            : [...s.savedCourses, id],
        })),

      mindMapNodes: [],
      addMindMapNode: (node) =>
        set((s) => ({
          mindMapNodes: s.mindMapNodes.find((n) => n.id === node.id)
            ? s.mindMapNodes
            : [...s.mindMapNodes, node],
        })),
      removeMindMapNode: (id) =>
        set((s) => ({ mindMapNodes: s.mindMapNodes.filter((n) => n.id !== id) })),

      tracker: defaultTracker,
      toggleTrackerItem: (categoryId, itemId) =>
        set((s) => ({
          tracker: s.tracker.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  items: cat.items.map((item) =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                  ),
                }
              : cat
          ),
        })),
      addTrackerItem: (categoryId, label) =>
        set((s) => ({
          tracker: s.tracker.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  items: [
                    ...cat.items,
                    { id: `custom-${Date.now()}`, label, completed: false },
                  ],
                }
              : cat
          ),
        })),

      quizResult: null,
      setQuizResult: (result) => set({ quizResult: result, quizzesTaken: 1 }),

      coursesExplored: 0,
      quizzesTaken: 0,
      incrementCoursesExplored: () =>
        set((s) => ({ coursesExplored: s.coursesExplored + 1 })),
    }),
    { name: 'transition-track-storage' }
  )
)
