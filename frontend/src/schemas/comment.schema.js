import { z } from 'zod';

// Skema validasi untuk komentar
export const commentSchema = z.object({
  content: z.string().min(1, 'Komentar tidak boleh kosong').max(500, 'Komentar maksimal 500 karakter'),
  articleId: z.string(),
  isAnonymous: z.boolean().default(false),
  name: z.string().min(2, 'Nama harus minimal 2 karakter').max(50, 'Nama maksimal 50 karakter')
    .optional()
    .refine(val => val !== undefined || val !== '', {
      message: 'Nama harus diisi jika tidak anonim',
      // Kondisional berdasarkan isAnonymous
    }),
  email: z.string().email('Format email tidak valid').optional(),
});

// Skema validasi untuk komentar dengan kondisi dinamis
export const getDynamicCommentSchema = (isAnonymous) => {
  if (isAnonymous) {
    // Jika anonim, nama dan email tidak diperlukan
    return z.object({
      content: z.string().min(1, 'Komentar tidak boleh kosong').max(500, 'Komentar maksimal 500 karakter'),
      isAnonymous: z.boolean().default(true),
      // Menghapus validasi yang tidak diperlukan untuk komentar anonim
      name: z.string().optional(),
      email: z.string().optional()
    });
  } else {
    // Jika tidak anonim, nama wajib diisi, email opsional
    return z.object({
      content: z.string().min(1, 'Komentar tidak boleh kosong').max(500, 'Komentar maksimal 500 karakter'),
      isAnonymous: z.boolean().default(false),
      name: z.string().min(2, 'Nama harus minimal 2 karakter').max(50, 'Nama maksimal 50 karakter'),
      email: z.string().email('Format email tidak valid').optional()
    })
  }
};