import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { ArticlesPage, ArticleDetailPage, ArticleFormPage, LoginPage, NotFoundPage } from './pages'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/articles/create" element={<ArticleFormPage />} />
          <Route path="/articles/edit/:id" element={<ArticleFormPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
