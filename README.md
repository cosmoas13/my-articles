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

## Dokumentasi API

Lihat file `backend/API_DOCS.md` untuk dokumentasi API lengkap.