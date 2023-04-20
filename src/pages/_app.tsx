import { AuthProvider } from '@/context/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useTheme();

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
