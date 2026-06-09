import { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Download, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, type MindMapNode } from '../store/useStore'

// ─── Category config ─────────────────────────────────────────────
const CATEGORIES = {
  career:  { label: 'Careers',  color: '#3b82f6', radius: 3.5, orbitRadius: 2 },
  subject: { label: 'Subjects', color: '#10b981', radius: 3.5, orbitRadius: 2 },
  skill:   { label: 'Skills',   color: '#a855f7', radius: 3.5, orbitRadius: 2 },
  college: { label: 'Colleges', color: '#f59e0b', radius: 3.5, orbitRadius: 2 },
  hobby:   { label: 'Hobbies',  color: '#ec4899', radius: 3.5, orbitRadius: 2 },
} as const

const CAT_KEYS = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]
const CAT_COUNT = CAT_KEYS.length

// ─── Helper: evenly distribute angle on a circle ─────────────────
function catAngle(i: number) {
  return (i / CAT_COUNT) * Math.PI * 2
}

// ─── Glowing sphere node ─────────────────────────────────────────
function NodeSphere({
  position, color, label, scale = 1, isCenter = false, onClick, onHover,
}: {
  position: [number, number, number]
  color: string
  label: string
  scale?: number
  isCenter?: boolean
  onClick: () => void
  onHover: (h: boolean) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const target = hovered ? scale * 1.3 : scale
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 8)
    if (isCenter) {
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  const handlePointerOver = () => { setHovered(true); onHover(true) }
  const handlePointerOut = () => { setHovered(false); onHover(false) }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.55, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.25 : 0.08} side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, -0.65, 0]}
        fontSize={isCenter ? 0.22 : 0.16}
        color={hovered ? '#ffffff' : '#cbd5e1'}
        anchorX="center"
        anchorY="top"
        maxWidth={2}
      >
        {label}
      </Text>
    </group>
  )
}

// ─── Animated edge line ───────────────────────────────────────────
function Edge({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Line>(null)
  const points = [from, to]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.15
    }
  })

  return (
    <primitive object={Object.assign(new THREE.Line(geometry), {})} ref={ref}>
      <lineBasicMaterial color={color} transparent opacity={0.35} linewidth={1} />
    </primitive>
  )
}

// ─── Orbiting category node ───────────────────────────────────────
function CategoryNode({
  catKey, index, leafNodes, onNodeClick, onHover,
}: {
  catKey: keyof typeof CATEGORIES
  index: number
  leafNodes: MindMapNode[]
  onNodeClick: (node: MindMapNode | null, pos: THREE.Vector3) => void
  onHover: (label: string | null) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const cfg = CATEGORIES[catKey]
  const angle = catAngle(index)
  const catPos = new THREE.Vector3(
    Math.cos(angle) * cfg.radius,
    Math.sin(angle * 0.5) * 0.8,
    Math.sin(angle) * cfg.radius,
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.12 * (index % 2 === 0 ? 1 : -1)
  })

  const leaves = leafNodes.filter((n) => n.category === catKey)

  return (
    <group>
      {/* Edge: center → category */}
      <Edge from={new THREE.Vector3(0, 0, 0)} to={catPos} color={cfg.color} />

      {/* Category sphere */}
      <NodeSphere
        position={[catPos.x, catPos.y, catPos.z]}
        color={cfg.color}
        label={cfg.label}
        scale={1.2}
        onClick={() => onNodeClick(null, catPos)}
        onHover={(h) => onHover(h ? cfg.label : null)}
      />

      {/* Leaf nodes */}
      <group ref={groupRef} position={[catPos.x, catPos.y, catPos.z]}>
        {leaves.map((leaf, li) => {
          const leafAngle = (li / Math.max(leaves.length, 1)) * Math.PI * 2
          const lr = cfg.orbitRadius
          const leafLocalPos = new THREE.Vector3(
            Math.cos(leafAngle) * lr,
            Math.sin(leafAngle * 0.7) * 0.5,
            Math.sin(leafAngle) * lr,
          )

          return (
            <group key={leaf.id}>
              <Edge from={new THREE.Vector3(0, 0, 0)} to={leafLocalPos} color={cfg.color} />
              <NodeSphere
                position={[leafLocalPos.x, leafLocalPos.y, leafLocalPos.z]}
                color={cfg.color}
                label={leaf.label}
                scale={0.8}
                onClick={() => onNodeClick(leaf, new THREE.Vector3(catPos.x + leafLocalPos.x, catPos.y + leafLocalPos.y, catPos.z + leafLocalPos.z))}
                onHover={(h) => onHover(h ? leaf.label : null)}
              />
            </group>
          )
        })}
      </group>
    </group>
  )
}

