import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ShieldCheck, Phone } from 'lucide-react'
import type { HomestayWithCategories } from '@/types/blocks.types'

interface Props {
  homestay: HomestayWithCategories
}

export default function HomestayCard({ homestay: h }: Props) {
  return (
    <Link
      href={`/homestays/${h.slug}`}
      className="block hover:bg-stone-50 transition-colors"
    >
      {/* Cover image */}
      <div className="relative w-full h-40 bg-stone-100 overflow-hidden">
        {h.cover_image_url ? (
          <Image
            src={h.cover_image_url}
            alt={h.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 384px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-stone-200 flex items-center justify-center">
            <MapPin size={28} className="text-brand-300" />
          </div>
        )}
        {h.is_verified && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            <ShieldCheck size={11} /> Verified
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-stone-900 leading-snug mb-1">{h.title}</h3>

        <div className="flex items-center gap-1 text-xs text-stone-500 mb-2">
          <MapPin size={11} />
          <span>{h.village_name}, {h.location_district}</span>
        </div>

        {h.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {h.categories.slice(0, 3).map((c) => (
              <span
                key={c.id}
                className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full"
              >
                {c.name}
              </span>
            ))}
            {h.categories.length > 3 && (
              <span className="text-xs text-stone-400">+{h.categories.length - 3} more</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-stone-400">
          <Phone size={10} />
          <span>Call {h.calling_window}</span>
        </div>
      </div>
    </Link>
  )
}
