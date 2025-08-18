import { registerSchema, loginSchema } from './auth.schema';
import { articleSchema } from './article.schema';
import { categorySchema } from './category.schema';
import { commentSchema, getDynamicCommentSchema } from './comment.schema';

export {
  registerSchema,
  loginSchema,
  articleSchema,
  categorySchema,
  commentSchema,
  getDynamicCommentSchema,
};