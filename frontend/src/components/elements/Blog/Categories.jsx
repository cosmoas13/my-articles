import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../../../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getCategories().then((newCategories) => {
      // Tambahkan slug ke setiap kategori dan update state hanya jika komponen masih terpasang
      if (isMounted) {
        const categoriesWithSlug = newCategories.map(category => ({
          ...category,
          slug: category.name.toLowerCase().replace(/\s+/g, '-')
        }));
        setCategories(categoriesWithSlug);
      }
    });
    
    // Cleanup function untuk mencegah update state setelah komponen unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <Link passHref key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;