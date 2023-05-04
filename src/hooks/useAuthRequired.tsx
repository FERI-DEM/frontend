import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export const useAuthRequired = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.loading && (auth.user === false || auth.user === null)) {
      router.push('/auth/login');
    }
  }, []);

  return auth;
};
