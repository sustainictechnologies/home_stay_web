'use client'

import React, { useState } from 'react'
import type { CanvasBlock } from '../BuilderTypes'
import { ShieldCheck, MapPin, Ban, ScrollText, Globe2, X } from 'lucide-react'
import EditableImage from '../EditableImage'
import EditableText from '../EditableText'
import ActivityLogBlock from './ActivityLogBlock'
import { useBuilder } from '../BuilderContext'

/* ─── 1. HERO BLOCK ─────────────────────────────────────── */
function HeroPreview({ id }: { id: string }) {
  const { previewMode, getText } = useBuilder()
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <EditableImage
          blockId={id} imageKey="cover"
          defaultUrl="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=70"
          wrapperClassName="absolute inset-0"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-5">
        <EditableText
          blockId={id} textKey="tagline"
          defaultValue="Where the jungle meets your pillow."
          className="text-base text-stone-600 italic"
          as="p"
        />
        {previewMode ? (
          /* Preview mode — show contact details directly */
          <div className="bg-brand-50 border border-brand-200 rounded-xl overflow-hidden">
            <div className="divide-y divide-brand-100">
              {[
                { key: 'contact-name',     label: 'Host Name', emoji: '👤', placeholder: 'e.g. Meena Patil' },
                { key: 'contact-phone',    label: 'Phone',     emoji: '📞', placeholder: 'e.g. +91 98765 43210' },
                { key: 'contact-whatsapp', label: 'WhatsApp',  emoji: '💬', placeholder: 'e.g. +91 98765 43210' },
                { key: 'contact-email',    label: 'Email',     emoji: '✉️', placeholder: 'e.g. meena@example.com' },
                { key: 'contact-address',  label: 'Address',   emoji: '📍', placeholder: 'e.g. Dodamarg, Sindhudurg' },
              ].map(({ key, label, emoji, placeholder }) => (
                <div key={key} className="flex items-center gap-2.5 px-4 py-2.5">
                  <span className="text-sm shrink-0">{emoji}</span>
                  <span className="text-[10px] font-semibold text-brand-700 w-16 shrink-0">{label}</span>
                  <span className="flex-1 text-sm text-stone-800">{getText(id, key, placeholder)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Builder mode — editable contact fields */
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-100 px-3 py-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Contact Details (hidden behind login on live site)</span>
            </div>
            <div className="divide-y divide-stone-100">
              {[
                { key: 'contact-name',     label: 'Host Name', placeholder: 'e.g. Meena Patil',         emoji: '👤' },
                { key: 'contact-phone',    label: 'Phone',     placeholder: 'e.g. +91 98765 43210',      emoji: '📞' },
                { key: 'contact-whatsapp', label: 'WhatsApp',  placeholder: 'e.g. +91 98765 43210',      emoji: '💬' },
                { key: 'contact-email',    label: 'Email',     placeholder: 'e.g. meena@example.com',    emoji: '✉️' },
                { key: 'contact-address',  label: 'Address',   placeholder: 'e.g. Dodamarg, Sindhudurg', emoji: '📍' },
              ].map(({ key, label, placeholder, emoji }) => (
                <div key={key} className="flex items-center gap-2.5 px-4 py-2.5">
                  <span className="text-sm shrink-0">{emoji}</span>
                  <span className="text-[10px] font-semibold text-stone-400 w-16 shrink-0">{label}</span>
                  <EditableText
                    blockId={id} textKey={key}
                    defaultValue={placeholder}
                    className="flex-1 text-sm text-stone-700 truncate"
                    as="span"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── 2. HOST STORY ──────────────────────────────────────── */
function HostStoryPreview({ id }: { id: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 flex flex-col sm:flex-row gap-6">
      <div className="shrink-0">
        <EditableImage
          blockId={id} imageKey="host-photo"
          defaultUrl="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&q=70"
          wrapperClassName="w-20 h-20 rounded-full border-2 border-stone-200 overflow-hidden"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <EditableText
          blockId={id} textKey="story-title"
          defaultValue="Our Story — The Patil Family"
          className="text-base font-semibold text-stone-900"
          as="h2"
        />
        <EditableText
          blockId={id} textKey="story-body"
          defaultValue="We've farmed this land for three generations. In 2012, we opened our home to travelers — not as a business, but as a way of sharing the life we love."
          multiline
          className="text-sm text-stone-600 leading-relaxed"
          as="p"
        />
      </div>
    </div>
  )
}

/* ─── 4. RULES BLOCK ─────────────────────────────────────── */
const DEFAULT_POLICIES = [
  'Check-in after 2:00 PM, check-out by 11:00 AM',
  'Quiet hours after 10:00 PM',
  'No smoking inside the house',
  'Traditional attire near prayer areas',
]
const DEFAULT_PROHIBITED = ['Single-use plastics', 'Outside alcohol', 'Loud music']

function EditableList({
  items,
  onAdd,
  onRemove,
  onEdit,
  icon,
  previewMode,
}: {
  items: string[]
  onAdd: (val: string) => void
  onRemove: (i: number) => void
  onEdit: (i: number, val: string) => void
  icon: React.ReactNode
  previewMode: boolean
}) {
  const [draft, setDraft] = useState('')
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState('')

  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-1.5 group/item">
          <span className="mt-1 shrink-0">{icon}</span>
          {!previewMode && editingIdx === i ? (
            <input
              autoFocus
              value={editDraft}
              onChange={e => setEditDraft(e.target.value)}
              onBlur={() => { onEdit(i, editDraft); setEditingIdx(null) }}
              onKeyDown={e => {
                if (e.key === 'Enter') { onEdit(i, editDraft); setEditingIdx(null) }
                if (e.key === 'Escape') setEditingIdx(null)
              }}
              className="flex-1 text-xs bg-brand-50 border border-brand-300 rounded px-1.5 py-0.5 outline-none"
            />
          ) : (
            <span
              className={`flex-1 text-xs text-stone-700 leading-snug ${!previewMode ? 'cursor-text hover:text-brand-700' : ''}`}
              onClick={() => { if (!previewMode) { setEditingIdx(i); setEditDraft(item) } }}
            >
              {item}
            </span>
          )}
          {!previewMode && editingIdx !== i && (
            <button
              onClick={() => onRemove(i)}
              className="opacity-0 group-hover/item:opacity-100 text-rose-400 hover:text-rose-600 transition-opacity shrink-0 mt-0.5"
            >
              <X size={11} />
            </button>
          )}
        </li>
      ))}
      {!previewMode && (
        <li className="flex items-center gap-1.5 mt-1.5">
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && draft.trim()) { onAdd(draft.trim()); setDraft('') }
            }}
            placeholder="Add item… (Enter to save)"
            className="flex-1 text-[11px] bg-stone-50 border border-dashed border-stone-300 rounded-lg px-2.5 py-1.5 outline-none placeholder:text-stone-300 focus:border-brand-400 focus:bg-brand-50 transition-colors"
          />
        </li>
      )}
    </ul>
  )
}

function RulesBlockPreview({ id }: { id: string }) {
  const { getText, updateText, previewMode } = useBuilder()

  const getPolicies = (): string[] => {
    try { return JSON.parse(getText(id, 'policies', JSON.stringify(DEFAULT_POLICIES))) } catch { return DEFAULT_POLICIES }
  }
  const getProhibited = (): string[] => {
    try { return JSON.parse(getText(id, 'prohibited', JSON.stringify(DEFAULT_PROHIBITED))) } catch { return DEFAULT_PROHIBITED }
  }

  const policies   = getPolicies()
  const prohibited = getProhibited()

  const savePolicies  = (next: string[]) => updateText(id, 'policies',   JSON.stringify(next))
  const saveProhibited = (next: string[]) => updateText(id, 'prohibited', JSON.stringify(next))

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-5">
      <div className="flex items-center gap-2">
        <ScrollText size={18} className="text-stone-500" />
        <h2 className="font-semibold text-stone-900">House Rules & Safety</h2>
      </div>
      <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <ShieldCheck size={16} className="text-green-600 shrink-0" />
        <p className="text-sm font-medium text-green-800">Verified safe for solo female travelers</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">House policies</p>
        <EditableList
          items={policies}
          previewMode={previewMode}
          icon={<span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 block" />}
          onAdd={val => savePolicies([...policies, val])}
          onRemove={i => savePolicies(policies.filter((_, idx) => idx !== i))}
          onEdit={(i, val) => { const next = [...policies]; next[i] = val; savePolicies(next) }}
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Please do not bring</p>
        <EditableList
          items={prohibited}
          previewMode={previewMode}
            icon={<Ban size={10} className="text-rose-400 mt-0.5" />}
            onAdd={val => saveProhibited([...prohibited, val])}
            onRemove={i => saveProhibited(prohibited.filter((_, idx) => idx !== i))}
            onEdit={(i, val) => { const next = [...prohibited]; next[i] = val; saveProhibited(next) }}
          />
      </div>
    </div>
  )
}

/* ─── 5. VIDEO BLOCK ─────────────────────────────────────── */
function YoutubeUrlInput({ blockId }: { blockId: string }) {
  const { getText, updateText } = useBuilder()
  const value = getText(blockId, 'youtube-url', '')
  return (
    <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5">
      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest shrink-0">YouTube</span>
      <input
        type="text"
        value={value}
        onChange={e => updateText(blockId, 'youtube-url', e.target.value || null)}
        placeholder="Paste YouTube link…"
        className="flex-1 bg-transparent text-[11px] text-brand-600 placeholder:text-stone-300 outline-none min-w-0"
      />
    </div>
  )
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0]
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v')
  } catch {}
  return null
}

function VideoPreview({ id }: { id: string }) {
  const { getText, previewMode } = useBuilder()
  const ytUrl = getText(id, 'youtube-url', '')
  const videoId = ytUrl ? extractYouTubeId(ytUrl) : null

  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-950">
      {/* Embed or placeholder */}
      {videoId ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5 py-8">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-transparent border-l-white ml-0.5" />
          </div>
          <p className="text-[11px] text-white/40 font-medium">Paste a YouTube link below</p>
        </div>
      )}

      {/* YouTube URL + caption */}
      {!previewMode && (
        <div className="bg-white border-t border-stone-100 px-4 py-2.5">
          <YoutubeUrlInput blockId={id} />
        </div>
      )}
    </div>
  )
}

