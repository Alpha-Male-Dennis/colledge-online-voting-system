
import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define TableNames type for proper type checking
type TableNames = keyof Database['public']['Tables'];

export function useSupabaseQuery<T = any>(
  key: string[],
  table: TableNames,
  options: {
    select?: string;
    eq?: { column: string; value: any }[];
    order?: { column: string; ascending?: boolean };
    range?: { from: number; to: number };
    single?: boolean;
    enabled?: boolean;
  } = {}
) {
  const {
    select = '*',
    eq = [],
    order,
    range,
    single = false,
    enabled = true,
  } = options;

  return useQuery<T, PostgrestError>({
    queryKey: key,
    queryFn: async () => {
      // Start with a properly typed query builder
      const baseQuery = supabase.from(table);
      
      // Build the query step by step
      let query = baseQuery.select(select);
      
      // Apply equality filters
      for (const filter of eq) {
        const { column, value } = filter;
        if (value !== undefined && value !== null) {
          query = query.eq(column, value);
        }
      }
      
      // Apply ordering
      if (order) {
        query = query.order(order.column, { ascending: order.ascending ?? false });
      }
      
      // Apply range
      if (range) {
        query = query.range(range.from, range.to);
      }
      
      // Execute query with proper handling for single vs multiple results
      const { data, error } = single 
        ? await query.single() 
        : await query;
      
      if (error) {
        throw error;
      }
      
      return data as T;
    },
    enabled,
  });
}
