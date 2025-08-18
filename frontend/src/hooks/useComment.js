import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentService } from '../services';

export const useCommentsByArticleId = (articleId) => {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => CommentService.getCommentsByArticleId(articleId),
    enabled: !!articleId, // Hanya jalankan jika articleId tersedia
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentData) => {
      console.log('useCreateComment - Mutation called with:', commentData);
      return CommentService.createComment(commentData);
    },
    onSuccess: (data, variables) => {
      console.log('useCreateComment - Mutation succeeded:', data);
      // Invalidate dan refetch comments untuk artikel yang dikomentari
      queryClient.invalidateQueries({ queryKey: ['comments', data.articleId] });
      // Juga invalidate artikel detail karena mungkin menampilkan jumlah komentar
      queryClient.invalidateQueries({ queryKey: ['article', data.articleId] });
    },
    onError: (error, variables) => {
      console.error('useCreateComment - Mutation failed:', error);
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, articleId }) => {
      return CommentService.deleteComment(id).then(response => {
        // Return articleId untuk digunakan di onSuccess
        return { ...response, articleId };
      });
    },
    onSuccess: (data) => {
      // Invalidate dan refetch comments untuk artikel yang komentarnya dihapus
      queryClient.invalidateQueries({ queryKey: ['comments', data.articleId] });
      // Juga invalidate artikel detail karena mungkin menampilkan jumlah komentar
      queryClient.invalidateQueries({ queryKey: ['article', data.articleId] });
    },
  });
};