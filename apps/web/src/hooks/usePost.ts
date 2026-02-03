import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Post } from './usePosts'

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) throw error
      return data as Post
    },
    enabled: !!slug,
  })
}
