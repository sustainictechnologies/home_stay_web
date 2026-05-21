import type { Metadata } from 'next'
import { Leaf, ShieldCheck, Phone, MapPin, Heart, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us · JALAD Homestays',
  description: 'Learn about JALAD Homestays — a community platform connecting travelers directly with verified local families across the Konkan coast.',
}

const values = [
  {
    icon: Phone,
    title: 'No Middleman',
    body: 'We connect you directly with host families. No booking engine, no commission, no chatbot. Just a real phone call.',
  },
  {
    icon: Leaf,
    title: 'Zero Fees — Always',
    body: 'JALAD does not charge travelers or hosts a booking fee. Every rupee you pay goes directly to the family hosting you.',
  },
  {
    icon: ShieldCheck,
    title: 'Personally Verified',
    body: 'Every host on JALAD is personally visited and verified. Solo female travelers get an explicit safety badge backed by real checks.',
  },
  {
    icon: Heart,
    title: 'Community First',
    body: 'Guests read and accept a community code of conduct before receiving host contact details. Respect is non-negotiable.',
  },
  {
    icon: Users,
    title: 'Local Livelihoods',
    body: 'Tourism income staying within the village — not flowing to an OTA headquartered elsewhere — is the whole point of this platform.',
  },
  {
    icon: MapPin,
    title: 'Rooted in Konkan',
    body: 'We focus exclusively on Ratnagiri, Sindhudurg, and Raigad — the three districts of the Konkan coast we know and love.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <MapPin size={12} /> Konkan Coast · Ratnagiri · Sindhudurg · Raigad
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            We believe travel should<br />
            <span className="text-brand-600">benefit the people it touches.</span>
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto">
            JALAD Homestays is a community-first directory of verified rural stays along India's Konkan coast.
            We exist to give conscious travelers a direct line to local families — and to keep tourism money
            inside the villages that make Konkan worth visiting.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">Our Story</h2>
        <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4">
          <p>
            JALAD started from a simple frustration: every time we tried to find a genuine Konkan homestay,
            we ended up on a platform that showed hotel-style rooms, charged a 15–20% service fee, and had
            no way to speak to the actual host before booking.
          </p>
          <p>
            The families running the best stays — the ones with hornbill sightings at dawn, wood-fire cooking,
            and three generations under one roof — were either invisible online or buried under algorithm-optimised
            competitors who had nothing to do with the Konkan.
          </p>
          <p>
            So we built JALAD: a lean directory where every listing is personally verified, contact details are
            shared directly (after a community code of conduct), and the platform takes nothing from the transaction.
            The name comes from the Marathi word for a type of swift water — fast, clean, and local.
          </p>
          <p>
            JALAD is operated by <strong>Sustainic Technologies</strong>, a small team based in Maharashtra
            committed to building tools that keep value inside local communities.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">What we stand for</h2>
          <p className="text-stone-500 mb-12">Six principles that shape every decision we make.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
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

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Get in touch</h2>
        <p className="text-stone-500 mb-2">
          Want to list your homestay, report an issue, or just say hello?
        </p>
        <a
          href="mailto:sustainic.technologies@gmail.com"
          className="text-brand-600 hover:text-brand-800 font-medium transition-colors"
        >
          sustainic.technologies@gmail.com
        </a>
      </section>
    </>
  )
}
