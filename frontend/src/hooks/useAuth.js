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
    onSuccess: (data) => {
      console.log('Login mutation success:', data);
      // Invalidate dan refetch user profile setelah login
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // Refetch profile secara langsung untuk memastikan data terbaru
      queryClient.refetchQueries({ queryKey: ['profile'] })
        .then(() => {
          console.log('Profile refetched after login');
        })
        .catch(error => {
          console.error('Error refetching profile:', error);
        });
    },
    onError: (error) => {
      console.error('Login mutation error:', error);
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
  // Cek apakah user terautentikasi sebelum menjalankan query
  // Gunakan fungsi untuk mendapatkan nilai terbaru setiap kali query dijalankan
  
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      // Cek autentikasi saat query dijalankan, bukan saat hook diinisialisasi
      const isAuthenticated = AuthService.isAuthenticated();
      console.log('Running profile query, isAuthenticated:', isAuthenticated);
      
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      return AuthService.getProfile();
    },
    // Hanya aktifkan query jika user terautentikasi
    enabled: AuthService.isAuthenticated(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // Data dianggap segar selama 5 menit
    refetchOnMount: true, // Tetap refetch saat komponen di-mount
    refetchOnWindowFocus: false, // Tidak perlu refetch saat window mendapat fokus
    refetchInterval: false, // Tidak perlu refetch secara berkala
  });
};