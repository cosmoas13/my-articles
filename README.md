# Sistem Manajemen Artikel

Aplikasi manajemen artikel dengan backend Node.js/Express dan frontend Next.js. Menggunakan PostgreSQL sebagai database dengan Drizzle ORM untuk query yang type-safe.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:

### Backend

Direktori `backend/` berisi API server yang dibangun dengan:
- Node.js dan Express.js
- PostgreSQL dengan Drizzle ORM
- RESTful API untuk manajemen artikel, kategori, tag, dan komentar

### Frontend

Direktori `frontend/` berisi aplikasi web yang dibangun dengan:
- Next.js
- TailwindCSS untuk styling

## Fitur

- Manajemen artikel dengan dukungan kategori dan tag
- Sistem komentar untuk artikel
- API RESTful lengkap untuk operasi CRUD
- Dokumentasi API lengkap

## Cara Menjalankan

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Setup Database dan Migrasi

### Konfigurasi Database

1. Buat file `.env` di folder `backend/` berdasarkan `.env.example`
2. Atur `DATABASE_URL` dengan koneksi PostgreSQL Anda

### Mengelola Schema dan Migrasi

```bash
cd backend

# Generate migrasi berdasarkan perubahan schema
npm run generate

# Menjalankan migrasi ke database
npm run migrate

# Menjalankan migrasi manual (jika diperlukan)
npm run manual-migrate

# Mengisi database dengan data awal
npm run seed

# Membuka Drizzle Studio untuk melihat dan mengelola data
npm run studio
```

### Menambahkan Tabel atau Schema Baru

1. Buat atau modifikasi file schema di `backend/src/db/schema/`
2. Pastikan untuk mengekspor schema baru di `backend/src/db/schema.js`
3. Generate migrasi dengan `npm run generate`
4. Terapkan migrasi dengan `npm run migrate`

## Dokumentasi API

Lihat file `backend/API_DOCS.md` untuk dokumentasi API lengkap.