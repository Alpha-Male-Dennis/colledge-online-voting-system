import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type TableNames = keyof Database['public']['Tables'];

type MutationConfig = {
  onSuccess?: (data: any) => void;
  onError?: (error: PostgrestError) => void;
  invalidateQueries?: string[][];
  toastSuccess?: { title: string; description?: string };
  toastError?: { title: string; description?: string };
};

export function useSupabaseInsert(
  table: TableNames,
  config: MutationConfig = {}
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const query = supabase.from(table).insert(data);
      const result = await query.select();
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: (data) => {
      if (config.invalidateQueries) {
        config.invalidateQueries.forEach(query => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (config.toastSuccess) {
        toast({
          title: config.toastSuccess.title,
          description: config.toastSuccess.description,
        });
      }

      if (config.onSuccess) {
        config.onSuccess(data);
      }
    },
    onError: (error: PostgrestError) => {
      if (config.toastError) {
        toast({
          title: config.toastError.title,
          description: config.toastError.description || error.message,
          variant: "destructive",
        });
      }

      if (config.onError) {
        config.onError(error);
      }
    },
  });
}

export function useSupabaseUpdate(
  table: TableNames,
  config: MutationConfig = {}
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const query = supabase.from(table).update(data).eq('id', id);
      const result = await query.select();
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: (data) => {
      if (config.invalidateQueries) {
        config.invalidateQueries.forEach(query => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (config.toastSuccess) {
        toast({
          title: config.toastSuccess.title,
          description: config.toastSuccess.description,
        });
      }

      if (config.onSuccess) {
        config.onSuccess(data);
      }
    },
    onError: (error: PostgrestError) => {
      if (config.toastError) {
        toast({
          title: config.toastError.title,
          description: config.toastError.description || error.message,
          variant: "destructive",
        });
      }

      if (config.onError) {
        config.onError(error);
      }
    },
  });
}

export function useSupabaseDelete(
  table: TableNames,
  config: MutationConfig = {}
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const query = supabase.from(table).delete().eq('id', id);
      const result = await query;
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: (data) => {
      if (config.invalidateQueries) {
        config.invalidateQueries.forEach(query => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (config.toastSuccess) {
        toast({
          title: config.toastSuccess.title,
          description: config.toastSuccess.description,
        });
      }

      if (config.onSuccess) {
        config.onSuccess(data);
      }
    },
    onError: (error: PostgrestError) => {
      if (config.toastError) {
        toast({
          title: config.toastError.title,
          description: config.toastError.description || error.message,
          variant: "destructive",
        });
      }

      if (config.onError) {
        config.onError(error);
      }
    },
  });
}
