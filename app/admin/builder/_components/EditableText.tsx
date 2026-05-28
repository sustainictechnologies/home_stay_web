'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil } from 'lucide-react'
import { useBuilder } from './BuilderContext'

interface Props {
  blockId: string
  textKey: string
  defaultValue: string
  multiline?: boolean
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function EditableText({
  blockId,
  textKey,
  defaultValue,
  multiline = false,
  className = '',
  as: Tag = 'p',
}: Props) {
  const { getText, updateText, previewMode } = useBuilder()
  const value = getText(blockId, textKey, defaultValue)

  const [editing, setEditing]   = useState(false)
  const [draft, setDraft]       = useState(value)
  const [hovered, setHovered]   = useState(false)
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  // Keep draft in sync if value changes externally
  useEffect(() => { if (!editing) setDraft(value) }, [value, editing])

  // Auto-focus when editing starts
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    updateText(blockId, textKey, trimmed === defaultValue ? null : trimmed || null)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  /* ── Preview mode: plain text ─────────────────────────── */
  if (previewMode) {
    return <Tag className={className}>{value}</Tag>
  }

  /* ── Editing: inline input ────────────────────────────── */
  if (editing) {
    const shared = {
      ref: inputRef as any,
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') cancel()
        if (!multiline && e.key === 'Enter') { e.preventDefault(); commit() }
        if (multiline && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) commit()
        e.stopPropagation()
      },
      className: `w-full bg-brand-50 border border-brand-400 rounded-lg px-2 py-1 outline-none resize-none text-inherit font-inherit leading-inherit ${className}`,
      style: { minHeight: multiline ? 72 : undefined },
    }

    return multiline
      ? <textarea {...shared} rows={3} />
      : <input {...shared} type="text" />
  }

  /* ── Default: hoverable text ──────────────────────────── */
  return (
    <Tag
      className={`relative group/txt cursor-text ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={e => { e.stopPropagation(); setEditing(true) }}
      title="Click to edit"
    >
      {value}

      {/* Hover underline + pencil */}
      {hovered && (
        <span className="absolute inset-0 rounded pointer-events-none ring-1 ring-brand-400 ring-offset-1 bg-brand-50/30" />
      )}
      {hovered && (
        <span className="absolute -top-5 right-0 flex items-center gap-1 bg-brand-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md shadow-sm pointer-events-none">
          <Pencil size={8} /> Edit
        </span>
      )}
    </Tag>
  )
}
