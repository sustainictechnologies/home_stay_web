-- ============================================================
-- JALAD Homestays · Extended Categories
-- Run in Supabase SQL Editor after schema.sql
-- ============================================================

INSERT INTO public.categories (name, slug, icon, description) VALUES
  -- Nature & Adventure
  ('Bird Watching',             'bird-watching',        'Bird',       'Spot endemic Konkan avifauna'),
  ('Waterfalls Nearby',         'waterfalls-nearby',    'Droplets',   'Seasonal waterfalls within easy reach'),
  ('Forest Stay',               'forest-stay',          'Trees',      'Stay inside or on the edge of forest land'),
  ('River Side',                'river-side',           'Waves',      'Homestay on a riverbank'),
  ('Beach Side',                'beach-side',           'Umbrella',   'Walking distance to the beach'),
  ('Mountain View',             'mountain-view',        'Mountain',   'Clear views of the Sahyadri or coastal hills'),
  ('Sunrise Point',             'sunrise-point',        'Sunrise',    'Great spot to watch sunrise'),
  ('Sunset Point',              'sunset-point',         'Sunset',     'Unobstructed sunset views'),
  ('Farm Stay',                 'farm-stay',            'Sprout',     'Working farm open to guests'),
  ('Mango Orchard',             'mango-orchard',        'Leaf',       'Alphonso or Ratnagiri mango orchards'),
  ('Cashew Farm',               'cashew-farm',          'Nut',        'Cashew harvest season experience'),
  ('Fishing Village Experience','fishing-village',      'Fish',       'Coastal fishing community stay'),

  -- Cultural Experience
  ('Konkani Food',              'konkani-food',         'UtensilsCrossed', 'Authentic Konkani home cooking'),
  ('Malvani Food',              'malvani-food',         'ChefHat',    'Traditional Malvani cuisine'),
  ('Local Festivals',           'local-festivals',      'Sparkles',   'Host during local festivals and fairs'),
  ('Folk Culture',              'folk-culture',         'Music',      'Exposure to Konkan folk traditions'),
  ('Traditional House',         'traditional-house',    'Home',       'Stay in a heritage or wada-style house'),
  ('Village Lifestyle',         'village-lifestyle',    'MapPin',     'Immersive rural village experience'),
  ('Farming Activities',        'farming-activities',   'Tractor',    'Participate in seasonal farm work'),
  ('Temple Trails',             'temple-trails',        'Landmark',   'Nearby ancient temples and pilgrimage routes'),

  -- Travel Style
  ('Solo Friendly',             'solo-friendly',        'User',       'Comfortable for solo travellers'),
  ('Solo Female Friendly',      'solo-female-friendly', 'ShieldCheck','Safe and verified for solo women'),
  ('Family Friendly',           'family-friendly',      'Users',      'Suitable for families with children'),
  ('Rider Friendly',            'rider-friendly',       'Bike',       'Motorcycle parking and rider facilities'),
  ('Backpacker Friendly',       'backpacker-friendly',  'Backpack',   'Budget stays with basic amenities'),
  ('Group Stay',                'group-stay',           'UsersRound', 'Can accommodate groups of 6 or more'),
  ('Couple Friendly',           'couple-friendly',      'Heart',      'Private and comfortable for couples')

ON CONFLICT (slug) DO NOTHING;
