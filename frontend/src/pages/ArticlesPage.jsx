import { ArticleList } from '../components';
import { ChevronDown, PenSquare } from '../components/icons';
import { useNavigate } from 'react-router-dom';

function ArticlesPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

  return (
    <>
      <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 p-10 md:p-16 rounded-2xl mb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 dark:bg-primary-700/20 rounded-full -translate-y-1/3 translate-x-1/3 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 dark:bg-primary-700/20 rounded-full translate-y-1/3 -translate-x-1/3 opacity-70"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-300 dark:to-primary-500">
            Selamat Datang di cosmoas13
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Blog pribadi tempat saya berbagi artikel tentang teknologi dan berbagai hal menarik yang saya pelajari, baik di bidang IT maupun bidang lainnya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => isLoggedIn ? navigate('/articles/create') : navigate('/login')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
            >
              <PenSquare size={18} className="mr-2" />
              {isLoggedIn ? 'Mulai Menulis' : 'Login untuk Menulis'}
            </button>

            <button
              onClick={() => window.scrollTo({ top: document.getElementById('article-list').offsetTop - 100, behavior: 'smooth' })}
              className="bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
            >
              <ChevronDown size={18} className="mr-2" />
              Jelajahi Artikel
            </button>
          </div>
        </div>
      </div>

      <ArticleList
        onSelectArticle={(id) => {
          navigate(`/articles/${id}`);
        }}
      />
    </>
  );
}

export default ArticlesPage;