import { useState, useEffect } from 'react';
import { useArticleById, useCommentsByArticleId, useCreateComment, useZodForm } from '../hooks';
import { getDynamicCommentSchema } from '../schemas';

const ArticleDetail = ({ articleId }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { data: article, isLoading: articleLoading, isError: articleError } = useArticleById(articleId);
  const { data: comments, isLoading: commentsLoading, refetch: fetchComments } = useCommentsByArticleId(articleId);
  const { mutate: createComment } = useCreateComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useZodForm(getDynamicCommentSchema(isAnonymous), {
    defaultValues: {
      content: '',
      name: '',
      email: ''
    }
  });

  // Reset form errors when isAnonymous changes
  useEffect(() => {
    clearErrors();
  }, [isAnonymous, clearErrors]);

  const onSubmitComment = (data) => {
    console.log('onSubmitComment - Form data:', data);
    console.log('onSubmitComment - isAnonymous:', isAnonymous);

    // Validasi data sebelum mengirim
    if (!data.content || data.content.trim() === '') {
      alert('Konten komentar tidak boleh kosong');
      return;
    }

    if (!isAnonymous && !data.name) {
      alert('Nama tidak boleh kosong jika tidak anonim');
      return;
    }

    const commentData = {
      ...data,
      articleId,
      isAnonymous
    };

    console.log('onSubmitComment - Final data to be sent:', commentData);

    try {
      // Gunakan hook useCreateComment untuk mengirim komentar
      createComment(commentData, {
        onSuccess: (data) => {
          console.log('Comment created successfully:', data);
          
          // Reset form menggunakan react-hook-form
          reset({
            content: '',
            name: '',
            email: ''
          });
          setIsAnonymous(false);

          // Tampilkan pesan sukses
          alert('Komentar berhasil dikirim!');
          
          // Refresh comments list
          fetchComments();
        },
        onError: (error) => {
          console.error('Failed to create comment:', error);
          alert('Gagal mengirim komentar: ' + (error.response?.data?.message || error.message));
        }
      });
    } catch (error) {
      console.error('Exception in onSubmitComment:', error);
      alert('Terjadi kesalahan saat mengirim komentar');
    }
  };

  if (articleLoading) {
    return <div>Loading article...</div>;
  }

  if (articleError) {
    return <div>Error loading article</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-10 relative">
        <div className="absolute top-0 left-0 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full -z-10 -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full -z-10 translate-x-1/4 translate-y-1/4 opacity-70"></div>

        <span className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {article?.category?.name || 'Tanpa Kategori'}
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">{article?.title}</span>
        </h2>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-sm mr-3">
              {article?.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{article?.author?.name || 'Anonim'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Penulis</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Publikasi</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{new Date(article?.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-green dark:prose-invert max-w-none mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700 relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-bl-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-tr-3xl -z-10"></div>

        <div className="relative z-10">
          {article?.content.split('\n').map((paragraph, index) => (
            paragraph ?
              <p key={index} className="mb-5 text-gray-800 dark:text-gray-200 leading-relaxed text-lg first-letter:text-3xl first-letter:font-bold first-letter:text-green-600 dark:first-letter:text-green-400 first-letter:mr-1 first-letter:float-left first:mt-0">
                {paragraph}
              </p>
              : <br key={index} />
          ))}
        </div>
      </div>

      {article?.tags?.length > 0 && (
        <div className="mt-8 mb-10">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tags</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag.id} className="bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/40 px-4 py-1.5 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200 border border-gray-200 dark:border-gray-600 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-8">
        <div className="flex items-center mb-8">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <h3 className="text-2xl font-bold mx-4 text-green-700 dark:text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Komentar ({comments?.length || 0})
          </h3>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmitComment)} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-10 border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Tinggalkan Komentar
          </h4>
          <div className="relative mb-6">
            <textarea
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white min-h-[150px] pl-12"
              placeholder="Tulis komentar Anda di sini..."
              {...register('content')}
            />
            <div className="absolute top-4 left-4 text-green-500 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex items-center mb-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <input
              type="checkbox"
              id="anonymous"
              className="mr-3 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Kirim sebagai anonim
            </label>
          </div>

          {!isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Nama"
                  {...register('name')}
                />
                <div className="absolute top-3 left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Email (opsional)"
                  {...register('email')}
                />
                <div className="absolute top-3 left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
          >
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Kirim Komentar
            </>
          </button>
        </form>

        <div className="space-y-6">
          {commentsLoading ? (
            <div className="text-center py-8 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
            </div>
          ) : comments?.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {comment.isAnonymous ? 'A' : (comment.name ? comment.name.charAt(0).toUpperCase() : 'U')}
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 ml-3">
                      {comment.isAnonymous ? 'Anonim' : comment.name}
                    </h5>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="pl-13 ml-10 border-l-2 border-green-100 dark:border-green-900">
                  <p className="text-gray-700 dark:text-gray-300 py-2 px-3">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada komentar. Jadilah yang pertama!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;