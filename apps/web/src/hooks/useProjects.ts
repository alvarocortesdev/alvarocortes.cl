import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Project {
  id: string
  name: string
  description: string
  details: string
  tech_stack: string[]
  live_url: string | null
  repo_url: string | null
  image_url: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      return data as Project[]
    },
  })
}
