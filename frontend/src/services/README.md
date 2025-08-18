# API Services

File-file dalam direktori ini berisi fungsi-fungsi untuk mengakses API backend. Semua API menggunakan axios untuk melakukan HTTP request.

## Konfigurasi

Semua service menggunakan URL API yang dikonfigurasi melalui environment variable `NEXT_PUBLIC_API_URL`. Jika tidak diatur, akan menggunakan default `http://localhost:3001/api`.

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
```

## Service yang Tersedia

### Article Service

```javascript
import { getArticles, getArticleBySlug, getArticleComments, submitComment } from '../services/articleService';
```

- `getArticles({ page, limit, search })` - Mendapatkan daftar artikel dengan pagination dan pencarian
- `getArticleBySlug(slug)` - Mendapatkan artikel berdasarkan slug
- `getArticleComments(articleId)` - Mendapatkan komentar untuk artikel tertentu
- `submitComment(comment)` - Mengirim komentar baru

### Category Service

```javascript
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
```

- `getCategories()` - Mendapatkan semua kategori
- `getCategoryById(id)` - Mendapatkan kategori berdasarkan ID
- `createCategory(categoryData, token)` - Membuat kategori baru (memerlukan autentikasi)
- `updateCategory(id, categoryData, token)` - Memperbarui kategori (memerlukan autentikasi)
- `deleteCategory(id, token)` - Menghapus kategori (memerlukan autentikasi)

### Tag Service

```javascript
import { getTags, getTagById, createTag, createTags, deleteTag } from '../services/tagService';
```

- `getTags()` - Mendapatkan semua tag
- `getTagById(id)` - Mendapatkan tag berdasarkan ID
- `createTag(tagData, token)` - Membuat tag baru (memerlukan autentikasi)
- `createTags(tagNames, token)` - Membuat beberapa tag sekaligus (memerlukan autentikasi)
- `deleteTag(id, token)` - Menghapus tag (memerlukan autentikasi)

### Comment Service

```javascript
import { getArticleComments, submitComment, deleteComment } from '../services/commentService';
```

- `getArticleComments(articleId)` - Mendapatkan komentar untuk artikel tertentu
- `submitComment(comment)` - Mengirim komentar baru
- `deleteComment(id, token)` - Menghapus komentar (memerlukan autentikasi)

### Auth Service

```javascript
import { register, login, logout, refreshToken, getProfile, isAuthenticated } from '../services/authService';
```

- `register(userData)` - Mendaftarkan pengguna baru
- `login(credentials)` - Login pengguna dan menyimpan token
- `logout()` - Logout pengguna dan menghapus token
- `refreshToken()` - Memperbarui token yang kedaluwarsa
- `getProfile()` - Mendapatkan profil pengguna (memerlukan autentikasi)
- `isAuthenticated()` - Memeriksa apakah pengguna sudah login

## Penggunaan Token

Untuk endpoint yang memerlukan autentikasi, token JWT harus disertakan dalam header Authorization. Token ini otomatis disimpan di localStorage saat login dan dihapus saat logout.

Contoh penggunaan:

```javascript
// Login
const handleLogin = async (email, password) => {
  try {
    const data = await login({ email, password });
    // User berhasil login, token disimpan otomatis
    return data.user;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Menggunakan endpoint yang memerlukan autentikasi
const createNewCategory = async (name, description) => {
  try {
    // Token diambil otomatis dari localStorage
    const category = await createCategory({ name, description });
    return category;
  } catch (error) {
    console.error('Failed to create category:', error);
  }
};
```

## Interceptor Token Refresh

Service Auth menyediakan interceptor axios yang secara otomatis memperbarui token yang kedaluwarsa dan mencoba kembali request yang gagal karena token tidak valid.