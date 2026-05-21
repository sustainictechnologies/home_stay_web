'use client'

import { useState, useTransition } from 'react'
import type { User } from '@supabase/supabase-js'
import { Star, LogIn, Send } from 'lucide-react'
import { submitReview } from '@/lib/actions/reviews'
import { createClient } from '@/lib/supabase/client'

interface Props {
  homestayId: string
  slug: string
  user: User | null
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={22}
              className={
                star <= (hover || value)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-stone-300 fill-stone-300'
              }
            />
          </button>
        )
      })}
    </div>
  )
}

export default function ReviewForm({ homestayId, slug, user }: Props) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleGoogleSignIn() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/homestays/${slug}`,
      },
    })
  }

  if (!user) {
    return (
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-stone-800 text-sm mb-1">Share your experience</p>
          <p className="text-xs text-stone-500">
            Sign in with Google to leave a verified community review.
          </p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors shrink-0"
        >
          <LogIn size={15} />
          Sign in with Google
        </button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 text-sm text-brand-800 font-medium">
        Thank you for your review! It helps the community.
      </div>
    )
  }

  function handleSubmit() {
    setError(null)
    if (rating === 0) { setError('Please select a star rating.'); return }
    if (!comment.trim()) { setError('Please write a short review.'); return }

    startTransition(async () => {
      const result = await submitReview(homestayId, slug, rating, comment)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
      }
    })
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-semibold text-stone-900 text-sm">Write a review</h3>

      <StarPicker value={rating} onChange={setRating} />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share what made your stay memorable…"
        rows={3}
        maxLength={1000}
        className="w-full text-sm border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
      />

      {error && <p className="text-xs text-rose-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
      >
        <Send size={14} />
        {isPending ? 'Submitting…' : 'Submit Review'}
      </button>
    </div>
  )
}