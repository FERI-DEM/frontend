import DefaultLayout from '@/layouts/DefaultLayout';
import PowerPlantSettings from "@/components/Settings/PowerPlant/PowerPlantSettings";
import Head from 'next/head';

export default function Settings() {
  return (
    <DefaultLayout>
      <Head>
        <title>Nastavitve - Watt4Cast</title>
      </Head>
      <div className="grid px-4 pt-6 xl:auto-rows-min xl:gap-4 dark:bg-gray-900 h-screen min-h-min">
          <PowerPlantSettings />
      </div>
    </DefaultLayout>
  );
}
