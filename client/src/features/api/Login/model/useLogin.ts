import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { login } from '../../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (number: string, password: string) => {
    try {
      setError(null);
      await dispatch(login({ number, password })).unwrap();
      navigate('/');
    } catch (err: unknown) {
      // Redux Toolkit сериализует ошибки, поэтому они теряют прототип Error
      // Проверяем наличие свойства message напрямую
      if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
        setError(err.message);
      } else {
        setError('Ошибка входа');
      }
    }
  };

  return {
    handleLogin,
    error,
  };
};

