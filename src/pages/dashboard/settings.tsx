import DefaultLayout from '@/layouts/DefaultLayout';
import PowerPlantSettings from '@/components/Settings/PowerPlant/PowerPlantSettings';
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

            <div className="px-4 pt-6">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                            Moje elektrarne
                        </h2>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 pt-6 dark:bg-gray-900">
                <PowerPlantSettings />
            </div>
        </DefaultLayout>
    );
}
