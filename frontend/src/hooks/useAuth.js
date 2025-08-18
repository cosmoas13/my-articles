import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services';

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => AuthService.register(userData),
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials) => AuthService.login(credentials),
    onSuccess: () => {
      // Invalidate dan refetch user profile setelah login
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Reset cache setelah logout
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => AuthService.getProfile(),
    enabled: AuthService.isAuthenticated(), // Hanya jalankan jika user terautentikasi
    retry: false,
  });
};