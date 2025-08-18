import { useState, useEffect } from 'react'
import './App.css'
import { LoginForm, ArticleList, ArticleDetail, ArticleForm } from './components'
import { useProfile } from './hooks'

function App() {
  const [currentView, setCurrentView] = useState('articles')
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [theme, setTheme] = useState('light')
  const { data: userProfile, isSuccess: isLoggedIn } = useProfile()

  useEffect(() => {
    document.body.className = theme
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
        return <ArticleForm />
      case 'edit-article':
        return <ArticleForm article={{ id: selectedArticleId }} />
      default:
        return <LoginForm />
    }
  }

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1 onClick={() => setCurrentView('articles')} className="site-title">Green Blog</h1>
        <nav>
          <button onClick={() => setCurrentView('articles')}>Beranda</button>
          {isLoggedIn ? (
            <>
              <button onClick={() => setCurrentView('create-article')}>Buat Artikel</button>
              <button className="profile-button">
                {userProfile?.name || 'Profil'}
              </button>
            </>
          ) : (
            <button onClick={() => setCurrentView('login')} className="login-button">Login</button>
          )}
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
        </button>
      </header>
      
      <main>
        {renderContent()}
      </main>
      
      <footer>
        <p>Dibuat dengan React, React Query, dan React Hook Form</p>
      </footer>
    </div>
  )
}

export default App
