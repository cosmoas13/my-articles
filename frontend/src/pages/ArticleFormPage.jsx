import { useParams, useNavigate } from 'react-router-dom';
import { ArticleForm } from '../components';
import { useEffect, useState } from 'react';
import { useProfile } from '../hooks';

function ArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSuccess: isLoggedIn } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Redirect ke halaman login jika user belum login
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, isLoading]);

  useEffect(() => {
    // Set loading false setelah cek auth selesai
    setIsLoading(false);
  }, [isLoggedIn]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!isLoggedIn) {
    return null; // Akan di-redirect oleh useEffect
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Artikel' : 'Buat Artikel Baru'}
      </h2>
      <ArticleForm 
        article={id ? { id } : undefined}
        onSuccess={(article) => {
          navigate(`/articles/${article.id}`);
        }}
      />
    </div>
  );
}

export default ArticleFormPage;