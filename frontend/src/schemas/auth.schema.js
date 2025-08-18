import { z } from 'zod';

// Skema validasi untuk registrasi
export const registerSchema = z.object({
  name: z.string().min(3, 'Nama harus minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password harus minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf kapital')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Password dan konfirmasi password tidak cocok',
  path: ['confirmPassword'],
});

// Skema validasi untuk login
export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});