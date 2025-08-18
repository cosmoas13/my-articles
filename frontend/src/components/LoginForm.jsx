import { useState } from 'react';
import { useZodForm, useLogin } from '../hooks';
import { loginSchema } from '../schemas';

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const { mutate: login, isPending } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useZodForm(loginSchema);

  const onSubmit = (data) => {
    setLoginError('');
    login(data, {
      onSuccess: () => {
        console.log('Login berhasil');
        reset();
      },
      onError: (error) => {
        setLoginError(error.response?.data?.message || 'Login gagal');
      }
    });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {loginError && <div className="error-message">{loginError}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={isPending}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            disabled={isPending}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;