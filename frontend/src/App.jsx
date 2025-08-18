import { useState, useEffect } from 'react'
import { LoginForm, ArticleList, ArticleDetail, ArticleForm } from './components'
import { useProfile } from './hooks'
import { Home, PenSquare, User, LogIn, Moon, Sun, ImageIcon, ChevronDown, Facebook, Twitter, Github } from './components/icons'

function App() {
  const [currentView, setCurrentView] = useState('articles')
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [theme, setTheme] = useState('light')
  const { data: userProfile, isSuccess: isLoggedIn } = useProfile()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm />
      case 'articles':
        return <ArticleList onSelectArticle={(id) => {
          setSelectedArticleId(id)
          setCurrentView('article-detail')
        }} />
      case 'article-detail':
        return <ArticleDetail articleId={selectedArticleId} />
      case 'create-article':
        return isLoggedIn ? <ArticleForm /> : <LoginForm />
      case 'edit-article':
        return isLoggedIn ? <ArticleForm article={{ id: selectedArticleId }} /> : <LoginForm />
      default:
        return <LoginForm />
    }
  }

  return (
    <div className={`min-h-screen w-full flex flex-col bg-gray-50 dark:bg-dark text-gray-800 dark:text-gray-100 transition-colors duration-300`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-dark-card shadow-lg px-4 py-3 md:px-6 lg:px-8 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <ImageIcon size={20} className="text-white" />
            </div>
            <h1
              onClick={() => setCurrentView('articles')}
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 cursor-pointer"
            >
              Green Blog
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <nav className="flex gap-2 md:gap-3">
              <button
                onClick={() => setCurrentView('articles')}
                className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
              >
                <Home size={18} className="mr-1.5" />
                Beranda
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setCurrentView('create-article')}
                    className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  >
                    <PenSquare size={18} className="mr-1.5" />
                    Tulis
                  </button>
                  <button className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <User size={18} className="mr-1.5" />
                    {userProfile?.name || 'Profil'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <LogIn size={18} className="mr-1.5" />
                  Login
                </button>
              )}
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-gray-700" />
              ) : (
                <Sun size={18} className="text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:px-6 lg:px-8">
        {currentView === 'articles' && (
          <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 p-10 md:p-16 rounded-2xl mb-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 dark:bg-primary-700/20 rounded-full -translate-y-1/3 translate-x-1/3 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 dark:bg-primary-700/20 rounded-full translate-y-1/3 -translate-x-1/3 opacity-70"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-300 dark:to-primary-500">
                Selamat Datang di Green Blog
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Platform blogging ramah lingkungan untuk berbagi ide, pengetahuan, dan pengalaman Anda tentang gaya hidup berkelanjutan dan pelestarian lingkungan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                onClick={() => isLoggedIn ? setCurrentView('create-article') : setCurrentView('login')}
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
        )}
        {renderContent()}
      </main>

      <footer className="bg-white dark:bg-dark-card shadow-inner py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-3">
                <ImageIcon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">Green Blog</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Platform blogging ramah lingkungan</p>
              </div>
            </div>

            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Green Blog. Dibuat dengan React, React Query, dan React Hook Form</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
