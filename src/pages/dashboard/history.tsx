import CardStats from '@/components/Cards/CardStats';
import ChartHistoryProduction from '@/components/Charts/ChartHistoryProduction';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function History() {
    const { loading } = useAuthRequired();

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <DefaultLayout>
            <div className="px-4 pt-6">
                <ChartHistoryProduction />
            </div>
            <div className="p-2 flex">
                <div className="px-2">
                    <CardStats
                        statSubtitle="PROIZVODNJA DANES"
                        statTitle="22 Wh"
                        statArrow="up"
                        statPercent="3,48%"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Od včeraj"
                        statIconName="bar_chart"
                        statIconColor="bg-red-500"
                    />
                </div>
                <div className="px-2">
                    <CardStats
                        statSubtitle="PROIZVODNJA DANES"
                        statTitle="22 Wh"
                        statArrow="up"
                        statPercent="3,48%"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Od včeraj"
                        statIconName="bar_chart"
                        statIconColor="bg-red-500"
                    />
                </div>
                <div className="px-2">
                    <CardStats
                        statSubtitle="PROIZVODNJA DANES"
                        statTitle="22 Wh"
                        statArrow="up"
                        statPercent="3,48%"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Od včeraj"
                        statIconName="bar_chart"
                        statIconColor="bg-red-500"
                    />
                </div>
                <div className="px-2">
                    <CardStats
                        statSubtitle="PROIZVODNJA DANES"
                        statTitle="22 Wh"
                        statArrow="up"
                        statPercent="3,48%"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Od včeraj"
                        statIconName="bar_chart"
                        statIconColor="bg-red-500"
                    />
                </div>
                <div className="px-2">
                    <CardStats
                        statSubtitle="PROIZVODNJA DANES"
                        statTitle="22 Wh"
                        statArrow="up"
                        statPercent="3,48%"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Od včeraj"
                        statIconName="bar_chart"
                        statIconColor="bg-red-500"
                    />
                </div>
            </div>
        </DefaultLayout>
    );
}
