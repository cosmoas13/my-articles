import { z } from 'zod';

// Skema validasi untuk kategori
export const categorySchema = z.object({
  name: z.string().min(3, 'Nama kategori harus minimal 3 karakter').max(50, 'Nama kategori maksimal 50 karakter'),
  description: z.string().max(200, 'Deskripsi maksimal 200 karakter').optional(),
});