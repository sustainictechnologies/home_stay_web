'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers, MapPin } from 'lucide-react'
import CanvasBlockItem from './CanvasBlock'
import type { CanvasBlock } from './BuilderTypes'

interface Props {
  blocks: CanvasBlock[]
  selectedId: string | null
  previewMode: boolean
  viewport: 'desktop' | 'mobile'
  onSelect: (id: string) => void
  onRemove: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onDuplicate: (id: string) => void
}

function EmptyState({ isOver }: { isOver: boolean }) {
  return (
    <motion.div
      animate={{ borderColor: isOver ? '#1e6b1e' : '#d1d5db', background: isOver ? '#f0f7f0' : '#fafafa' }}
      transition={{ duration: 0.2 }}
      className="m-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-16 gap-4 transition-colors"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isOver ? 'bg-brand-100' : 'bg-stone-100'}`}>
        <Layers size={24} className={isOver ? 'text-brand-600' : 'text-stone-400'} />
      </div>
      <div className="text-center">
        <p className={`text-sm font-semibold mb-1 transition-colors ${isOver ? 'text-brand-700' : 'text-stone-500'}`}>
          {isOver ? 'Release to add section' : 'Drag sections here'}
        </p>
        <p className="text-xs text-stone-400">Pick sections from the left panel and drag them onto this canvas</p>
      </div>
    </motion.div>
  )
}

export default function Canvas({
  blocks, selectedId, previewMode, viewport,
  onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop' })

  const isMobile = viewport === 'mobile'
  const canvasWidth = isMobile ? 390 : '100%'

  return (
    <div className="flex-1 overflow-auto bg-stone-200 flex flex-col items-center py-6 px-4">
      {/* Device frame */}
      <motion.div
        animate={{ width: canvasWidth, maxWidth: isMobile ? 390 : 860 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
        style={{ maxWidth: isMobile ? 390 : 860 }}
      >
        {/* Browser chrome */}
        {!previewMode && (
          <div className="bg-stone-700 rounded-t-xl px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 bg-stone-600 rounded-md px-3 py-1 text-center">
              <span className="text-[10px] text-stone-300 font-mono">jalad.in/stays/meenas-homestay</span>
            </div>
          </div>
        )}

        {/* Canvas body */}
        <div
          ref={setNodeRef}
          className={`bg-white shadow-2xl overflow-hidden ${previewMode ? 'rounded-xl' : 'rounded-b-xl'} min-h-[400px]`}
        >
          {/* Page header — mirrors real homestay page */}
          <div className="px-4 sm:px-6 pt-6 pb-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-semibold bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full">✓ Verified Host</span>
              <span className="text-[11px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">Bird Watching</span>
              <span className="text-[11px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">Long Stays Welcome</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900">Hornbill Haven Homestay</h1>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-stone-400 shrink-0" />
                <span>Khed, Ratnagiri</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400">🌐</span>
                <span>Marathi, Hindi, English</span>
              </div>
            </div>
          </div>

          {blocks.length === 0 ? (
            <EmptyState isOver={isOver} />
          ) : (
            <SortableContext
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="px-4 sm:px-6 pt-4 pb-8 space-y-4">
                <AnimatePresence>
                  {blocks.map(block => (
                    <CanvasBlockItem
                      key={block.id}
                      block={block}
                      selected={!previewMode && block.id === selectedId}
                      onSelect={() => onSelect(block.id)}
                      onRemove={() => onRemove(block.id)}
                      onMoveUp={() => onMoveUp(block.id)}
                      onMoveDown={() => onMoveDown(block.id)}
                      onDuplicate={() => onDuplicate(block.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          )}

          {/* Drop indicator when dragging over non-empty canvas */}
          {isOver && blocks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-1 bg-brand-400 mx-4 rounded-full my-1"
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
