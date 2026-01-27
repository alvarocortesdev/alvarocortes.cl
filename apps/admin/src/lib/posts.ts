import { supabase } from './supabase'
import type { Tables, TablesInsert, TablesUpdate } from '@alvarocortes/shared'

export type Post = Tables<'posts'>
export type PostInsert = TablesInsert<'posts'>
export type PostUpdate = TablesUpdate<'posts'>

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getPost(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createPost(post: PostInsert) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(id: string, updates: PostUpdate) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function publishPost(id: string) {
  return updatePost(id, {
    status: 'published',
    published_at: new Date().toISOString(),
  })
}

export async function unpublishPost(id: string) {
  return updatePost(id, {
    status: 'draft',
    published_at: null,
    publish_at: null,
  })
}

export async function schedulePost(id: string, publishAt: string) {
  return updatePost(id, {
    status: 'scheduled',
    publish_at: publishAt,
    published_at: null,
  })
}

export async function unschedulePost(id: string) {
  return updatePost(id, {
    status: 'draft',
    publish_at: null,
  })
}

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Available categories (hardcoded for now, could be from DB later)
export const CATEGORIES = [
  'Development',
  'Design',
  'DevOps',
  'Career',
  'Tutorial',
  'Opinion',
]
