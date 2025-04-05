
import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseQuery<T = any>(
  key: string[],
  table: string,
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
      let query = supabase.from(table).select(select);

      // Apply equality filters
      eq.forEach(({ column, value }) => {
        if (value !== undefined && value !== null) {
          query = query.eq(column, value);
        }
      });

      // Apply ordering
      if (order) {
        query = query.order(order.column, { ascending: order.ascending ?? false });
      }

      // Apply range
      if (range) {
        query = query.range(range.from, range.to);
      }

      // Execute query
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
