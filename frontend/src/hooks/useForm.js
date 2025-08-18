import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Custom hook untuk form dengan validasi Zod
 * @param {Object} schema - Skema validasi Zod
 * @param {Object} options - Opsi tambahan untuk useForm
 * @returns {Object} - Form methods dari react-hook-form
 */
export const useZodForm = (schema, options = {}) => {
  return useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...options,
  });
};