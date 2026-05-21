-- ============================================================
-- JALAD Homestays · Demo Data #2 (two additional stays)
-- Run this AFTER schema.sql and demo_data.sql
-- ============================================================

-- ── 1. Insert 2 homestays ─────────────────────────────────────

INSERT INTO public.homestays (
  id, title, slug, location_district, village_name,
  host_name, contact_phone, calling_window,
  languages_spoken, youtube_video_id,
  latitude, longitude, is_verified
) VALUES

(
  'a1b2c3d4-0004-0004-0004-000000000004',
  'Paddy Field Farmhouse',
  'paddy-field-farmhouse',
  'Raigad',
  'Roha',
  'Vasant Bhosale',
  '+91 98204 44444',
  '6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM',
  ARRAY['Marathi', 'Hindi'],
  NULL,
  18.4390,
  73.1180,
  true
),

(
  'a1b2c3d4-0005-0005-0005-000000000005',
  'Coconut Shore Homestay',
  'coconut-shore-homestay',
  'Sindhudurg',
  'Vengurla',
  'Laxmi Dessai',
  '+91 98205 55555',
  '7:00 AM - 9:00 AM, 6:00 PM - 9:00 PM',
  ARRAY['Konkani', 'Marathi', 'Hindi', 'English'],
  NULL,
  15.8620,
  73.6340,
  true
)

ON CONFLICT (slug) DO NOTHING;


-- ── 2. Link categories ────────────────────────────────────────
-- 1=birding, 2=solo-rider, 3=solo-female, 4=agri, 5=long-stay

INSERT INTO public.homestay_categories (homestay_id, category_id) VALUES
  -- Paddy Field Farmhouse: agri + long-stay + birding
  ('a1b2c3d4-0004-0004-0004-000000000004', 4),
  ('a1b2c3d4-0004-0004-0004-000000000004', 5),
  ('a1b2c3d4-0004-0004-0004-000000000004', 1),

  -- Coconut Shore: solo-female + solo-rider + agri
  ('a1b2c3d4-0005-0005-0005-000000000005', 3),
  ('a1b2c3d4-0005-0005-0005-000000000005', 2),
  ('a1b2c3d4-0005-0005-0005-000000000005', 4)

ON CONFLICT DO NOTHING;


-- ── 3. Content blocks ─────────────────────────────────────────

INSERT INTO public.homestay_blocks (homestay_id, block_type, sort_order, content_data) VALUES

-- ── Paddy Field Farmhouse ───────────────────────────────────

('a1b2c3d4-0004-0004-0004-000000000004', 'hero', 1,
  '{
    "cover_image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    "tagline": "Sleep to the sound of frogs in the paddy — wake up to mist on the Western Ghats"
  }'::jsonb
),

('a1b2c3d4-0004-0004-0004-000000000004', 'host-story', 2,
  '{
    "host_image_url": "https://i.pravatar.cc/200?img=53",
    "story_title": "About Vasant & the Bhosale Farm",
    "story_text": "My grandfather built this house at the edge of our paddy fields in 1962. We grow indigenous Ambemohar rice — a short-grain variety that smells of raw mango when it cooks. I started hosting travellers five years ago after a trekking group camped on my land and asked if they could come back the next year. Now I have guests who return every monsoon to help with transplanting. My mother still makes the best Varan Bhaat in the village."
  }'::jsonb
),

('a1b2c3d4-0004-0004-0004-000000000004', 'birding-log', 3,
  '{
    "highlight_species": [
      "Purple Moorhen",
      "Pheasant-tailed Jacana",
      "Black-winged Stilt",
      "Painted Stork",
      "Indian Pond Heron",
      "Oriental Darter"
    ],
    "best_watching_hours": "6:00 AM – 9:00 AM at the paddy field edges and irrigation canal",
    "nearby_hotspot_trail": "Roha wetlands walk (1.2 km from house), Kundalika river estuary (8 km)"
  }'::jsonb
),

('a1b2c3d4-0004-0004-0004-000000000004', 'rules-block', 4,
  '{
    "safety_status": "Safe for all travellers — family compound, always someone home",
    "prohibited_items": ["Alcohol", "Non-veg food brought from outside", "Plastic packaging"],
    "house_policies": [
      "Farm participation is welcome during transplanting (June–July) and harvest (Nov–Dec)",
      "Meals are served at 7 AM, 1 PM and 8 PM — please be on time",
      "Well water is available; carry a refillable bottle",
      "Guests are welcome in the kitchen to learn cooking",
      "Quiet hours after 10 PM"
    ]
  }'::jsonb
),


-- ── Coconut Shore Homestay ──────────────────────────────────

('a1b2c3d4-0005-0005-0005-000000000005', 'hero', 1,
  '{
    "cover_image_url": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",
    "tagline": "Hammock under coconut palms, 400 metres from the quietest beach in Sindhudurg"
  }'::jsonb
),

('a1b2c3d4-0005-0005-0005-000000000005', 'host-story', 2,
  '{
    "host_image_url": "https://i.pravatar.cc/200?img=44",
    "story_title": "About Laxmi Dessai",
    "story_text": "I am a former schoolteacher who retired early to run this homestay full time. My house sits inside a one-acre coconut grove that my husband planted thirty years ago. Vengurla is the least-crowded beach town in Sindhudurg — no shacks, no loud music, just the sea. I cater especially to solo women travellers and small groups of women friends. My rule is simple: you are a guest in my home, not a customer in a hotel. We eat together, talk, and watch the sunset from the veranda."
  }'::jsonb
),

('a1b2c3d4-0005-0005-0005-000000000005', 'birding-log', 3,
  '{
    "highlight_species": [
      "White-bellied Sea Eagle",
      "Brahminy Kite",
      "Lesser Frigatebird",
      "Little Tern",
      "Great Thick-knee",
      "Indian Reef Heron"
    ],
    "best_watching_hours": "6:30 AM – 9:00 AM on the beach and rocky outcrops",
    "nearby_hotspot_trail": "Vengurla rocks (2 km by boat), Mochemad beach trail (1.5 km walk)"
  }'::jsonb
),

('a1b2c3d4-0005-0005-0005-000000000005', 'rules-block', 4,
  '{
    "safety_status": "Solo Female Safe — women-only house, no male guests accepted",
    "prohibited_items": ["Male guests or visitors after 8 PM", "Alcohol inside the grove", "Smoking indoors"],
    "house_policies": [
      "Women and families only — solo male bookings not accepted",
      "Gate is locked at 10 PM; inform host if returning late",
      "Coconut grove hammock available from 6 AM to 9 PM",
      "Beach towels and snorkelling masks available on request",
      "Host can arrange a local woman guide for Vengurla market walk"
    ]
  }'::jsonb
);
