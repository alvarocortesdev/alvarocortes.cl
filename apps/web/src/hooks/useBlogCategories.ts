import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface BlogCategory {
  id: string
  name: string
  name_en: string | null
  display_order: number
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      return data as BlogCategory[]
    },
  })
}
