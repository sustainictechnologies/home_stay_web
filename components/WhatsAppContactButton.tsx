'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, X, Eye, EyeOff, Clock, ChevronRight } from 'lucide-react'

/* ─── WhatsApp SVG icon ─────────────────────────────────────── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ─── Traveler types ────────────────────────────────────────── */
const TRAVELER_TYPES = [
  { id: 'solo-rider',      label: 'Solo Rider',      emoji: '🏍️' },
  { id: 'bird-watcher',    label: 'Bird Watcher',    emoji: '🦜' },
  { id: 'family',          label: 'Family Traveler', emoji: '👨‍👩‍👧' },
  { id: 'backpacker',      label: 'Backpacker',      emoji: '🎒' },
  { id: 'couple',          label: 'Couple',          emoji: '💑' },
  { id: 'nature-explorer', label: 'Nature Explorer', emoji: '🌿' },
]

/* ─── Helpers ───────────────────────────────────────────────── */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) return '91' + digits.slice(1)
  if (digits.length === 10) return '91' + digits
  return digits
}

function buildMessage(hostName: string, travelerType: string, dates: string): string {
  const label = TRAVELER_TYPES.find(t => t.id === travelerType)?.label ?? travelerType
  const dateStr = dates.trim() || 'dates to be decided'
  return (
    `Hello ${hostName},\n\n` +
    `I discovered your stay on JALAD.\n\n` +
    `I am interested in visiting during ${dateStr}.\n\n` +
    `Traveler Type: ${label}\n\n` +
    `Could you please share availability and stay details?\n\n` +
    `Thank you.`
  )
}

function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{4})/g, '•')
}

/* ─── Props ─────────────────────────────────────────────────── */
interface Props {
  hostName: string
  phone: string
  callingWindow?: string
}

/* ─── Main component ────────────────────────────────────────── */
export default function WhatsAppContactButton({ hostName, phone, callingWindow }: Props) {
  const [showModal, setShowModal]         = useState(false)
  const [travelerType, setTravelerType]   = useState('')
  const [dates, setDates]                 = useState('')
  const [revealStep, setRevealStep]       = useState<'hidden' | 'confirm' | 'shown'>('hidden')

  const message     = travelerType ? buildMessage(hostName, travelerType, dates) : ''
  const whatsappUrl = message
    ? `https://wa.me/${formatPhone(phone)}?text=${encodeURIComponent(message)}`
    : ''

  const openModal = () => { setTravelerType(''); setDates(''); setShowModal(true) }

  return (
    <>
      {/* ── Contact card ──────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/60 border border-green-200 p-5 space-y-4">

        {/* Trust indicators */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Verified Host</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            Usually responds within 2 hrs
          </div>
        </div>

        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={openModal}
          className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 px-5 rounded-xl shadow-md shadow-green-200/60 transition-colors"
        >
          <WhatsAppIcon size={20} />
          <span className="flex-1 text-left">Connect on WhatsApp</span>
          <ChevronRight size={16} className="opacity-70" />
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={openModal}
          className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-green-50 text-green-700 font-semibold py-2.5 px-5 rounded-xl border border-green-200 transition-colors text-sm"
        >
          <WhatsAppIcon size={16} />
          Chat with Host
        </motion.button>

        {/* Safe comms badge */}
        <div className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2 text-xs text-stone-500">
          <span>🔒</span>
          <span>Safe, community-first communication · No number exposed</span>
        </div>

        {/* Calling window */}
        {callingWindow && (
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Clock size={12} />
            <span>Best time to reach: {callingWindow}</span>
          </div>
        )}

        {/* Reveal number fallback */}
        <div className="border-t border-green-100 pt-3">
          {revealStep === 'hidden' && (
            <button
              onClick={() => setRevealStep('confirm')}
              className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
            >
              Prefer to call directly? Reveal number
            </button>
          )}
          {revealStep === 'confirm' && (
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone-500 flex-1">Please use WhatsApp to keep the community safe. Still want to reveal?</p>
              <button
                onClick={() => setRevealStep('shown')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 shrink-0"
              >
                Yes, reveal
              </button>
              <button
                onClick={() => setRevealStep('hidden')}
                className="text-xs text-stone-400 hover:text-stone-600 shrink-0"
              >
                Cancel
              </button>
            </div>
          )}
          {revealStep === 'shown' && (
            <RevealedNumber phone={phone} onHide={() => setRevealStep('hidden')} />
          )}
        </div>
      </div>

      {/* ── Traveler type modal ────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
          >
            <motion.div
              initial={{ y: 48, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 48, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Modal header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Connect with {hostName}</p>
                    <p className="text-green-100 text-[11px]">via WhatsApp · JALAD Community</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white transition-colors p-1">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">

                {/* Traveler type */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
                    I am a <span className="text-rose-400">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TRAVELER_TYPES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTravelerType(t.id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                          travelerType === t.id
                            ? 'bg-green-50 border-green-400 text-green-800 shadow-sm ring-1 ring-green-300'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-green-50/50 hover:border-green-200'
                        }`}
                      >
                        <span className="text-xl shrink-0">{t.emoji}</span>
                        <span className="text-xs font-semibold leading-tight">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred dates */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                    Preferred dates
                    <span className="ml-1 normal-case font-normal text-stone-300">(optional)</span>
                  </p>
                  <input
                    type="text"
                    value={dates}
                    onChange={e => setDates(e.target.value)}
                    placeholder="e.g. 15–18 June 2025"
                    className="w-full text-sm border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-300"
                  />
                </div>

                {/* Message preview */}
                <AnimatePresence>
                  {travelerType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 border border-green-100 rounded-xl p-4 overflow-hidden"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-2">Message preview</p>
                      <p className="text-xs text-stone-600 whitespace-pre-line leading-relaxed">{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Open WhatsApp */}
                <motion.a
                  href={whatsappUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => { if (!travelerType) { e.preventDefault() } else { setShowModal(false) } }}
                  whileHover={travelerType ? { scale: 1.02 } : undefined}
                  whileTap={travelerType ? { scale: 0.97 } : undefined}
                  className={`flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                    travelerType
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 cursor-pointer'
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed select-none'
                  }`}
                >
                  <WhatsAppIcon size={20} />
                  {travelerType ? 'Open WhatsApp' : 'Select your traveler type above'}
                </motion.a>

                <p className="text-center text-[10px] text-stone-400 leading-relaxed">
                  WhatsApp will open with a pre-filled message.<br />
                  You send it manually. Host number is never shown publicly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Reveal number sub-component ──────────────────────────── */
function RevealedNumber({ phone, onHide }: { phone: string; onHide: () => void }) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-mono tracking-wide ${show ? 'text-stone-800' : 'text-stone-400 select-none'}`}>
        {show ? phone : maskPhone(phone)}
      </span>
      <button onClick={() => setShow(v => !v)} className="text-stone-400 hover:text-brand-600 transition-colors">
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
      <button onClick={onHide} className="text-stone-300 hover:text-stone-500 transition-colors ml-auto">
        <X size={13} />
      </button>
    </div>
  )
}

function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{4})/g, '•')
}
