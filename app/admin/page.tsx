'use client'

import Topbar from './_components/Topbar'
import StatCard from './_components/StatCard'
import AnalyticsChart from './_components/AnalyticsChart'
import ActivityFeed from './_components/ActivityFeed'
import QuickActions from './_components/QuickActions'
import PendingTable from './_components/PendingTable'
import { Home, ShieldCheck, Clock, MapPin } from 'lucide-react'

const STATS = [
  {
    title: 'Total Homestays',
    value: 148,
    change: '12 this month',
    changeType: 'up' as const,
    icon: Home,
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    title: 'Verified Hosts',
    value: 112,
    change: '8 this month',
    changeType: 'up' as const,
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Pending Approvals',
    value: 5,
    change: '3 urgent',
    changeType: 'down' as const,
    icon: Clock,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Active Regions',
    value: 23,
    change: '2 new',
    changeType: 'up' as const,
    icon: MapPin,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
]

export default function AdminDashboard() {
  const now = new Date()
  const time = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Dashboard" subtitle={time} />

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* Middle row: chart + quick actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <AnalyticsChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Bottom row: pending table + activity feed */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          <div className="xl:col-span-3">
            <PendingTable />
          </div>
          <div className="xl:col-span-2">
            <ActivityFeed />
          </div>
        </div>

      </main>
    </div>
  )
}