// ─── Star field background ────────────────────────────────────────
function Stars() {
  const points = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < 400; i++) {
      arr.push((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
    }
    return new Float32Array(arr)
  }, [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#475569" transparent opacity={0.6} />
    </points>
  )
}

// ─── 3D Scene ─────────────────────────────────────────────────────
function MindMapScene({
  nodes, studentName, onNodeClick, onHover,
}: {
  nodes: MindMapNode[]
  studentName: string
  onNodeClick: (node: MindMapNode | null, pos: THREE.Vector3) => void
  onHover: (label: string | null) => void
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <Stars />

      {/* Central node */}
      <NodeSphere
        position={[0, 0, 0]}
        color="#10b981"
        label={studentName || 'My Interests'}
        scale={1.5}
        isCenter
        onClick={() => onNodeClick(null, new THREE.Vector3(0, 0, 0))}
        onHover={(h) => onHover(h ? (studentName || 'My Interests') : null)}
      />

      {/* Category + leaf nodes */}
      {CAT_KEYS.map((catKey, i) => (
        <CategoryNode
          key={catKey}
          catKey={catKey}
          index={i}
          leafNodes={nodes}
          onNodeClick={onNodeClick}
          onHover={onHover}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// ─── Main page ────────────────────────────────────────────────────
export default function MindMapPage() {
  const { mindMapNodes, addMindMapNode, removeMindMapNode, studentName } = useStore()
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [addForm, setAddForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newCategory, setNewCategory] = useState<MindMapNode['category']>('skill')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleNodeClick = (node: MindMapNode | null) => {
    setSelectedNode(node)
  }

  const handleAdd = () => {
    if (!newLabel.trim()) return
    addMindMapNode({
      id: `manual-${Date.now()}`,
      label: newLabel.trim(),
      category: newCategory,
    })
    setNewLabel('')
    setAddForm(false)
    toast.success(`Added "${newLabel}" to Mind Map!`)
  }

  const handleExport = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'transition-track-mindmap.png'
    a.click()
    toast.success('Mind map exported!')
  }

  const totalNodes = mindMapNodes.length

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10">
        <div>
          <h1 className="font-bold text-slate-100 flex items-center gap-2">
            🧠 3D Mind Map
          </h1>
          <p className="text-slate-500 text-xs">
            {totalNodes} saved interests • Drag to rotate • Scroll to zoom
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAddForm(true)} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus size={15} /> Add Node
          </button>
          <button onClick={handleExport} className="btn-secondary flex items-center gap-1.5 text-sm">
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 2, 12], fov: 60 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)' }}
        >
          <Suspense fallback={null}>
            <MindMapScene
              nodes={mindMapNodes}
              studentName={studentName}
              onNodeClick={handleNodeClick}
              onHover={setHoveredLabel}
            />
          </Suspense>
        </Canvas>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredLabel && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2 text-sm text-slate-200 pointer-events-none"
            >
              {hoveredLabel}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {totalNodes === 0 && (
          <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
            <div className="glass rounded-2xl px-6 py-4 text-center max-w-sm">
              <Info size={20} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-slate-300 text-sm font-medium">Your mind map is empty</p>
              <p className="text-slate-500 text-xs mt-1">
                Save careers or courses, take the quiz, or add nodes manually to populate your galaxy.
              </p>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 glass rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-2 font-medium">Legend</p>
          <div className="space-y-1.5">
            {CAT_KEYS.map((k) => (
              <div key={k} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORIES[k].color }} />
                <span className="text-xs text-slate-400">{CATEGORIES[k].label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected node panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 glass rounded-2xl p-5 w-64"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-slate-100">{selectedNode.label}</h3>
                <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-slate-300">
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: CATEGORIES[selectedNode.category].color }}
                />
                <span className="text-xs text-slate-400 capitalize">{selectedNode.category}</span>
              </div>
              {selectedNode.description && (
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{selectedNode.description}</p>
              )}
              <button
                onClick={() => { removeMindMapNode(selectedNode.id); setSelectedNode(null); toast('Node removed') }}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                Remove from map
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add node modal */}
      <AnimatePresence>
        {addForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-lg font-bold text-slate-100 mb-4">Add to Mind Map</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Label</label>
                  <input
                    autoFocus
                    className="input"
                    placeholder="e.g. Football, Guitar, Data Science..."
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Category</label>
                  <select
                    className="input"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MindMapNode['category'])}
                  >
                    {CAT_KEYS.map((k) => (
                      <option key={k} value={k}>{CATEGORIES[k].label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAdd} className="btn-primary flex-1">Add Node</button>
                  <button onClick={() => setAddForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
