import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryPost = async (slug) => {
  try {
    // Karena kategori di backend tidak memiliki field slug,
    // kita perlu membuat slug dari nama kategori
    const categories = await getCategories();
    
    // Buat slug dari nama kategori (lowercase dan ganti spasi dengan dash)
    const categoriesWithSlug = categories.map(category => ({
      ...category,
      slug: category.name.toLowerCase().replace(/\s+/g, '-')
    }));
    
    // Cari kategori berdasarkan slug
    const category = categoriesWithSlug.find((cat) => cat.slug === slug);
    
    if (!category) {
      console.error('Category not found with slug:', slug);
      return [];
    }
    
    // Kemudian ambil artikel berdasarkan ID kategori
    const response = await axios.get(`${API_URL}/articles?categoryId=${category.id}`);
    
    // Pastikan response.data.articles ada sebelum melakukan map
    const articles = response.data?.articles || [];
    
    // Format data untuk kompatibilitas dengan komponen PostCard
    return articles.map(article => ({
      node: article
    }));
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    return null;
  }
};

export const createCategory = async (categoryData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/categories`, 
      categoryData, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error(error.response?.data?.message || 'Failed to create category');
  }
};

export const updateCategory = async (id, categoryData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/categories/${id}`, 
      categoryData, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error(error.response?.data?.message || 'Failed to update category');
  }
};

export const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/categories/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete category');
  }
};