/* ─── 6. GALLERY ─────────────────────────────────────────── */
const GALLERY_DEFAULTS = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=60',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=300&q=60',
  'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=300&q=60',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=60',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300&q=60',
  'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300&q=60',
]

function GalleryPreview({ id }: { id: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="text-base font-semibold text-stone-900 mb-4">Photo Gallery</h2>
      <div className="grid grid-cols-3 gap-1.5">
        {GALLERY_DEFAULTS.map((src, i) => (
          <EditableImage
            key={i}
            blockId={id} imageKey={`gallery-${i}`}
            defaultUrl={src}
            wrapperClassName="aspect-square overflow-hidden rounded-lg"
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
  )
}

/* ─── 7. ROOMS ───────────────────────────────────────────── */
const ROOM_DEFAULTS = [
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=60',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=60',
]

function RoomsPreview({ id }: { id: string }) {
  const rooms = [
    { key: 'room-0', name: 'Garden Room',  guests: '2 guests · 1 bed', price: '₹2,400 / night' },
    { key: 'room-1', name: 'Forest Suite', guests: '4 guests · 2 beds', price: '₹3,800 / night' },
  ]
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-5">
      <h2 className="text-base font-semibold text-stone-900">Rooms & Accommodation</h2>
      <div className="space-y-3">
        {rooms.map((r, i) => (
          <div key={r.key} className="flex gap-4 border border-stone-100 rounded-xl overflow-hidden">
            <EditableImage
              blockId={id} imageKey={r.key}
              defaultUrl={ROOM_DEFAULTS[i]}
              wrapperClassName="w-24 shrink-0"
              className="w-full h-full object-cover"
            />
            <div className="py-3 pr-4 space-y-1">
              <p className="text-sm font-semibold text-stone-900">{r.name}</p>
              <p className="text-xs text-stone-500">{r.guests}</p>
              <p className="text-sm font-bold text-brand-600">{r.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 9. REVIEWS ─────────────────────────────────────────── */
function ReviewsPreview() {
  const reviews = [
    { name: 'Priya M.', initials: 'P', rating: 5, date: 'Apr 2025', text: "Absolutely magical! The birding at dawn was unforgettable. Meena's cooking is the best I've ever had." },
    { name: 'Rahul K.', initials: 'R', rating: 5, date: 'Mar 2025', text: 'A true escape from city life. Clean rooms, warm hospitality, and stunning nature all around.' },
  ]
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-stone-900">Community Reviews</h2>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm font-semibold text-amber-800">4.9</span>
          <span className="text-xs text-amber-600">(24 reviews)</span>
        </div>
      </div>
      <div className="space-y-5">
        {reviews.map(r => (
          <div key={r.name} className="border-b border-stone-100 pb-5 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 shrink-0">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">{r.name}</p>
                <p className="text-xs text-stone-400">{r.date}</p>
              </div>
              <div className="ml-auto text-amber-400 text-xs">{'★'.repeat(r.rating)}</div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed ml-11">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── 10. FOOD SECTION ───────────────────────────────────── */
const FOOD_DEFAULTS = [
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=60',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=60',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&q=60',
]

function FoodPreview({ id }: { id: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 flex gap-5 items-start">
      <div className="flex-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Farm to Table</p>
        <h2 className="text-base font-semibold text-stone-900">Authentic Home Cooking</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Fresh vegetables from our garden, traditional recipes passed through generations.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['Breakfast', 'Lunch', 'Dinner'].map(m => (
            <span key={m} className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-2.5 py-1 rounded-full">{m}</span>
          ))}
        </div>
      </div>
      <div className="w-28 shrink-0">
        <div className="grid grid-cols-2 gap-1">
          <EditableImage
            blockId={id} imageKey="food-0"
            defaultUrl={FOOD_DEFAULTS[0]}
            wrapperClassName="col-span-2 aspect-video overflow-hidden rounded-lg"
            className="w-full h-full object-cover"
          />
          <EditableImage
            blockId={id} imageKey="food-1"
            defaultUrl={FOOD_DEFAULTS[1]}
            wrapperClassName="aspect-square overflow-hidden rounded-lg"
            className="w-full h-full object-cover"
          />
          <EditableImage
            blockId={id} imageKey="food-2"
            defaultUrl={FOOD_DEFAULTS[2]}
            wrapperClassName="aspect-square overflow-hidden rounded-lg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

/* ─── 11. WHATSAPP CTA ───────────────────────────────────── */
function WhatsappPreview() {
  return (
    <div className="rounded-2xl bg-green-50 border border-green-200 p-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-base font-semibold text-stone-900">Chat directly with Meena</p>
        <p className="text-sm text-stone-500 mt-1">Usually replies within 1 hour · No booking fees</p>
      </div>
      <span className="shrink-0 inline-flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm whitespace-nowrap">
        💬 WhatsApp
      </span>
    </div>
  )
}

/* ─── 12. MAP ────────────────────────────────────────────── */
function MapPreview() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MapPin size={18} className="text-brand-600" />
        <h2 className="text-base font-semibold text-stone-900">Location</h2>
      </div>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-stone-100 border border-stone-200" style={{ height: 140 }}>
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-1.5">
          <span className="text-3xl">📍</span>
          <p className="text-sm font-semibold text-stone-700">Dodamarg, Sindhudurg</p>
          <p className="text-xs text-stone-400">Maharashtra · 16.04°N, 74.14°E</p>
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20,40,60,80].map(v => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="#16a34a" strokeWidth="0.5"/>
              <line x1="0" y1={v} x2="100" y2={v} stroke="#16a34a" strokeWidth="0.5"/>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <Globe2 size={14} className="text-stone-400" />
        <span>Nearest town: Sawantwadi · 18 km</span>
      </div>
    </div>
  )
}

/* ─── Main Switch ────────────────────────────────────────── */
function BlockContent({ block }: { block: CanvasBlock }) {
  const id = block.id
  switch (block.type) {
    case 'hero':        return <HeroPreview id={id} />
    case 'host-story':  return <HostStoryPreview id={id} />
    case 'birding-log': return <ActivityLogBlock blockId={id} />
    case 'rules-block': return <RulesBlockPreview id={id} />
    case 'video':       return <VideoPreview id={id} />
    case 'gallery':     return <GalleryPreview id={id} />
    case 'rooms':       return <RoomsPreview id={id} />
    case 'reviews':     return <ReviewsPreview />
    case 'food':        return <FoodPreview id={id} />
    case 'whatsapp':    return <WhatsappPreview />
    case 'map':         return <MapPreview />
    default:            return null
  }
}

export default function BlockPreview({ block }: { block: CanvasBlock }) {
  const { bgColor, textColor, accentColor, paddingY, borderRadius, showShadow, fontFamily, headingSize } = block.props

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: bgColor ?? '#ffffff',
    color: textColor ?? '#1c1c1c',
    paddingTop: paddingY ?? 0,
    paddingBottom: paddingY ?? 0,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    boxShadow: showShadow ? '0 4px 24px rgba(0,0,0,0.15)' : undefined,
    fontFamily: fontFamily ?? 'Inter',
    '--accent': accentColor ?? '#1e6b1e',
    '--heading-size': headingSize ? `${headingSize}px` : '32px',
  } as React.CSSProperties

  return (
    <div style={wrapperStyle} className="transition-all duration-200">
      <BlockContent block={block} />
    </div>
  )
}
