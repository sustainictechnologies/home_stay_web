'use client'

import { motion } from 'framer-motion'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DATA = {
  inquiries:   [12, 18, 14, 22, 30, 28, 35, 42, 38, 45, 40, 52],
  approvals:   [4,   7,  5,  9, 12, 11, 14, 18, 15, 20, 17, 24],
  reviews:     [2,   4,  3,  6,  8,  7,  9, 12, 10, 14, 12, 16],
}

const MAX = Math.max(...DATA.inquiries)

interface BarProps {
  value: number
  max: number
  color: string
  delay: number
  label: string
}

function Bar({ value, max, color, delay, label }: BarProps) {
  const pct = (value / max) * 100
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="text-[10px] font-semibold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
        {value}
      </span>
      <div className="w-full flex flex-col justify-end" style={{ height: 120 }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          className={`w-full rounded-t-md ${color}`}
          title={`${label}: ${value}`}
        />
      </div>
    </div>
  )
}

export default function AnalyticsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-stone-900">Platform Activity</h3>
          <p className="text-xs text-stone-400 mt-0.5">Inquiries, approvals & reviews — 2025</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-stone-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-500 inline-block" /> Inquiries
          </span>
          <span className="flex items-center gap-1.5 text-stone-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-200 inline-block" /> Approvals
          </span>
          <span className="flex items-center gap-1.5 text-stone-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-300 inline-block" /> Reviews
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-1.5 group">
        {MONTHS.map((month, i) => (
          <div key={month} className="flex-1 flex flex-col gap-0.5 group">
            {/* Stacked bars per month */}
            <div className="flex items-end gap-0.5 flex-1" style={{ height: 120 }}>
              <div className="flex flex-col justify-end flex-1" style={{ height: 120 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(DATA.inquiries[i] / MAX) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
                  className="w-full rounded-t-md bg-brand-500 opacity-85 hover:opacity-100 transition-opacity cursor-default"
                  title={`Inquiries: ${DATA.inquiries[i]}`}
                />
              </div>
              <div className="flex flex-col justify-end flex-1" style={{ height: 120 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(DATA.approvals[i] / MAX) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04 + 0.08, ease: 'easeOut' }}
                  className="w-full rounded-t-md bg-brand-200 hover:bg-brand-300 transition-colors cursor-default"
                  title={`Approvals: ${DATA.approvals[i]}`}
                />
              </div>
              <div className="flex flex-col justify-end flex-1" style={{ height: 120 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(DATA.reviews[i] / MAX) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04 + 0.16, ease: 'easeOut' }}
                  className="w-full rounded-t-md bg-amber-300 hover:bg-amber-400 transition-colors cursor-default"
                  title={`Reviews: ${DATA.reviews[i]}`}
                />
              </div>
            </div>
            <p className="text-[9px] text-stone-400 text-center mt-1 font-medium">{month}</p>
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-3 gap-4">
        {[
          { label: 'Total Inquiries', value: DATA.inquiries.reduce((a, b) => a + b, 0), color: 'text-brand-600' },
          { label: 'Approved Hosts',  value: DATA.approvals.reduce((a, b) => a + b, 0), color: 'text-brand-500' },
          { label: 'Reviews Posted',  value: DATA.reviews.reduce((a, b) => a + b, 0),   color: 'text-amber-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-xs text-stone-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
