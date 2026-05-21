import Link from 'next/link'
import { MapPin, Phone, ShieldCheck, Leaf, Bird, Bike } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Hosts',
    body: 'Every host is personally verified. Solo female travelers get an explicit safety badge.',
  },
  {
    icon: Phone,
    title: 'Call Directly',
    body: 'No middleman. You get the host\'s number after reading the community code of conduct.',
  },
  {
    icon: Leaf,
    title: 'Zero Platform Fees',
    body: 'We do not charge booking fees — ever. Your money goes straight to the host family.',
  },
]

const categories = [
  { icon: Bird, label: 'Bird Watching', slug: 'birding', color: 'bg-teal-50 text-teal-700' },
  { icon: Bike, label: 'Solo Rider Friendly', slug: 'solo-rider', color: 'bg-amber-50 text-amber-700' },
  { icon: ShieldCheck, label: 'Solo Female Safe', slug: 'solo-female', color: 'bg-rose-50 text-rose-700' },
  { icon: Leaf, label: 'Agriculture Immersion', slug: 'agri', color: 'bg-green-50 text-green-700' },
]

const steps = [
  { n: '01', title: 'Find your stay', body: 'Filter by district and niche — birding, farming, solo riding. Pin your stay on the map.' },
  { n: '02', title: 'Read the code of conduct', body: 'Accept the community values before host contact details are revealed.' },
  { n: '03', title: 'Call the host directly', body: 'Speak to the family. Agree on dates, meals, and expectations. Zero platform in the middle.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <MapPin size={12} /> Konkan Coast · Ratnagiri · Sindhudurg · Raigad
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
              Authentic Konkan Stays,<br />
              <span className="text-brand-600">Direct Host Connection</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-lg">
              Discover genuine homestays run by local families — bird watchers, solo riders,
              solo female travelers, and rural culture seekers welcome.
              No booking engine. No fees. Just real hospitality.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <MapPin size={16} /> Explore Stays
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {categories.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className={`${color} rounded-2xl p-6 flex flex-col gap-3`}
              >
                <Icon size={24} />
                <span className="font-semibold text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">How it works</h2>
        <p className="text-stone-500 mb-12">Three steps to a genuine Konkan experience.</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="flex flex-col gap-4">
              <span className="text-4xl font-black text-stone-100">{n}</span>
              <h3 className="text-base font-semibold text-stone-900 -mt-4">{title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-12">Why JALAD</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <h3 className="font-semibold text-stone-900">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Ready to explore?</h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Browse verified homestays on an interactive map. Filter by your niche and call the host directly.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          <MapPin size={16} /> Browse the Map
        </Link>
      </section>
    </>
  )
}