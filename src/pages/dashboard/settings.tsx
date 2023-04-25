import DefaultLayout from '@/layouts/DefaultLayout';
import FormInput from '@/components/Form/FormInput';
import CardBasic from '@/components/Cards/CardBasic';
import { FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRequiredAuth } from '@/context/RequiredAuth';
import { EmailAuthProvider, updatePassword } from 'firebase/auth';
import { useState } from 'react';

export default function Settings() {
  const auth = useRequiredAuth();
  const { user } = auth;
  console.log(user);

  const handleChangePasswordSubmit = async () => {
    // TODO - Getting error "user.getIdToken is not a function"
    const oldPassword = (document.getElementById('oldPassword') as HTMLInputElement).value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    const passwordChangeError = (document.getElementById('passwordChangeError') as HTMLDivElement);

    if (oldPassword === '' || newPassword === '') {
      passwordChangeError.innerText = 'Izpolnite vsa polja.';
      return;
    }

    if (oldPassword === newPassword) {
      passwordChangeError.innerText = 'Novo geslo ne mora biti enako kot staro.';
      return;
    }

    passwordChangeError.innerText = '';
    await updatePassword(user, newPassword).then(() => {
      alert("Geslo uspešno posodobljeno");
      // Reset the form
      (document.getElementById('oldPassword') as HTMLInputElement).value = '';
      (document.getElementById('newPassword') as HTMLInputElement).value = '';
    }).catch((error) => {
      passwordChangeError.innerText = error.message;
    });
  };

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
          <CardBasic title='Spremeni geslo' buttonTitle='Shrani geslo' onButtonClick={handleChangePasswordSubmit}>
            <form method='post' name='editPassword' className='flex flex-col items-center justify-center'>
              <FormInput id='oldPassword' name="oldPassword" label='Staro geslo' type='password' />
              <FormInput id='newPassword' name="newPassword" label='Novo geslo' type='password' />
            </form>
            <div id='passwordChangeError' className="text-red-500 text-sm"></div>
          </CardBasic>
          <CardBasic title='Uredi elektrarno' buttonTitle='Shrani elektrarno'>
            <form method='post' name='editPowerPlant' className='flex flex-col items-center justify-center'>
              <FormInput id='name' label='Ime' type='text' />
              <FormInput id='address' label='Naslov' type='text' />
              <Image className='img border rounded-lg shadow dark:border-gray-700 m-3 cursor-pointer' src='/images/gps-screenshot.png' alt='Picture of the author' width={500} height={500} />
            </form>
          </CardBasic>
        </div>
      </div>
    </DefaultLayout>
  );
}
