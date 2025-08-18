import { z } from 'zod';

// Skema validasi untuk artikel
export const articleSchema = z.object({
  title: z.string().min(5, 'Judul harus minimal 5 karakter').max(100, 'Judul maksimal 100 karakter'),
  content: z.string().min(10, 'Konten harus minimal 10 karakter'),
  categoryId: z.string().min(1, 'Kategori harus dipilih'),
  tags: z.array(
    z.string().min(1, 'Tag tidak boleh kosong')
  ).optional().default([]),
  isPublished: z.boolean().default(false), // Ubah dari published menjadi isPublished
});