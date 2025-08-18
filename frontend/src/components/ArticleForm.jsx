import { useEffect, useState } from 'react';
import { useZodForm, useCategories, useTags, useCreateArticle, useUpdateArticle } from '../hooks';
import { articleSchema } from '../schemas';

const ArticleForm = ({ article = null }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const { data: categories } = useCategories();
  const { data: tags } = useTags();

  const { mutate: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle();

  const isPending = isCreating || isUpdating;
  const isEditing = !!article;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useZodForm(articleSchema);

  const isPublished = watch('isPublished');

  // Mengisi form dengan data artikel jika dalam mode edit
  useEffect(() => {
    // Set default value untuk isPublished
    setValue('isPublished', false);
    console.log('Default isPublished set to false');

    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
      setValue('categoryId', article.categoryId);
      setValue('isPublished', article.published || false); // Gunakan published dari backend
      console.log('Article isPublished value:', article.published);

      if (article.tags) {
        setSelectedTags(article.tags.map(tag => ({ id: tag.id, name: tag.name })));
      }
    }
  }, [article, setValue]);

  const onSubmit = (data) => {
    console.log('Form data before submit:', data); // Log data sebelum dikirim
    const articleData = {
      ...data,
      tags: selectedTags.map(tag => tag.id),
      isPublished: data.isPublished // Pastikan isPublished dimasukkan
    };

    console.log('Article data to be sent:', articleData); // Log data yang akan dikirim

    if (isEditing) {
      updateArticle({ id: article.id, ...articleData });
    } else {
      createArticle(articleData);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    // Cek apakah tag sudah ada di daftar yang dipilih
    const tagExists = selectedTags.some(tag =>
      tag.name.toLowerCase() === newTag.toLowerCase()
    );

    if (!tagExists) {
      // Cek apakah tag sudah ada di database
      const existingTag = tags?.find(tag =>
        tag.name.toLowerCase() === newTag.toLowerCase()
      );

      if (existingTag) {
        setSelectedTags([...selectedTags, existingTag]);
      } else {
        // Tag baru yang belum ada di database
        setSelectedTags([...selectedTags, { id: `new-${Date.now()}`, name: newTag, isNew: true }]);
      }
    }

    setNewTag('');
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
          {isEditing ? 'Edit Artikel' : 'Buat Artikel Baru'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Judul
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Judul artikel"
              {...register('title')}
              disabled={isPending}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Kategori
            </label>
            <select
              id="categoryId"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              {...register('categoryId')}
              disabled={isPending}
            >
              <option value="">Pilih Kategori</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.categoryId.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Konten
            </label>
            <textarea
              id="content"
              rows="10"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Tulis konten artikel di sini..."
              {...register('content')}
              disabled={isPending}
            />
            {errors.content && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.content.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Tambahkan tag..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={isPending || !newTag.trim()}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tag.isNew
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.id)}
                    disabled={isPending}
                    className="ml-1.5 text-sm hover:text-red-500 focus:outline-none"
                    aria-label="Remove tag"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              {...register('isPublished')}
              onChange={(e) => {
                setValue('isPublished', e.target.checked);
                console.log('Checkbox changed:', e.target.checked);
              }}
              disabled={isPending}
            />
            <label
              htmlFor="isPublished"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Publikasikan artikel
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending || !isValid}
              className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending
                ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Menyimpan...' : 'Membuat...'}
                  </span>
                )
                : (isEditing ? 'Simpan Perubahan' : 'Buat Artikel')}
            </button>

            {isPublished && (
              <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md">
                Artikel ini akan langsung dipublikasikan dan dapat dilihat oleh publik.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;