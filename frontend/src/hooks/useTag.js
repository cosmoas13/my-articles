import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TagService } from '../services';

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => TagService.getAllTags(),
    staleTime: 10 * 60 * 1000, // 10 menit, karena tag jarang berubah
  });
};

export const useTagById = (id) => {
  return useQuery({
    queryKey: ['tag', id],
    queryFn: () => TagService.getTagById(id),
    enabled: !!id, // Hanya jalankan jika id tersedia
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (tagData) => TagService.createTag(tagData),
    onSuccess: () => {
      // Invalidate dan refetch tags setelah membuat tag baru
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export const useCreateTags = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (tags) => TagService.createTags(tags),
    onSuccess: () => {
      // Invalidate dan refetch tags setelah membuat tag baru
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => TagService.deleteTag(id),
    onSuccess: () => {
      // Invalidate dan refetch tags setelah menghapus tag
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};