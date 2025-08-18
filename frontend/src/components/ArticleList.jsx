import { useState } from 'react';
import { useArticles, useCategories } from '../hooks';

const ArticleList = ({ onSelectArticle }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [categoryId, setCategoryId] = useState('');
  const [search, setSearch] = useState('');
  
  const { data: articlesData, isLoading, isError, error } = useArticles({
    page,
    limit,
    categoryId: categoryId || undefined,
    search: search || undefined,
  });
  
  const { data: categories } = useCategories();
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setPage(1); // Reset ke halaman pertama saat filter berubah
  };
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset ke halaman pertama saat search
  };
  
  if (isLoading) {
    return <div>Loading articles...</div>;
  }
  
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className="article-list">
      <h2>Daftar Artikel</h2>
      
      <div className="filters">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit">Cari</button>
        </form>
        
        <select value={categoryId} onChange={handleCategoryChange}>
          <option value="">Semua Kategori</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {articlesData?.data.length === 0 ? (
        <p>Tidak ada artikel yang ditemukan.</p>
      ) : (
        <>
          <div className="articles">
            {articlesData?.data.map((article) => (
              <div 
                key={article.id} 
                className="article-card" 
                onClick={() => onSelectArticle && onSelectArticle(article.id)}
              >
                <h3>{article.title}</h3>
                <p>{article.content ? article.content.substring(0, 150) + '...' : 'Tidak ada konten'}</p>
                <div className="article-meta">
                  <span>Kategori: {article.category?.name}</span>
                  <span>Penulis: {article.author?.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Sebelumnya
            </button>
            
            <span>Halaman {page} dari {articlesData?.pagination.totalPages}</span>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= articlesData?.pagination.totalPages}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleList;