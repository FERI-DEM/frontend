import { AuthProvider } from '@/context/AuthContext';
import { SWRConfigurationProvider } from '@/context/SWRContext';
import { useTheme } from '@/hooks/useTheme';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    useTheme();

    return (
        <AuthProvider>
            <SWRConfigurationProvider>
                <Component {...pageProps} />
            </SWRConfigurationProvider>
        </AuthProvider>
    );
}
