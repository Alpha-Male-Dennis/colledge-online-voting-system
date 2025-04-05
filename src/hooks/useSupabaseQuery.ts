
import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define TableNames type to avoid recursive type references
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
      // Use the type-safe approach to get a query builder
      // This avoids using 'as' casting which can lead to deep type issues
      const query = supabase
        .from(table)
        .select(select);

      // Apply equality filters
      eq.forEach(({ column, value }) => {
        if (value !== undefined && value !== null) {
          query.eq(column, value);
        }
      });

      // Apply ordering
      if (order) {
        query.order(order.column, { ascending: order.ascending ?? false });
      }

      // Apply range
      if (range) {
        query.range(range.from, range.to);
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
