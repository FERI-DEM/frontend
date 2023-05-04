import DefaultLayout from '@/layouts/DefaultLayout';
import PowerPlantSettings from "@/components/Settings/PowerPlant/PowerPlantSettings";
import Head from 'next/head';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';

export default function Settings() {
  const { loading } = useAuthRequired();

  if (loading) {
    return <DashboardSkeleton />;
  }
  
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
