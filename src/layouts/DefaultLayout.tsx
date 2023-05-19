import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Varela_Round } from '@next/font/google';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { ToastContainer } from 'react-toastify';

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function DefaultLayout({ children }: any) {
    const auth = useAuthRequired();

    if (!!!auth.user) {
        return <></>;
    }

    return (
        <div className={`${varelaRound.className} h-screen bg-gray-50 dark:bg-gray-900`}>
            <ToastContainer />
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-50 dark:bg-gray-900">{children}</div>
        </div>
    );
}
