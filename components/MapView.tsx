'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import type { HomestayWithCategories } from '@/types/blocks.types'
import { ShieldCheck } from 'lucide-react'

// Custom teal dot marker — avoids the webpack/PNG icon path issue
const dotIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:14px;height:14px;
    background:#0d9488;
    border-radius:50%;
    border:2px solid white;
    box-shadow:0 1px 4px rgba(0,0,0,0.25)
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const KONKAN_CENTER: [number, number] = [16.8, 73.5]

interface Props {
  homestays: HomestayWithCategories[]
}

export default function MapView({ homestays }: Props) {
  return (
    <MapContainer
      center={KONKAN_CENTER}
      zoom={9}
      className="w-full h-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {homestays.map((h) => (
        <Marker key={h.id} position={[h.latitude, h.longitude]} icon={dotIcon}>
          <Popup className="jalad-popup">
            <div className="min-w-[180px]">
              <div className="flex items-start gap-1.5 mb-1">
                <span className="font-semibold text-sm text-stone-900 leading-tight">{h.title}</span>
                {h.is_verified && (
                  <ShieldCheck size={13} className="text-brand-600 shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-xs text-stone-500 mb-2">
                {h.village_name}, {h.location_district}
              </p>
              <Link
                href={`/homestays/${h.slug}`}
                className="inline-block text-xs font-medium text-brand-600 hover:text-brand-800"
              >
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}