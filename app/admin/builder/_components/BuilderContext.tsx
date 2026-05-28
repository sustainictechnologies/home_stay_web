'use client'

import { createContext, useContext } from 'react'

interface BuilderContextValue {
  updateImage: (blockId: string, imageKey: string, url: string | null) => void
  getImage:    (blockId: string, imageKey: string, defaultUrl: string) => string
  updateText:  (blockId: string, textKey: string, value: string | null) => void
  getText:     (blockId: string, textKey: string, defaultValue: string) => string
  previewMode: boolean
}

export const BuilderContext = createContext<BuilderContextValue>({
  updateImage: () => {},
  getImage:    (_b, _k, d) => d,
  updateText:  () => {},
  getText:     (_b, _k, d) => d,
  previewMode: false,
})

export function useBuilder() {
  return useContext(BuilderContext)
}
