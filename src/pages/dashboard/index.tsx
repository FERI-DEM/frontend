import CardStats from '@/components/Cards/CardStats';
import OnboardingAlert from '@/components/Cards/OnboardingAlert';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import ChartDashboardForecasts from '@/components/Charts/ChartDashboardForecasts';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import Head from 'next/head';

export default function Index() {
  const { loading } = useAuthRequired();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Elektrarne - Watt4Cast</title>
      </Head>
      <div className="px-4 pt-6">
        <OnboardingAlert />

        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="2xl:col-span-2">
            <ChartDashboardForecasts />
          </div>

          <div className="p-2">
            <div className="mb-3">
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

            <div className="mb-3">
              <CardStats
                statSubtitle="NAPOVED PROIZVODNJE ZA DANES"
                statTitle="25,5 Wh"
                statPercentColor="text-emerald-500"
                statDescripiron="Osveženo 30 minut nazaj"
                statIconName="partly_cloudy_day"
                statIconColor="bg-red-500"
              />
            </div>

            <div className="mb-3">
              <CardStats
                statSubtitle="NAPOVED PROIZVODNJE ZA JUTRI"
                statTitle="49,65 Wh"
                statDescripiron="Osveženo 30 minut nazaj"
                statIconName="solar_power"
                statIconColor="bg-orange-500"
              />
            </div>

            <div className="mb-3">
              <CardStats
                statSubtitle="PROIZVODNJA V TEKOČEM LETU DO ZDAJ"
                statTitle="350,89 MWh"
                statArrow="up"
                statPercent="3.48%"
                statPercentColor="text-emerald-500"
                statDescripiron="Od lanskega leta"
                statIconName="bolt"
                statIconColor="bg-red-500"
              />
            </div>

            <div className="mb-3">
              <CardStats
                statSubtitle="PROIZVODNJA V TEKOČEM MESECU DO ZDAJ"
                statTitle="12,3 kWh"
                statArrow="down"
                statPercent="3.48%"
                statPercentColor="text-red-500"
                statDescripiron="Od prejšnjega meseca"
                statIconName="pie_chart"
                statIconColor="bg-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
