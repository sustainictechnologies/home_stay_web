'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  iconColor: string
  iconBg: string
  index?: number
}

export default function StatCard({
  title, value, change, changeType = 'neutral',
  icon: Icon, iconColor, iconBg, index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
      className="bg-white rounded-2xl border border-stone-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className={iconColor} strokeWidth={1.8} />
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            changeType === 'up'
              ? 'bg-emerald-50 text-emerald-600'
              : changeType === 'down'
              ? 'bg-red-50 text-red-500'
              : 'bg-stone-100 text-stone-500'
          }`}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '—'} {change}
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-stone-900 tracking-tight">{value}</p>
      <p className="text-sm text-stone-400 mt-1 font-medium">{title}</p>

      {/* Subtle bottom bar */}
      <div className={`mt-4 h-1 rounded-full ${iconBg} opacity-60`} />
    </motion.div>
  )
}
