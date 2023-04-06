import React from 'react';

import { Varela_Round } from '@next/font/google';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-varela-round',
});

export default function Auth({ children }: any) {
  return (
    <div className={varelaRound.className}>
      <main className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
