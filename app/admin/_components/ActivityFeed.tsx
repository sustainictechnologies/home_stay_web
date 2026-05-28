'use client'

import { motion } from 'framer-motion'
import { Home, Star, UserCheck, AlertCircle, MapPin, CheckCircle2 } from 'lucide-react'

const ACTIVITIES = [
  {
    id: 1,
    type: 'approval',
    icon: UserCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Host approved',
    description: 'Ramesh Patil — Sindhudurg District has been verified',
    time: '2 min ago',
    badge: 'Approved',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 2,
    type: 'submission',
    icon: Home,
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
    title: 'New homestay submitted',
    description: '"Sahyadri Forest Retreat" — Kolhapur, Maharashtra',
    time: '18 min ago',
    badge: 'Pending',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    id: 3,
    type: 'review',
    icon: Star,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    title: 'New 5-star review',
    description: '"Incredible stay with the Nair family in Wayanad" — Priya M.',
    time: '1 hr ago',
    badge: '★ 5.0',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    id: 4,
    type: 'flag',
    icon: AlertCircle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    title: 'Application flagged',
    description: 'Missing verification documents — "Thar Desert Camp"',
    time: '3 hr ago',
    badge: 'Action needed',
    badgeColor: 'bg-red-50 text-red-600',
  },
  {
    id: 5,
    type: 'region',
    icon: MapPin,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    title: 'New region activated',
    description: '"Spiti Valley" region is now live with 2 homestays',
    time: '5 hr ago',
    badge: 'Live',
    badgeColor: 'bg-indigo-50 text-indigo-700',
  },
  {
    id: 6,
    type: 'approval',
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Profile verified',
    description: 'Meena Devi — Himachal Pradesh · Spiti Valley',
    time: 'Yesterday',
    badge: 'Verified',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
]

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.42 }}
      className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-stone-900">Recent Activity</h3>
          <p className="text-xs text-stone-400 mt-0.5">Latest platform events</p>
        </div>
        <button className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors">
          View all →
        </button>
      </div>

      <div className="space-y-1">
        {ACTIVITIES.map(({ id, icon: Icon, iconBg, iconColor, title, description, time, badge, badgeColor }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.45 + i * 0.06 }}
            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-default group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
              <Icon size={16} className={iconColor} strokeWidth={1.8} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-stone-800 truncate">{title}</p>
                <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <p className="text-xs text-stone-400 truncate">{description}</p>
            </div>

            <span className="text-[10px] text-stone-400 shrink-0 mt-0.5 font-medium">{time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
