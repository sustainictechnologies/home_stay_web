'use client'

import { motion } from 'framer-motion'
import { Plus, UserCheck, Star, Download } from 'lucide-react'

const ACTIONS = [
  { label: 'Add Homestay',      icon: Plus,       color: 'bg-brand-600 hover:bg-brand-700 text-white', href: '#' },
  { label: 'Review Applications', icon: UserCheck, color: 'bg-amber-500 hover:bg-amber-600 text-white', href: '#' },
  { label: 'Moderate Reviews',  icon: Star,       color: 'bg-indigo-500 hover:bg-indigo-600 text-white', href: '#' },
  { label: 'Export Data',       icon: Download,   color: 'bg-stone-700 hover:bg-stone-800 text-white', href: '#' },
]

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
      className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6"
    >
      <h3 className="text-sm font-bold text-stone-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map(({ label, icon: Icon, color }, i) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${color} shadow-sm`}
          >
            <Icon size={15} strokeWidth={2} />
            <span className="leading-tight text-left">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
