import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

export const useRequiredAuth = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.loading && (auth.user === false || auth.user === null)) {
      router.push('/auth/login');
    }
  }, []);

  return auth;
};
