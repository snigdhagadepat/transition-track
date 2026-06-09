import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Sparkles, RotateCcw, Globe, GraduationCap,
  TrendingUp, MapPin, Briefcase, ChevronRight, Shuffle,
  User, Bot, Loader2, AlertCircle
} from 'lucide-react'
import { useStore } from '../store/useStore'

// ─── Types ────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  careerCards?: CareerCard[]
}

interface CareerCard {
  title: string
  location: string
  degreePath: string
  salaryRange: string
  story: string
  emoji: string
}

// ─── System prompt ────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Pathfinder, a career exploration guide for Irish Transition Year and university students. Your mission is to shatter linear career thinking and reveal unexpected, specific, global paths students would never have considered.

PERSONALITY: Enthusiastic, specific, inspiring — like a well-travelled mentor who has worked across five industries and three continents.

RULES (follow these in every response):
1. SPECIFICITY: Always name exact job titles. Not "business jobs in science" — say "Life Sciences Venture Capital Analyst at a Berlin biotech fund" or "Computational Drug Discovery Product Manager at a Boston startup".
2. NON-LINEAR THINKING: Explicitly challenge the obvious path. If someone says "I like biology", say "You absolutely do NOT have to be a doctor or lab scientist."
3. REAL-FEELING STORIES: Include at least one short fictional-but-realistic story of a named person who took a non-linear route. Include their name, their background, where they ended up, and how they got there. Make it feel like a real person you know.
4. DEGREE COMBINATIONS: Show 2–3 specific undergrad + postgrad combos that unlock each career (e.g. "BSc Biochemistry → MSc Science Communication → MBA opens the door to Pharma Brand Strategy").
5. GLOBAL LOCATIONS: Name at least 2 specific international cities per response (Berlin, Singapore, Amsterdam, Dubai, Boston, Toronto, Zurich, Tokyo, Sydney, etc.). Ireland is not the only option.
6. NICHE CAREERS: Surface roles students have genuinely never heard of. Examples: Regulatory Affairs Specialist, Clinical Data Scientist, Science Journalist at Nature, Bioethics Consultant at WHO, Genomics Product Manager, Climate Finance Analyst at the European Investment Bank, Health Tech VC Associate.
7. STRUCTURED RESPONSES: After your conversational text, always output a JSON block for career cards in this exact format — no extra text inside the block:
\`\`\`careers
[
  {
    "title": "Life Sciences VC Analyst",
    "location": "Berlin, Germany",
    "degreePath": "BSc Biochemistry + MSc Biotechnology Management",
    "salaryRange": "€65,000–€90,000",
    "story": "Siobhán studied biochemistry in UCC, hated pipetting, did an MSc in biotech management in Munich, and now evaluates drug startups for a Berlin VC fund. She reads scientific papers in the morning and pitch decks in the afternoon.",
    "emoji": "🔬"
  }
]
\`\`\`

8. FOLLOW-UP HOOKS: End every response with 1–2 specific follow-up questions that dig deeper (e.g. "Do you care more about the science side or the strategy side of these roles?")

When a student says something like "I like biology but hate labs", respond with 3–5 completely unexpected, highly specific careers. When they say "Surprise me", go wild with something truly niche. Always push global.`

// ─── Quick-start chips ────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: 'I like biology but hate labs', emoji: '🧬' },
  { label: 'Show me jobs that need two degrees', emoji: '🎓' },
  { label: 'Careers beyond Ireland', emoji: '🌍' },
  { label: 'I love maths but not accounting', emoji: '📐' },
  { label: 'Surprise me with something niche', emoji: '✨' },
  { label: 'What if I study law AND tech?', emoji: '⚖️' },
  { label: 'High-paying non-traditional careers', emoji: '💰' },
  { label: 'I want to work in Asia or the Middle East', emoji: '🌏' },
]

// ─── Career card parser ───────────────────────────────────────────
function parseCareerCards(content: string): { text: string; cards: CareerCard[] } {
  const regex = /```careers\s*([\s\S]*?)```/g
  const cards: CareerCard[] = []
  let text = content

  let match
  while ((match = regex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim())
      if (Array.isArray(parsed)) cards.push(...parsed)
    } catch {
      // malformed JSON — skip
    }
    text = text.replace(match[0], '')
  }

  return { text: text.trim(), cards }
}

