'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User, LogOut } from 'lucide-react'

export default function UserButton() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setEmail(session?.user?.email ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) return null

  if (!email) {
    return (
      <Link
        href="/login"
        className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-brand-700 border border-stone-200 hover:border-brand-300 px-3 py-2 rounded-full transition-all"
      >
        <User size={14} /> Login
      </Link>
    )
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <span className="text-xs text-stone-500 max-w-[100px] truncate hidden md:block">
        {email.split('@')[0]}
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-600 border border-stone-200 hover:border-red-200 px-3 py-2 rounded-full transition-all"
      >
        <LogOut size={13} /> Logout
      </button>
    </div>
  )
}
