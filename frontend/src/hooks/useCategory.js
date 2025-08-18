import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '../services';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAllCategories(),
    staleTime: 10 * 60 * 1000, // 10 menit, karena kategori jarang berubah
  });
};

export const useCategoryById = (id) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => CategoryService.getCategoryById(id),
    enabled: !!id, // Hanya jalankan jika id tersedia
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryData) => CategoryService.createCategory(categoryData),
    onSuccess: () => {
      // Invalidate dan refetch categories setelah membuat kategori baru
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, categoryData }) => CategoryService.updateCategory(id, categoryData),
    onSuccess: (data, variables) => {
      // Update cache untuk kategori yang diupdate
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      // Invalidate dan refetch categories setelah menghapus kategori
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};