import { supabase } from './supabase'
import type { Tables, TablesInsert, TablesUpdate } from '@alvarocortes/shared'

export type BlogCategory = Tables<'blog_categories'>
export type BlogCategoryInsert = TablesInsert<'blog_categories'>
export type BlogCategoryUpdate = TablesUpdate<'blog_categories'>

export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getBlogCategory(id: string) {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createBlogCategory(category: BlogCategoryInsert) {
  const { data, error } = await supabase
    .from('blog_categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateBlogCategory(id: string, updates: BlogCategoryUpdate) {
  const { data, error } = await supabase
    .from('blog_categories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteBlogCategory(id: string) {
  const { error } = await supabase
    .from('blog_categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function updateBlogCategoryOrders(
  categories: Array<{ id: string; display_order: number }>
) {
  const updates = categories.map(({ id, display_order }) =>
    supabase
      .from('blog_categories')
      .update({ display_order, updated_at: new Date().toISOString() })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const hasError = results.some(r => r.error)
  if (hasError) throw new Error('Failed to reorder categories')
}

export async function getBlogCategoryPostCount(categoryId: string): Promise<number> {
  const { count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId)

  if (error) throw error
  return count || 0
}
