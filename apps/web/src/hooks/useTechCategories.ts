import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Technology {
  id: string
  name: string
  icon: string
  category_id: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface TechCategory {
  id: string
  name: string
  display_order: number
  created_at: string
  updated_at: string
  technologies: Technology[]
}

export function useTechCategories() {
  return useQuery({
    queryKey: ['techCategories'],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from('tech_categories')
        .select('*')
        .order('display_order', { ascending: true })

      if (catError) throw catError

      const { data: technologies, error: techError } = await supabase
        .from('technologies')
        .select('*')
        .order('display_order', { ascending: true })

      if (techError) throw techError

      return categories.map(cat => ({
        ...cat,
        technologies: technologies.filter(tech => tech.category_id === cat.id)
      })) as TechCategory[]
    },
  })
}
