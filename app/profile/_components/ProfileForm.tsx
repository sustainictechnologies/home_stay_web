'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Camera, Check, Loader2, User } from 'lucide-react'

interface Props {
  userId:          string
  email:           string
  initialName:     string
  initialAvatarUrl: string | null
}

export default function ProfileForm({ userId, email, initialName, initialAvatarUrl }: Props) {
  const [name, setName]         = useState(initialName)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const fileRef                 = useRef<HTMLInputElement>(null)
  const router                  = useRouter()

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : email[0].toUpperCase()

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    const supabase = createClient()
    const ext  = file.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setError('Failed to upload photo. Make sure the "avatars" storage bucket exists in Supabase.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    const url = `${data.publicUrl}?t=${Date.now()}`
    setAvatarUrl(url)
    await supabase.from('profiles').update({ avatar_url: url }).eq('id', userId)
    router.refresh()
    setUploading(false)
  }

  async function handleSave() {
    if (!name.trim()) return
    setSaving(true)
    setError(null)
    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ full_name: name.trim() })
      .eq('id', userId)

    if (updateError) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-6">

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-brand-600 flex items-center justify-center overflow-hidden border-4 border-brand-100 relative">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="avatar" fill className="object-cover" sizes="80px" />
            ) : (
              <span className="text-white text-2xl font-bold">{initials}</span>
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-colors"
          >
            {uploading
              ? <Loader2 size={12} className="text-white animate-spin" />
              : <Camera size={12} className="text-white" />
            }
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div>
          <p className="font-bold text-stone-900 text-base">{name || 'Your Name'}</p>
          <p className="text-sm text-stone-400">{email}</p>
          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs text-brand-600 hover:text-brand-800 font-semibold mt-1 transition-colors"
          >
            Change photo
          </button>
        </div>
      </div>

      {/* Full name */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">
          Full Name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-brand-400 transition-colors"
          placeholder="Your full name"
        />
      </div>

      {/* Email (read-only) */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full border border-stone-100 rounded-xl px-4 py-2.5 text-sm text-stone-400 bg-stone-50 cursor-not-allowed"
        />
        <p className="text-[11px] text-stone-300 mt-1">Email cannot be changed</p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{error}</p>
      )}

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving || saved || !name.trim()}
        className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
        {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  )
}
