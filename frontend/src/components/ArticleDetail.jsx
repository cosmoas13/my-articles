import { useState } from 'react';
import { useArticleById, useCommentsByArticleId, useCreateComment, useZodForm } from '../hooks';
import { commentSchema } from '../schemas';

const ArticleDetail = ({ articleId }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const { data: article, isLoading: articleLoading, isError: articleError } = useArticleById(articleId);
  const { data: comments, isLoading: commentsLoading } = useCommentsByArticleId(articleId);
  const { mutate: createComment, isPending: isSubmitting } = useCreateComment();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useZodForm(commentSchema);
  
  const onSubmitComment = (data) => {
    createComment(
      {
        ...data,
        articleId,
        isAnonymous
      },
      {
        onSuccess: () => {
          reset();
          setIsAnonymous(false);
        }
      }
    );
  };
  
  if (articleLoading) {
    return <div>Loading article...</div>;
  }
  
  if (articleError) {
    return <div>Error loading article</div>;
  }
  
  return (
    <div className="article-detail">
      <div className="article-header">
        <h2>{article?.title}</h2>
        
        <div className="article-meta">
          <span>Kategori: {article?.category?.name}</span>
          <span>Penulis: {article?.author?.name}</span>
          <span>Tanggal: {new Date(article?.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="article-content">
        {article?.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <div className="article-tags">
        {article?.tags?.map((tag) => (
          <span key={tag.id} className="tag">{tag.name}</span>
        ))}
      </div>
      
      <div className="comments-section">
        <h3>Komentar ({comments?.length || 0})</h3>
        
        <form className="comment-form" onSubmit={handleSubmit(onSubmitComment)}>
          <h4>Tinggalkan Komentar</h4>
          <textarea 
            placeholder="Tulis komentar Anda di sini..."
            {...register('content')}
            disabled={isSubmitting}
          />
          {errors.content && <p className="error-message">{errors.content.message}</p>}
          
          <div className="anonymous-checkbox">
            <input 
              type="checkbox" 
              id="anonymous" 
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous">Kirim sebagai anonim</label>
          </div>
          
          {!isAnonymous && (
            <>
              <div className="form-group">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  disabled={isSubmitting}
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email (opsional)</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
            </>
          )}
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </form>
        
        <div className="comment-list">
          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : comments?.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.isAnonymous ? 'Anonim' : comment.user?.name}</span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <div className="comment-content">
                  {comment.content}
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada komentar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;