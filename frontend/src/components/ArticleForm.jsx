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
    formState: { errors },
    reset,
    setValue,
    watch
  } = useZodForm(articleSchema);
  
  const isPublished = watch('isPublished');
  
  // Mengisi form dengan data artikel jika dalam mode edit
  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
      setValue('categoryId', article.categoryId);
      setValue('isPublished', article.isPublished);
      
      if (article.tags) {
        setSelectedTags(article.tags.map(tag => ({ id: tag.id, name: tag.name })));
      }
    }
  }, [article, setValue]);
  
  const onSubmit = (data) => {
    const articleData = {
      ...data,
      tags: selectedTags.map(tag => tag.id)
    };
    
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
    <div className="article-form">
      <h2>{isEditing ? 'Edit Artikel' : 'Buat Artikel Baru'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Judul</label>
          <input
            id="title"
            type="text"
            {...register('title')}
            disabled={isPending}
          />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="categoryId">Kategori</label>
          <select
            id="categoryId"
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
          {errors.categoryId && <span className="error">{errors.categoryId.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Konten</label>
          <textarea
            id="content"
            rows="10"
            {...register('content')}
            disabled={isPending}
          />
          {errors.content && <span className="error">{errors.content.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Tags</label>
          <div className="tag-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Tambahkan tag..."
              disabled={isPending}
            />
            <button 
              type="button" 
              onClick={handleAddTag}
              disabled={isPending || !newTag.trim()}
            >
              Tambah
            </button>
          </div>
          
          <div className="selected-tags">
            {selectedTags.map((tag) => (
              <span key={tag.id} className={`tag ${tag.isNew ? 'new-tag' : ''}`}>
                {tag.name}
                <button 
                  type="button" 
                  onClick={() => handleRemoveTag(tag.id)}
                  disabled={isPending}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="isPublished"
            {...register('isPublished')}
            disabled={isPending}
          />
          <label htmlFor="isPublished">Publikasikan artikel</label>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isPending}
            className="primary"
          >
            {isPending
              ? (isEditing ? 'Menyimpan...' : 'Membuat...')
              : (isEditing ? 'Simpan Perubahan' : 'Buat Artikel')}
          </button>
          
          {isPublished && (
            <p className="publish-note">
              Artikel ini akan langsung dipublikasikan dan dapat dilihat oleh publik.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;