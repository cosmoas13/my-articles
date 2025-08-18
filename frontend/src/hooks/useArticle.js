import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArticleService } from '../services';

export const useArticles = (options = {}) => {
  return useQuery({
    queryKey: ['articles', options],
    queryFn: () => ArticleService.getArticles(options),
    keepPreviousData: true, // Berguna untuk pagination
  });
};

export const useArticleById = (id) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleService.getArticleById(id),
    enabled: !!id, // Hanya jalankan jika id tersedia
  });
};

export const useArticleBySlug = (slug) => {
  return useQuery({
    queryKey: ['article', 'slug', slug],
    queryFn: () => ArticleService.getArticleBySlug(slug),
    enabled: !!slug, // Hanya jalankan jika slug tersedia
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (articleData) => ArticleService.createArticle(articleData),
    onSuccess: () => {
      // Invalidate dan refetch articles setelah membuat artikel baru
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, articleData }) => ArticleService.updateArticle(id, articleData),
    onSuccess: (data, variables) => {
      // Update cache untuk artikel yang diupdate
      queryClient.invalidateQueries({ queryKey: ['article', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => ArticleService.deleteArticle(id),
    onSuccess: () => {
      // Invalidate dan refetch articles setelah menghapus artikel
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};