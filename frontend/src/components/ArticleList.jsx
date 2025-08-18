import { useState, useRef } from 'react';
import { useArticles, useCategories } from '../hooks';

const ArticleList = ({ onSelectArticle }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [categoryId, setCategoryId] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimeout = useRef(null);

  const { data: articlesData, isLoading, isError, error } = useArticles({
    page,
    limit,
    categoryId: categoryId || undefined,
    search: debouncedSearch || undefined,
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
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Only search if input has at least 2 characters
    if (value.length === 0 || value.length >= 2) {
      debounceTimeout.current = setTimeout(() => {
        setDebouncedSearch(value);
        setPage(1); // Reset ke halaman pertama saat search berubah
      }, 500); // 500ms delay
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Jika input memiliki minimal 2 karakter atau kosong, langsung terapkan pencarian
    if (search.length === 0 || search.length >= 2) {
      setDebouncedSearch(search);
      setPage(1); // Reset ke halaman pertama saat search
    }
  };

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Daftar Artikel</h2>

      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full md:w-auto gap-2"
        >
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Cari
          </button>
        </form>

        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Semua Kategori</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {articlesData?.data.length === 0 ? (
        <div className="p-8 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">Tidak ada artikel yang ditemukan.</p>
        </div>
      ) : (
        <>
          <div id="article-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData?.data.map((article) => (
              <div
                key={article.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
                onClick={() => onSelectArticle && onSelectArticle(article.id)}
              >
                <div className="relative">
                  <div className="absolute top-0 right-0 bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-bl-full -z-10"></div>
                  <div className="h-3 bg-gradient-to-r from-green-500 to-green-300 transform origin-left transition-all duration-300 group-hover:scale-x-110"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {article.category?.name || 'Tanpa Kategori'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors mb-3">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
                      {article.content ? article.content.substring(0, 150) + '...' : 'Tidak ada konten'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <span className="font-medium ml-2">
                          {article.author?.name || 'Anonim'}
                        </span>
                      </div>
                      <span className="flex items-center text-green-600 dark:text-green-400 font-medium group-hover:text-green-500 transition-colors">
                        Baca selengkapnya
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'} transition-colors`}
            >
              Sebelumnya
            </button>

            <span className="text-gray-600 dark:text-gray-400">
              Halaman {page} dari {articlesData?.pagination.totalPages || 1}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= articlesData?.pagination.totalPages}
              className={`px-4 py-2 rounded-md ${page >= articlesData?.pagination.totalPages ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'} transition-colors`}
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