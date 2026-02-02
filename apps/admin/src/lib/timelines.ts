import { supabase } from './supabase'
import type { Tables, TablesInsert, TablesUpdate } from '@alvarocortes/shared'

export type TimelineEntry = Tables<'timeline_entries'>
export type TimelineEntryInsert = TablesInsert<'timeline_entries'>
export type TimelineEntryUpdate = TablesUpdate<'timeline_entries'>

export async function getTimelineEntries() {
  const { data, error } = await supabase
    .from('timeline_entries')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getTimelineEntry(id: string) {
  const { data, error } = await supabase
    .from('timeline_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createTimelineEntry(entry: TimelineEntryInsert) {
  const { data, error } = await supabase
    .from('timeline_entries')
    .insert(entry)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTimelineEntry(id: string, updates: TimelineEntryUpdate) {
  const { data, error } = await supabase
    .from('timeline_entries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTimelineEntry(id: string) {
  const { error } = await supabase
    .from('timeline_entries')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function updateTimelineEntryOrders(
  entries: Array<{ id: string; display_order: number }>
) {
  const updates = entries.map(({ id, display_order }) =>
    supabase
      .from('timeline_entries')
      .update({ display_order, updated_at: new Date().toISOString() })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const hasError = results.some(r => r.error)
  if (hasError) throw new Error('Failed to reorder timeline entries')
}