// ─── Career Card Component ────────────────────────────────────────
function CareerCardUI({ card, index }: { card: CareerCard; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 mt-0.5">{card.emoji || '🚀'}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-100 leading-tight">{card.title}</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-violet-400 flex-shrink-0" />
              <span className="text-violet-400 text-xs font-medium">{card.location}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-emerald-400 font-semibold text-sm">{card.salaryRange}</div>
            <div className="text-slate-600 text-xs">/ year</div>
          </div>
        </div>

        {/* Degree path */}
        <div className="mt-3 flex items-start gap-2">
          <GraduationCap size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed">{card.degreePath}</p>
        </div>

        {/* Story toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ChevronRight
            size={13}
            className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
          {expanded ? 'Hide story' : 'Real person story'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-slate-400 text-xs leading-relaxed italic border-l-2 border-violet-500/40 pl-3">
                "{card.story}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────
function MessageBubble({ msg, onBroaden }: { msg: Message; onBroaden: (title: string) => void }) {
  const isUser = msg.role === 'user'
  const { text, cards } = msg.role === 'assistant'
    ? parseCareerCards(msg.content)
    : { text: msg.content, cards: [] }

  // Use pre-parsed cards if available (from streaming)
  const displayCards = msg.careerCards ?? cards

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
        isUser
          ? 'bg-emerald-600'
          : 'bg-gradient-to-br from-violet-600 to-blue-600'
      }`}>
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>

      {/* Content */}
      <div className={`flex-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-3`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-emerald-700 text-white rounded-tr-sm'
            : 'bg-slate-800 text-slate-200 rounded-tl-sm'
        }`}>
          {/* Render markdown-lite: bold, line breaks */}
          <FormattedText text={text} />
        </div>

        {/* Career cards */}
        {displayCards.length > 0 && (
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 px-1">
              <TrendingUp size={13} className="text-violet-400" />
              <span className="text-xs text-violet-400 font-semibold uppercase tracking-wide">
                Career Paths Unlocked
              </span>
            </div>
            {displayCards.map((card, i) => (
              <CareerCardUI key={i} card={card} index={i} />
            ))}
            {/* Broaden button */}
            {displayCards.length > 0 && (
              <button
                onClick={() => onBroaden(displayCards[0].title)}
                className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200 group"
              >
                <Shuffle size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                Broaden my path from "{displayCards[0].title}"
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Simple markdown-lite renderer ───────────────────────────────
function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n')

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />

        // Bold: **text**
        const parts = line.split(/\*\*(.*?)\*\*/g)
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
        )

        // Bullet
        if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
          return (
            <div key={i} className="flex gap-2">
              <span className="text-violet-400 flex-shrink-0 mt-0.5">•</span>
              <span>{rendered.slice(line.indexOf(' '))}</span>
            </div>
          )
        }

        return <p key={i}>{rendered}</p>
      })}
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0">
        <Sparkles size={14} />
      </div>
      <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-500"
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Pathfinder page ─────────────────────────────────────────
export default function Pathfinder() {
  const { studentName } = useStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // In production (Vercel) the API key lives server-side in env vars — no key prompt needed.
  // In dev the Vite proxy forwards to Anthropic and we use a locally-stored key.
  const isProd = import.meta.env.PROD
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('pf_api_key') || '')
  const [showKeyPrompt, setShowKeyPrompt] = useState(!isProd && !localStorage.getItem('pf_api_key'))
  const [keyDraft, setKeyDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Welcome message
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `Hey${studentName ? ` ${studentName}` : ''}! 👋 I'm **Pathfinder** — and my job is to blow your mind with careers you've never heard of.\n\nI'm going to challenge every assumption you have about what your subjects "lead to". A biology student doesn't have to be a doctor. A maths student doesn't have to be an accountant. There's a whole world of weird, niche, well-paid careers across Berlin, Singapore, Boston, and beyond.\n\nTell me **what subjects you're studying or interested in**, or **what excites or bores you** — and I'll show you paths you didn't know existed.\n\nOr just pick a prompt below to get started. 🚀`,
      timestamp: new Date(),
    }])
  }, [studentName])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const saveApiKey = () => {
    const trimmed = keyDraft.trim()
    if (!trimmed.startsWith('sk-ant-')) {
      setError('That doesn\'t look like an Anthropic API key (should start with sk-ant-)')
      return
    }
    localStorage.setItem('pf_api_key', trimmed)
    setApiKey(trimmed)
    setShowKeyPrompt(false)
    setError(null)
  }

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    setError(null)

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Build conversation history (excluding welcome, which isn't in the real API history)
    const history = [...messages, userMsg]
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }))

    // If welcome is the only msg, add user msg fresh
    const apiMessages = history.length === 1 && messages[0]?.id === 'welcome'
      ? [{ role: 'user' as const, content: text.trim() }]
      : history

    try {
      // Production: POST to our Vercel serverless function (/api/chat)
      // Development: POST through the Vite proxy to Anthropic directly
      const endpoint = isProd
        ? '/api/chat'
        : '/api/anthropic/v1/messages'

      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (!isProd) {
        headers['x-api-key'] = apiKey
        headers['anthropic-version'] = '2023-06-01'
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        const msg = (errData as any)?.error?.message || `API error ${res.status}`
        if (res.status === 401) throw new Error('Invalid API key. Please check your key and try again.')
        if (res.status === 429) throw new Error('Rate limited — please wait a moment and try again.')
        throw new Error(msg)
      }

      const data = await res.json() as { content: { type: string; text: string }[] }
      const rawText = data.content.find((c) => c.type === 'text')?.text || ''
      const { text: cleanText, cards } = parseCareerCards(rawText)

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: rawText,
        timestamp: new Date(),
        careerCards: cards,
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, loading, apiKey])

  const handleBroaden = useCallback((careerTitle: string) => {
    sendMessage(`Take "${careerTitle}" and show me 5 lateral moves I'd never have thought of — roles that use similar skills but in completely different industries or locations. Push global and stay niche.`)
  }, [sendMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `Chat cleared! Tell me what's on your mind — subjects, interests, anything — and I'll find careers you haven't imagined yet. 🧭`,
      timestamp: new Date(),
    }])
    setError(null)
  }

  // ── API Key prompt ──────────────────────────────────────────────
  if (showKeyPrompt) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mb-6">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Meet Pathfinder 🧭</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Pathfinder uses Claude AI to reveal niche, global careers you've never heard of.
          To get started, enter your Anthropic API key — it's stored only in your browser.
        </p>

        <div className="w-full space-y-3">
          <input
            type="password"
            className="input text-sm"
            placeholder="sk-ant-api03-..."
            value={keyDraft}
            onChange={(e) => setKeyDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveApiKey()}
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
          <button onClick={saveApiKey} className="btn-primary w-full">
            Start Exploring
          </button>
          <p className="text-xs text-slate-600">
            Get a free API key at{' '}
            <a
              href="https://console.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300"
            >
              console.anthropic.com
            </a>
            . Your key never leaves your device.
          </p>
        </div>
      </div>
    )
  }

  // ── Main chat UI ───────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm sm:text-base leading-tight">
              Pathfinder
            </h1>
            <p className="text-slate-500 text-xs hidden sm:block">
              Niche careers · Global paths · Non-linear thinking
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Claude AI</span>
          </div>
          {!isProd && (
            <button
              onClick={() => { setShowKeyPrompt(true); setKeyDraft('') }}
              className="text-xs text-slate-600 hover:text-slate-400 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Change key
            </button>
          )}
          <button
            onClick={clearChat}
            className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">

        {/* Quick-start chips — show only at start */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 pb-2"
          >
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => sendMessage(p.label)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-violet-500/50 hover:bg-slate-700 hover:text-white transition-all duration-200 disabled:opacity-50"
              >
                <span>{p.emoji}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} onBroaden={handleBroaden} />
        ))}

        {/* Loading indicator */}
        {loading && <TypingIndicator />}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400/60 hover:text-red-400"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-slate-800 bg-slate-900/80 backdrop-blur px-4 sm:px-6 py-4">
        {/* Suggested follow-ups when chat is in progress */}
        {messages.length > 2 && !loading && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            {[
              { label: 'Go more niche', emoji: '🔭' },
              { label: 'Show me the global version', emoji: '🌍' },
              { label: 'What postgrad changes everything?', emoji: '🎓' },
              { label: 'Broaden it completely', emoji: '🔀' },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.label)}
                disabled={loading}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all disabled:opacity-50"
              >
                <span>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              rows={1}
              className="input resize-none text-sm py-3 pr-4 max-h-32 leading-relaxed"
              style={{ height: 'auto', minHeight: '46px' }}
              placeholder="Tell me your interests, subjects, or ask anything..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                // Auto-grow
                e.target.style.height = 'auto'
                e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Chat message"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center hover:from-violet-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            aria-label="Send message"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={16} className="ml-0.5" />
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-700 mt-2">
          Shift+Enter for new line · Enter to send
        </p>
      </div>
    </div>
  )
}
