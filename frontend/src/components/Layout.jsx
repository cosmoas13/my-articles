import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks';
import { Home, PenSquare, User, LogIn, Moon, Sun, ImageIcon, Facebook, Twitter, Github } from './icons';

function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const { data: userProfile, isSuccess: isLoggedIn, isLoading: isProfileLoading } = useProfile();

  // Debug untuk melihat status profil
  useEffect(() => {
    console.log('Profile status:', { isLoggedIn, userProfile, isProfileLoading });
  }, [isLoggedIn, userProfile, isProfileLoading]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full flex flex-col bg-gray-50 dark:bg-dark text-gray-800 dark:text-gray-100 transition-colors duration-300`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-dark-card shadow-lg px-4 py-3 md:px-6 lg:px-8 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <ImageIcon size={20} className="text-white" />
            </div>
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 cursor-pointer"
            >
              Green Blog
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <nav className="flex gap-2 md:gap-3">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
              >
                <Home size={18} className="mr-1.5" />
                Beranda
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/articles/create"
                    className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  >
                    <PenSquare size={18} className="mr-1.5" />
                    Tulis
                  </Link>
                  <button
                    className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => console.log('Current user profile:', userProfile)}
                  >
                    <User size={18} className="mr-1.5" />
                    {userProfile?.name || 'Profil'}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <LogIn size={18} className="mr-1.5" />
                  Login
                </Link>
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
        {children}
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

          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Green Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;