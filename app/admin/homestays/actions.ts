'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const ALL_CATEGORIES = [
  { slug: 'bird-watching',        name: 'Bird Watching' },
  { slug: 'waterfalls-nearby',    name: 'Waterfalls Nearby' },
  { slug: 'forest-stay',          name: 'Forest Stay' },
  { slug: 'river-side',           name: 'River Side' },
  { slug: 'beach-side',           name: 'Beach Side' },
  { slug: 'mountain-view',        name: 'Mountain View' },
  { slug: 'sunrise-point',        name: 'Sunrise Point' },
  { slug: 'sunset-point',         name: 'Sunset Point' },
  { slug: 'farm-stay',            name: 'Farm Stay' },
  { slug: 'mango-orchard',        name: 'Mango Orchard' },
  { slug: 'cashew-farm',          name: 'Cashew Farm' },
  { slug: 'fishing-village',      name: 'Fishing Village Experience' },
  { slug: 'konkani-food',         name: 'Konkani Food' },
  { slug: 'local-festivals',      name: 'Local Festivals' },
  { slug: 'folk-culture',         name: 'Folk Culture' },
  { slug: 'traditional-house',    name: 'Traditional House' },
  { slug: 'village-lifestyle',    name: 'Village Lifestyle' },
  { slug: 'agri-immersion',       name: 'Agri Immersion' },
  { slug: 'temple-trails',        name: 'Temple Trails' },
  { slug: 'solo-friendly',        name: 'Solo Friendly' },
  { slug: 'solo-female-friendly', name: 'Solo Female Safe' },
  { slug: 'family-friendly',      name: 'Family Friendly' },
  { slug: 'rider-friendly',       name: 'Rider Friendly' },
  { slug: 'backpacker-friendly',  name: 'Backpacker Friendly' },
  { slug: 'group-stay',           name: 'Group Stay' },
  { slug: 'couple-friendly',      name: 'Couple Friendly' },
]

export async function saveCategories(homestayId: string, selectedSlugs: string[]) {
  const supabase = createClient()

  // Ensure selected categories exist in DB with the correct slug values
  if (selectedSlugs.length > 0) {
    const needed = ALL_CATEGORIES.filter(c => selectedSlugs.includes(c.slug))
    if (needed.length > 0) {
      await supabase
        .from('categories')
        .upsert(needed.map(c => ({ name: c.name, slug: c.slug })), { onConflict: 'name' })
      // Ignore upsert errors silently — categories may already exist with correct slugs
    }
  }

  // Clear existing assignments
  const { error: delErr } = await supabase
    .from('homestay_categories')
    .delete()
    .eq('homestay_id', homestayId)

  if (delErr) return { error: `Failed to update: ${delErr.message}` }

  // Nothing selected — clearing is all we needed
  if (selectedSlugs.length === 0) {
    revalidatePath('/admin/homestays')
    revalidatePath('/explore')
    return { success: true, count: 0 }
  }

  // Fetch the IDs we just ensured exist
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .select('id, slug')
    .in('slug', selectedSlugs)

  if (catErr) return { error: `Category lookup failed: ${catErr.message}` }
  if (!cats || cats.length === 0) {
    return { error: 'Categories not found in database. Contact support.' }
  }

  // Insert new assignments
  const { error: insErr } = await supabase
    .from('homestay_categories')
    .insert(cats.map((c: any) => ({ homestay_id: homestayId, category_id: c.id })))

  if (insErr) return { error: `Save failed: ${insErr.message}` }

  revalidatePath('/admin/homestays')
  revalidatePath('/explore')
  return { success: true, count: cats.length }
}
