-- ============================================================
-- JALAD Homestays · Demo Data
-- Run this in Supabase SQL Editor AFTER running schema.sql
-- ============================================================

-- ── 1. Insert 3 demo homestays ────────────────────────────────

INSERT INTO public.homestays (
  id, title, slug, location_district, village_name,
  host_name, contact_phone, calling_window,
  languages_spoken, youtube_video_id,
  latitude, longitude, is_verified
) VALUES

(
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Hornbill Haven Homestay',
  'hornbill-haven-homestay',
  'Ratnagiri',
  'Khed',
  'Suresh Naik',
  '+91 98201 11111',
  '6:00 AM - 8:00 AM, 5:00 PM - 8:00 PM',
  ARRAY['Marathi', 'Hindi', 'English'],
  'ScMzfABFNM4',
  17.7180,
  73.3960,
  true
),

(
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Alphonso Orchard Stay',
  'alphonso-orchard-stay',
  'Sindhudurg',
  'Malvan',
  'Meena Sawant',
  '+91 98202 22222',
  '7:00 AM - 9:00 AM, 6:00 PM - 8:00 PM',
  ARRAY['Marathi', 'Konkani', 'Hindi'],
  NULL,
  16.0600,
  73.4670,
  true
),

(
  'a1b2c3d4-0003-0003-0003-000000000003',
  'Coastal Rider''s Rest',
  'coastal-riders-rest',
  'Raigad',
  'Alibaug',
  'Anil Patkar',
  '+91 98203 33333',
  '5:00 PM - 9:00 PM',
  ARRAY['Marathi', 'Hindi', 'English'],
  NULL,
  18.6414,
  72.8722,
  true
)

ON CONFLICT (slug) DO NOTHING;


-- ── 2. Link categories ────────────────────────────────────────
-- Category IDs from seed: 1=birding, 2=solo-rider, 3=solo-female, 4=agri, 5=long-stay

INSERT INTO public.homestay_categories (homestay_id, category_id) VALUES
  -- Hornbill Haven: birding + long-stay
  ('a1b2c3d4-0001-0001-0001-000000000001', 1),
  ('a1b2c3d4-0001-0001-0001-000000000001', 5),

  -- Alphonso Orchard: agri + solo-female + long-stay
  ('a1b2c3d4-0002-0002-0002-000000000002', 4),
  ('a1b2c3d4-0002-0002-0002-000000000002', 3),
  ('a1b2c3d4-0002-0002-0002-000000000002', 5),

  -- Coastal Rider's Rest: solo-rider + solo-female
  ('a1b2c3d4-0003-0003-0003-000000000003', 2),
  ('a1b2c3d4-0003-0003-0003-000000000003', 3)

ON CONFLICT DO NOTHING;


-- ── 3. Content blocks ─────────────────────────────────────────

INSERT INTO public.homestay_blocks (homestay_id, block_type, sort_order, content_data) VALUES

-- ── Hornbill Haven ──────────────────────────────────────────

('a1b2c3d4-0001-0001-0001-000000000001', 'hero', 1,
  '{
    "cover_image_url": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    "tagline": "Wake up to hornbill calls in the Sahyadri foothills"
  }'::jsonb
),

('a1b2c3d4-0001-0001-0001-000000000001', 'host-story', 2,
  '{
    "host_image_url": "https://i.pravatar.cc/200?img=11",
    "story_title": "About Suresh & the Naik Family",
    "story_text": "I grew up watching the Malabar Pied Hornbills nest in the jackfruit trees behind our house. For fifteen years I have been guiding birders through the Sahyadri trails at dawn. My wife Sunanda cooks traditional Malvani fish curry and sol kadhi from scratch every evening. We have two simple rooms and honest conversation to offer."
  }'::jsonb
),

('a1b2c3d4-0001-0001-0001-000000000001', 'birding-log', 3,
  '{
    "highlight_species": [
      "Malabar Pied Hornbill",
      "Indian Pitta",
      "Crested Serpent Eagle",
      "White-rumped Shama",
      "Rufous Woodpecker",
      "Blue-bearded Bee-eater"
    ],
    "best_watching_hours": "5:30 AM – 8:00 AM and 4:30 PM – 6:30 PM",
    "nearby_hotspot_trail": "Khed–Chiplun forest trail (2.4 km), Vashishthi river estuary (6 km)"
  }'::jsonb
),

