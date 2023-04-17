import DefaultLayout from '@/layouts/DefaultLayout';
import FormInput from '@/components/Form/FormInput';
import CardBasic from '@/components/Cards/CardBasic';
import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Settings() {
  useEffect(() => {
    // TODO - Load the plant data
    // This will be possible when user management is fully working
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Nastavitve - Watt4Cast</title>
      </Head>

      <div className="grid px-4 pt-6 xl:auto-rows-min xl:gap-4 dark:bg-gray-900 h-screen min-h-min">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Nastavitve
          </h1>
        </div>

        <div className='flex flex-row flex-wrap'>
          <CardBasic title='Spremeni geslo' buttonTitle='Shrani geslo'>
              <form method='post' name='editPowerPlant' className='flex flex-col items-center justify-center'>
                <FormInput id='oldPassword' label='Staro geslo' type='password' />
                <FormInput id='newPassword' label='Novo geslo' type='password' />                
              </form> 
          </CardBasic>
          <CardBasic title='Uredi elektrarno' buttonTitle='Shrani elektrarno'>
              <form method='post' name='editPowerPlant' className='flex flex-col items-center justify-center'>
                <FormInput id='name' label='Ime' type='text' />
                <FormInput id='address' label='Naslov' type='text'/>
                <Image className='img border rounded-lg shadow dark:border-gray-700 m-3 cursor-pointer' src='/images/gps-screenshot.png' alt='Picture of the author' width={500} height={500} />
              </form> 
          </CardBasic>
        </div>
      </div>
    </DefaultLayout>
  );
}
