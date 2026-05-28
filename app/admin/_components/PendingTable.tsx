'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Eye, MapPin } from 'lucide-react'

const PENDING = [
  { id: 1, name: 'Sahyadri Forest Retreat',  host: 'Ramesh Patil',     location: 'Kolhapur, MH',     type: 'Forest Stay',   submitted: '2 days ago' },
  { id: 2, name: 'Thar Desert Camp',          host: 'Sunita Mehta',     location: 'Jaisalmer, RJ',    type: 'Desert Camp',   submitted: '3 days ago' },
  { id: 3, name: 'Himalayan Birder Nest',     host: 'Tenzin Norbu',     location: 'Spiti, HP',        type: 'Mountain Stay', submitted: '4 days ago' },
  { id: 4, name: 'Backwater Farmhouse',       host: 'Meena Devi',       location: 'Alleppey, KL',     type: 'Farm Stay',     submitted: '5 days ago' },
  { id: 5, name: 'Araku Valley Tribal Home',  host: 'Venkata Rao',      location: 'Araku, AP',        type: 'Tribal Culture', submitted: '1 week ago' },
]

export default function PendingTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.38 }}
      className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-stone-900">Pending Approvals</h3>
          <p className="text-xs text-stone-400 mt-0.5">{PENDING.length} applications awaiting review</p>
        </div>
        <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
          {PENDING.length} pending
        </span>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-stone-100">
              {['Homestay', 'Host', 'Location', 'Type', 'Submitted', 'Actions'].map((h) => (
                <th key={h} className="text-left py-2 px-2 font-semibold text-stone-400 uppercase tracking-wide text-[10px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PENDING.map(({ id, name, host, location, type, submitted }, i) => (
              <motion.tr
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 + i * 0.06 }}
                className="border-b border-stone-50 hover:bg-stone-50 transition-colors group"
              >
                <td className="py-3 px-2">
                  <p className="font-semibold text-stone-800">{name}</p>
                </td>
                <td className="py-3 px-2 text-stone-500">{host}</td>
                <td className="py-3 px-2">
                  <span className="flex items-center gap-1 text-stone-500">
                    <MapPin size={10} className="text-brand-400 shrink-0" />
                    {location}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                    {type}
                  </span>
                </td>
                <td className="py-3 px-2 text-stone-400">{submitted}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors" title="View">
                      <Eye size={13} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors" title="Approve">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Reject">
                      <XCircle size={13} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
