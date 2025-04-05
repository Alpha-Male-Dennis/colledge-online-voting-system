
import { useQuery } from '@tanstack/react-query';
import { PostgrestError, PostgrestFilterBuilder, PostgrestSingleResponse } from '@supabase/supabase-js';
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
      // Initial query setup
      let queryBuilder = supabase.from(table).select(select);
      
      // Apply filters
      eq.forEach(filter => {
        const { column, value } = filter;
        if (value !== undefined && value !== null) {
          // Type assertion to avoid deep recursion
          queryBuilder = queryBuilder.eq(column, value) as any;
        }
      });
      
      // Apply ordering
      if (order) {
        queryBuilder = queryBuilder.order(order.column, { 
          ascending: order.ascending ?? false 
        }) as any;
      }
      
      // Apply range
      if (range) {
        queryBuilder = queryBuilder.range(range.from, range.to) as any;
      }
      
      // Execute query
      let response: PostgrestSingleResponse<T>;
      
      if (single) {
        response = await queryBuilder.single();
      } else {
        response = await queryBuilder;
      }
      
      if (response.error) {
        throw response.error;
      }
      
      return response.data as T;
    },
    enabled,
  });
}
