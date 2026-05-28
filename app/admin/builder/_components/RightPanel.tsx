'use client'

import { motion } from 'framer-motion'
import { Palette, Type, Layout, Image as ImageIcon, Sliders } from 'lucide-react'
import type { CanvasBlock, BlockProps } from './BuilderTypes'
import { PALETTE } from './BuilderTypes'
import { useState } from 'react'

interface Props {
  block: CanvasBlock
  onUpdate: (props: Partial<BlockProps>) => void
}

/* ─── Reusable Controls ──────────────────────────────────── */

function SectionLabel({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-4 pb-2">
      <Icon size={13} className="text-brand-600" />
      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-xs text-stone-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-stone-400">{value}</span>
        <label className="cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="sr-only"
          />
          <div
            className="w-7 h-7 rounded-lg border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
            style={{ background: value }}
          />
        </label>
      </div>
    </div>
  )
}

function SliderRow({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-stone-600">{label}</span>
        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-600 bg-stone-200"
      />
    </div>
  )
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-xs text-stone-600">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full transition-colors relative ${value ? 'bg-brand-600' : 'bg-stone-300'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${value ? 'left-4' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

function Divider() {
  return <div className="mx-4 my-1 border-t border-stone-100" />
}

const FONTS = ['Inter', 'Playfair Display', 'Lora', 'DM Sans', 'Merriweather']

/* ─── Panel Tabs ─────────────────────────────────────────── */
type Tab = 'style' | 'layout' | 'content'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'style',   label: 'Style',   icon: Palette },
  { id: 'layout',  label: 'Layout',  icon: Layout },
  { id: 'content', label: 'Content', icon: ImageIcon },
]

/* ─── Main Panel ─────────────────────────────────────────── */
export default function RightPanel({ block, onUpdate }: Props) {
  const [tab, setTab] = useState<Tab>('style')
  const p = block.props
  const meta = PALETTE.find(x => x.type === block.type)

  return (
    <motion.aside
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-60 bg-white border-l border-stone-200 flex flex-col shrink-0 overflow-hidden"
    >
      {/* Block header */}
      <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{meta?.emoji}</span>
          <div>
            <p className="text-xs font-bold text-stone-800">{meta?.label}</p>
            <p className="text-[10px] text-stone-400">Section properties</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-100">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
              tab === id
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">

        {tab === 'style' && (
          <div>
            <SectionLabel icon={Palette} label="Colors" />
            <ColorRow
              label="Background"
              value={p.bgColor ?? '#ffffff'}
              onChange={v => onUpdate({ bgColor: v })}
            />
            <ColorRow
              label="Text color"
              value={p.textColor ?? '#1c1c1c'}
              onChange={v => onUpdate({ textColor: v })}
            />
            <ColorRow
              label="Accent / Brand"
              value={p.accentColor ?? '#1e6b1e'}
              onChange={v => onUpdate({ accentColor: v })}
            />
            <Divider />

            {/* Quick color presets */}
            <div className="px-4 py-2">
              <p className="text-[10px] text-stone-400 mb-2">Presets</p>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  ['#ffffff', '#1c1c1c', '#1e6b1e'],
                  ['#f0f7f0', '#1c1c1c', '#1e6b1e'],
                  ['#0f2e0f', '#ffffff', '#4fa04f'],
                  ['#fdfcf8', '#3b2a1a', '#8b5e3c'],
                  ['#1a4d6e', '#ffffff', '#7dd3fc'],
                ].map(([bg, text, accent], i) => (
                  <button
                    key={i}
                    onClick={() => onUpdate({ bgColor: bg, textColor: text, accentColor: accent })}
                    className="aspect-square rounded-lg border border-stone-200 overflow-hidden hover:scale-110 transition-transform shadow-sm"
                    style={{ background: bg }}
                    title="Apply preset"
                  >
                    <div className="w-full h-1/2" style={{ background: accent }} />
                  </button>
                ))}
              </div>
            </div>

            <Divider />
            <SectionLabel icon={Sliders} label="Effects" />
            <ToggleRow
              label="Drop shadow"
              value={p.showShadow ?? false}
              onChange={v => onUpdate({ showShadow: v })}
            />
            <SliderRow
              label="Border radius"
              value={p.borderRadius ?? 0}
              min={0} max={32} unit="px"
              onChange={v => onUpdate({ borderRadius: v })}
            />
          </div>
        )}

        {tab === 'layout' && (
          <div>
            <SectionLabel icon={Layout} label="Spacing" />
            <SliderRow
              label="Vertical padding"
              value={p.paddingY ?? 60}
              min={8} max={160} unit="px"
              onChange={v => onUpdate({ paddingY: v })}
            />
            <Divider />
            <SectionLabel icon={Type} label="Typography" />
            <SliderRow
              label="Heading size"
              value={p.headingSize ?? 32}
              min={16} max={72} unit="px"
              onChange={v => onUpdate({ headingSize: v })}
            />
            <div className="px-4 py-2">
              <p className="text-xs text-stone-600 mb-1.5">Font family</p>
              <select
                value={p.fontFamily ?? 'Inter'}
                onChange={e => onUpdate({ fontFamily: e.target.value })}
                className="w-full text-xs border border-stone-200 rounded-lg px-2.5 py-2 bg-white text-stone-700 focus:outline-none focus:border-brand-400"
              >
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        )}

        {tab === 'content' && (
          <div>
            <SectionLabel icon={ImageIcon} label="Image" />
            <div className="px-4 py-2 space-y-2">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt=""
                  className="w-full h-24 object-cover rounded-xl border border-stone-100"
                />
              )}
              <input
                type="text"
                placeholder="Paste image URL…"
                value={p.imageUrl ?? ''}
                onChange={e => onUpdate({ imageUrl: e.target.value })}
                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 text-stone-700 placeholder:text-stone-300"
              />
              <p className="text-[10px] text-stone-400">Supports Unsplash, Cloudinary, or any public URL</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: block ID hint */}
      <div className="px-4 py-2 border-t border-stone-100 bg-stone-50">
        <p className="text-[9px] font-mono text-stone-400 truncate">id: {block.id}</p>
      </div>
    </motion.aside>
  )
}
