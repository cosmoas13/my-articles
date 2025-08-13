# Articles Backend API

Backend API untuk aplikasi Articles dengan fitur autentikasi menggunakan Express.js, Drizzle ORM, dan PostgreSQL.

## Fitur

- Autentikasi pengguna (register, login, logout)
- JWT Authentication dengan refresh token
- Database PostgreSQL dengan Drizzle ORM

## Persyaratan

- Node.js (v14 atau lebih baru)
- PostgreSQL

## Instalasi

1. Clone repositori
2. Install dependensi:

```bash
cd backend
npm install
```

3. Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi:

```
# Database Configuration
DATABASE_URL=postgres://postgres:postgres@localhost:5432/articles

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this_in_production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Server Configuration
PORT=3001
NODE_ENV=development
```

4. Buat database PostgreSQL:

```sql
CREATE DATABASE articles;
```

5. Generate dan jalankan migrasi database:

```bash
npm run generate
npm run migrate
```

6. Jalankan seed untuk mengisi data kategori:

```bash
npm run seed
```

## Menjalankan Aplikasi

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Autentikasi

- `POST /api/auth/register` - Mendaftarkan pengguna baru
- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout pengguna (memerlukan autentikasi)
- `GET /api/auth/profile` - Mendapatkan profil pengguna (memerlukan autentikasi)

### Kategori

- `GET /api/categories` - Mendapatkan semua kategori
- `GET /api/categories/:id` - Mendapatkan kategori berdasarkan ID
- `POST /api/categories` - Membuat kategori baru (memerlukan autentikasi)
- `PUT /api/categories/:id` - Memperbarui kategori (memerlukan autentikasi)
- `DELETE /api/categories/:id` - Menghapus kategori (memerlukan autentikasi)

### Tag

- `GET /api/tags` - Mendapatkan semua tag
- `GET /api/tags/:id` - Mendapatkan tag berdasarkan ID
- `POST /api/tags` - Membuat tag baru (memerlukan autentikasi)
- `POST /api/tags/batch` - Membuat beberapa tag sekaligus (memerlukan autentikasi)
- `DELETE /api/tags/:id` - Menghapus tag (memerlukan autentikasi)

### Artikel

- `GET /api/articles` - Mendapatkan semua artikel (dengan pagination dan filter)
- `GET /api/articles/id/:id` - Mendapatkan artikel berdasarkan ID
- `GET /api/articles/slug/:slug` - Mendapatkan artikel berdasarkan slug
- `POST /api/articles` - Membuat artikel baru (memerlukan autentikasi)
- `PUT /api/articles/:id` - Memperbarui artikel (memerlukan autentikasi)
- `DELETE /api/articles/:id` - Menghapus artikel (memerlukan autentikasi)

## Contoh Penggunaan

### Register

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"User Name"}'
```

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Refresh Token

```bash
curl -X POST http://localhost:3001/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"your-refresh-token"}'
```

## Dokumentasi API

Dokumentasi API yang lebih lengkap tersedia di file [API_DOCS.md](API_DOCS.md).

## Postman Collection

Untuk memudahkan pengujian API, Anda dapat menggunakan Postman Collection yang telah disediakan:

1. Buka Postman
2. Klik tombol "Import" di bagian atas
3. Pilih file `postman_collection.json` dari folder ini
4. Collection akan diimpor dengan nama "Articles API"
5. Pastikan server backend berjalan di `http://localhost:3001`
6. Gunakan endpoint "Login" untuk mendapatkan token, token akan otomatis disimpan sebagai variabel collection
7. Gunakan endpoint lainnya sesuai kebutuhan

### Logout

```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer your_access_token"
```

### Get Profile

```bash
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer your_access_token"
```