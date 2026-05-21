'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { HomestayWithCategories } from '@/types/blocks.types'
import FilterBar from './FilterSidebar'
import HomestayCard from './HomestayCard'

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center">
      <span className="text-sm text-stone-400">Loading map…</span>
    </div>
  ),
})

interface Props {
  homestays: HomestayWithCategories[]
  districts: string[]
}

export default function ExploreClient({ homestays, districts }: Props) {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const filtered = useMemo(() => {
    return homestays.filter((h) => {
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(h.location_district)) return false
      if (selectedCategories.length > 0 && !h.categories.some((c) => selectedCategories.includes(c.slug))) return false
      if (verifiedOnly && !h.is_verified) return false
      return true
    })
  }, [homestays, selectedDistricts, selectedCategories, verifiedOnly])

  function clearFilters() {
    setSelectedDistricts([])
    setSelectedCategories([])
    setVerifiedOnly(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Horizontal filter bar */}
      <FilterBar
        districts={districts}
        selectedDistricts={selectedDistricts}
        selectedCategories={selectedCategories}
        verifiedOnly={verifiedOnly}
        onDistrictChange={setSelectedDistricts}
        onCategoryChange={setSelectedCategories}
        onVerifiedChange={setVerifiedOnly}
        resultCount={filtered.length}
        onClear={clearFilters}
      />

      {/* Map + card list */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className="flex-1 relative">
          <MapView homestays={filtered} />
        </div>

        {/* Card list — desktop */}
        <div className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-stone-200 bg-white overflow-y-auto">
          <div className="divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-stone-400">
                No stays match your filters.
              </div>
            ) : (
              filtered.map((h) => <HomestayCard key={h.id} homestay={h} />)
            )}
          </div>
        </div>
      </div>

      {/* Card list — mobile */}
      <div className="lg:hidden h-52 overflow-y-auto border-t border-stone-200 bg-white">
        <div className="divide-y divide-stone-100">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-stone-400">No stays match your filters.</div>
          ) : (
            filtered.map((h) => <HomestayCard key={h.id} homestay={h} />)
          )}
        </div>
      </div>
    </div>
  )
}
