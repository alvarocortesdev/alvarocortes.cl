import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface TimelineEntry {
  id: string
  period: string
  title: string
  organization: string
  type: 'work' | 'studies'
  description: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export function useTimelines() {
  return useQuery({
    queryKey: ['timelines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('timeline_entries')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      return data as TimelineEntry[]
    },
  })
}
