// Auth hooks
import { useRegister, useLogin, useLogout, useProfile } from './useAuth';

// Article hooks
import {
  useArticles,
  useArticleById,
  useArticleBySlug,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from './useArticle';

// Category hooks
import {
  useCategories,
  useCategoryById,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from './useCategory';

// Tag hooks
import {
  useTags,
  useTagById,
  useCreateTag,
  useCreateTags,
  useDeleteTag,
} from './useTag';

// Comment hooks
import {
  useCommentsByArticleId,
  useCreateComment,
  useDeleteComment,
} from './useComment';

// Form hooks
import { useZodForm } from './useForm';

export {
  // Auth hooks
  useRegister,
  useLogin,
  useLogout,
  useProfile,
  
  // Article hooks
  useArticles,
  useArticleById,
  useArticleBySlug,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
  
  // Category hooks
  useCategories,
  useCategoryById,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  
  // Tag hooks
  useTags,
  useTagById,
  useCreateTag,
  useCreateTags,
  useDeleteTag,
  
  // Comment hooks
  useCommentsByArticleId,
  useCreateComment,
  useDeleteComment,
  
  // Form hooks
  useZodForm,
};