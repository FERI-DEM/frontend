import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Varela_Round } from '@next/font/google';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-varela-round',
});

export default function DefaultLayout({ children }: any) {
  return (
    <div className={varelaRound.className}>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        {children}
      </div>
    </div>
  );
}
