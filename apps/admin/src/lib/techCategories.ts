import { supabase } from './supabase'
import type { Tables, TablesInsert, TablesUpdate } from '@alvarocortes/shared'

export type TechCategory = Tables<'tech_categories'>
export type TechCategoryInsert = TablesInsert<'tech_categories'>
export type TechCategoryUpdate = TablesUpdate<'tech_categories'>

export async function getTechCategories() {
  const { data, error } = await supabase
    .from('tech_categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getTechCategory(id: string) {
  const { data, error } = await supabase
    .from('tech_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createTechCategory(category: TechCategoryInsert) {
  const { data, error } = await supabase
    .from('tech_categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTechCategory(id: string, updates: TechCategoryUpdate) {
  const { data, error } = await supabase
    .from('tech_categories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTechCategory(id: string) {
  const { error } = await supabase
    .from('tech_categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function updateTechCategoryOrders(
  categories: Array<{ id: string; display_order: number }>
) {
  const updates = categories.map(({ id, display_order }) =>
    supabase
      .from('tech_categories')
      .update({ display_order, updated_at: new Date().toISOString() })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const hasError = results.some(r => r.error)
  if (hasError) throw new Error('Failed to reorder categories')
}
