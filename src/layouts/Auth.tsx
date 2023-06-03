import React from 'react';
import { Varela_Round } from '@next/font/google';
import Logo from '@/components/Logo/Logo';
import { ToastContainer } from 'react-toastify';

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function Auth({ children }: any) {
    return (
        <div className={`${varelaRound.className} h-screen bg-gray-50 dark:bg-gray-900`}>
            <ToastContainer />
            <main className="flex flex-col items-center justify-center px-6 py-12 mx-auto bg-gray-50 dark:bg-gray-900">
                <Logo />
                {children}
            </main>
        </div>
    );
}
