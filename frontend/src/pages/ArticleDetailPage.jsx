import { useParams } from 'react-router-dom';
import { ArticleDetail } from '../components';

function ArticleDetailPage() {
  const { id } = useParams();
  
  return (
    <div>
      <ArticleDetail articleId={id} />
    </div>
  );
}

export default ArticleDetailPage;