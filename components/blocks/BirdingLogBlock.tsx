import { Bird, Clock, MapPin } from 'lucide-react'
import type { BirdingLogBlockData } from '@/types/blocks.types'

interface Props {
  data: BirdingLogBlockData
}

export default function BirdingLogBlock({ data }: Props) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Bird size={20} className="text-teal-600" />
        <h2 className="font-semibold text-teal-900">Birding Log</h2>
      </div>

      {data.highlight_species.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
            Species spotted here
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.highlight_species.map((species) => (
              <span
                key={species}
                className="text-xs bg-white text-teal-800 border border-teal-200 px-2.5 py-1 rounded-full"
              >
                {species}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-2.5">
          <Clock size={14} className="text-teal-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-teal-700">Best watching hours</p>
            <p className="text-sm text-teal-900">{data.best_watching_hours}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin size={14} className="text-teal-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-teal-700">Nearby hotspot</p>
            <p className="text-sm text-teal-900">{data.nearby_hotspot_trail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}