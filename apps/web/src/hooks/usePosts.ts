import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  status: string
  publish_at: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) throw error
      return data as Post[]
    },
  })
}
