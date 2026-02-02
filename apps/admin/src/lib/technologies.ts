import { supabase } from './supabase'
import type { Tables, TablesInsert, TablesUpdate } from '@alvarocortes/shared'

export type Technology = Tables<'technologies'>
export type TechnologyInsert = TablesInsert<'technologies'>
export type TechnologyUpdate = TablesUpdate<'technologies'>

export async function getTechnologies() {
  const { data, error } = await supabase
    .from('technologies')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getTechnologiesByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('technologies')
    .select('*')
    .eq('category_id', categoryId)
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getTechnology(id: string) {
  const { data, error } = await supabase
    .from('technologies')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createTechnology(tech: TechnologyInsert) {
  const { data, error } = await supabase
    .from('technologies')
    .insert(tech)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTechnology(id: string, updates: TechnologyUpdate) {
  const { data, error } = await supabase
    .from('technologies')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTechnology(id: string) {
  const { error } = await supabase
    .from('technologies')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function updateTechnologyOrders(
  technologies: Array<{ id: string; display_order: number }>
) {
  const updates = technologies.map(({ id, display_order }) =>
    supabase
      .from('technologies')
      .update({ display_order, updated_at: new Date().toISOString() })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const hasError = results.some(r => r.error)
  if (hasError) throw new Error('Failed to reorder technologies')
}
