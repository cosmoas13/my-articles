import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import {
  PostCard, Categories, Loader, PostWidget
} from '../../components/elements/Blog';
import Header from '../../components/elements/Header';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container mx-auto px-10 mb-8 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  try {
    // Pastikan params.slug ada
    if (!params || !params.slug) {
      return {
        props: { posts: [] },
        notFound: true
      };
    }
    
    const posts = await getCategoryPost(params.slug);
    
    return {
      props: { posts },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: { posts: [] },
      notFound: true
    };
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const categories = await getCategories();
    
    // Tambahkan slug ke setiap kategori
    const categoriesWithSlug = categories.map(category => ({
      ...category,
      slug: category.name.toLowerCase().replace(/\s+/g, '-')
    }));
    
    // Pastikan slug tidak undefined
    const validCategories = categoriesWithSlug.filter(category => category.slug);
    
    return {
      paths: validCategories.map(category => ({
        params: { slug: category.slug }
      })),
      fallback: true,
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: true };
  }
}