('a1b2c3d4-0001-0001-0001-000000000001', 'rules-block', 4,
  '{
    "safety_status": "Solo Female Safe",
    "prohibited_items": ["Alcohol on premises", "Loud music after 9 PM", "Plastic bags"],
    "house_policies": [
      "Silent hours: 10 PM – 5 AM",
      "Birding guests get a 5 AM wake-up knock",
      "Inform host of return time if venturing alone",
      "Remove footwear at the entrance"
    ]
  }'::jsonb
),

('a1b2c3d4-0001-0001-0001-000000000001', 'video', 5,
  '{
    "youtube_video_id": "ScMzfABFNM4",
    "caption": "Morning birding walk through the Khed forest trail"
  }'::jsonb
),


-- ── Alphonso Orchard Stay ───────────────────────────────────

('a1b2c3d4-0002-0002-0002-000000000002', 'hero', 1,
  '{
    "cover_image_url": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    "tagline": "Live among Alphonso trees and paddy fields in coastal Sindhudurg"
  }'::jsonb
),

('a1b2c3d4-0002-0002-0002-000000000002', 'host-story', 2,
  '{
    "host_image_url": "https://i.pravatar.cc/200?img=47",
    "story_title": "About Meena & the Sawant Farm",
    "story_text": "Our family has been cultivating Hapus Alphonso mangoes for four generations on this three-acre plot overlooking the Arabian Sea. I started welcoming guests after my daughter left for Pune — the house felt too quiet. Guests help with the orchard during season (March–May) and leave with a crate of mangoes they picked themselves. I cook everything on a wood fire stove."
  }'::jsonb
),

('a1b2c3d4-0002-0002-0002-000000000002', 'rules-block', 3,
  '{
    "safety_status": "Solo Female Safe — Women-only room available",
    "prohibited_items": ["Meat inside the kitchen", "Alcohol on farm premises", "Smoking indoors"],
    "house_policies": [
      "Women-only room has an interior bolt and separate bathroom",
      "Farm work is optional — join if you wish, rest if you prefer",
      "Meals are communal and served at fixed times",
      "Please do not pluck fruit without asking"
    ]
  }'::jsonb
),

('a1b2c3d4-0002-0002-0002-000000000002', 'birding-log', 4,
  '{
    "highlight_species": [
      "Brahminy Kite",
      "White-bellied Sea Eagle",
      "Little Cormorant",
      "Common Kingfisher",
      "Purple Sunbird"
    ],
    "best_watching_hours": "6:00 AM – 8:30 AM near the creek",
    "nearby_hotspot_trail": "Malvan beach estuary (1.8 km), Sindhudurg fort walls (4 km by boat)"
  }'::jsonb
),


-- ── Coastal Rider's Rest ────────────────────────────────────

('a1b2c3d4-0003-0003-0003-000000000003', 'hero', 1,
  '{
    "cover_image_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    "tagline": "Park your bike, rest your legs — the sea is 800 metres away"
  }'::jsonb
),

('a1b2c3d4-0003-0003-0003-000000000003', 'host-story', 2,
  '{
    "host_image_url": "https://i.pravatar.cc/200?img=67",
    "story_title": "About Anil Patkar",
    "story_text": "I rode the entire Konkan coast on my Bullet in 2009 and never really came back. I bought this small house in Alibaug, fixed it up, and now host other riders who are doing the same route. I know every pothole between Panvel and Goa. Ask me anything — tyre shops, fuel stations, shortcuts, the best vada pav on NH 66. I will have your chain lubed and your tank route planned before breakfast."
  }'::jsonb
),

('a1b2c3d4-0003-0003-0003-000000000003', 'rules-block', 3,
  '{
    "safety_status": "Solo Female Safe — verified by two previous female solo riders",
    "prohibited_items": ["No modifications to bikes inside the room", "No leaking fuel containers indoors"],
    "house_policies": [
      "Covered motorcycle parking with CCTV",
      "Basic tools available: pump, spanner set, chain lube",
      "Early checkout (5 AM) available — just inform the night before",
      "Route briefing offered for Konkan coastal highway",
      "Drying rack for riding gear"
    ]
  }'::jsonb
);
