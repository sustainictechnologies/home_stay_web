import { Star } from 'lucide-react'
import type { ReviewWithProfile } from '@/types/blocks.types'

interface Props {
  reviews: ReviewWithProfile[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200 fill-stone-200'}
        />
      ))}
    </div>
  )
}

export default function ReviewList({ reviews }: Props) {
  return (
    <div className="space-y-5">
      {reviews.map((r) => (
        <div key={r.id} className="border-b border-stone-100 pb-5 last:border-0 last:pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 shrink-0">
              {r.profiles?.full_name?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">
                {r.profiles?.full_name ?? 'Traveler'}
              </p>
              <p className="text-xs text-stone-400">
                {new Date(r.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="ml-auto">
              <StarRating rating={r.rating} />
            </div>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed ml-11">{r.comment}</p>
        </div>
      ))}
    </div>
  )
}