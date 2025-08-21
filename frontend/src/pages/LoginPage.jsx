import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';

function LoginPage() {
  const navigate = useNavigate();
  
  const handleLoginSuccess = () => {
    console.log('Login success handler called');
    // Redirect ke halaman utama setelah login berhasil
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;