import CardStats from '@/components/Cards/CardStats';
import ChartHistoryProduction from '@/components/Charts/ChartHistoryProduction';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import Head from 'next/head';

export default function History() {
    const { loading } = useAuthRequired();

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <DefaultLayout>
            <Head>
                <title>Zgodovina - Watt4Cast</title>
            </Head>
            <div className="px-4 pt-6">
                <ChartHistoryProduction />
            </div>
        </DefaultLayout>
    );
}
