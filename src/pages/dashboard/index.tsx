import CardStats from '@/components/Cards/CardStats';
import OnboardingAlert from '@/components/Cards/OnboardingAlert';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import ChartDashboardForecasts from '@/components/Charts/ChartDashboardForecasts';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import Head from 'next/head';
import usePowerPlantStatistics from '@/hooks/usePowerPlantStatistics';
import usePowerPlants from '@/hooks/usePowerPlants';
import { PowerPlant, PowerPlantStatistics, Statistics } from '@/types/power-plant.type';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import usePrediction from '@/hooks/usePrediction';
import moment from 'moment';
import { useState } from 'react';
import CardSkeleton from '@/components/Skeletons/CardSkeleton';

export default function Index() {
    const { loading } = useAuthRequired();

    const { powerPlants, powerPlantsLoading } = usePowerPlants();
    const [selectedPowerPlant, setSelectedPowerPlant] = useState<PowerPlant>();

    const { powerPlantStatistics, powerPlantStatisticsError, powerPlantStatisticsLoading } = usePowerPlantStatistics(
        [Statistics.today, Statistics.week, Statistics.month, Statistics.year],
        [selectedPowerPlant?._id ?? '']
    );
    const { powerPlantProduction, powerPlantProductionError, powerPlantProductionLoading } = usePowerPlantProduction(
        [selectedPowerPlant?._id ?? ''],
        moment().add(-1, 'month').startOf('month').toDate(),
        moment().endOf('day').toDate()
    );
    const { powerPlantPrediction, powerPlantPredictionError, powerPlantPredictionLoading } = usePrediction([
        selectedPowerPlant?._id ?? '',
    ]);

    const getStats = (type: Statistics): PowerPlantStatistics => {
        if (powerPlantStatistics && powerPlantStatistics.some((x) => x.type === type)) {
            return (
                powerPlantStatistics?.find((x) => x.type === type) ??
                ({
                    now: 0.0,
                    before: 0.0,
                } as PowerPlantStatistics)
            );
        }
        return {
            now: 0.0,
            before: 0.0,
        } as PowerPlantStatistics;
    };

    const differencePercentCalculation = (stat: PowerPlantStatistics) => {
        return stat?.now > stat?.before
            ? Number(((stat?.before / stat?.now) * 100).toFixed(3)).toLocaleString()
            : Number(-(100 - (stat?.now / stat?.before) * 100).toFixed(3)).toLocaleString();
    };

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
                        {
                            <ChartDashboardForecasts
                                powerPlants={powerPlants}
                                powerPlantProduction={powerPlantProduction}
                                powerPlantPrediction={powerPlantPrediction}
                                loading={powerPlantPredictionLoading || powerPlantProductionLoading}
                                selectedPowerPlantOutput={setSelectedPowerPlant}
                            />
                        }
                    </div>

                    <div className="p-2">
                        <div className="mb-3">
                            {(!powerPlantStatisticsLoading && (
                                <CardStats
                                    statSubtitle="PROIZVODNJA DANES"
                                    statTitle={
                                        Number(getStats(Statistics.today)?.now.toFixed(2)).toLocaleString() + ' kW'
                                    }
                                    statArrow={
                                        getStats(Statistics.today)?.now > getStats(Statistics.today)?.before
                                            ? 'up'
                                            : 'down'
                                    }
                                    statPercent={differencePercentCalculation(getStats(Statistics.today)) + ' %'}
                                    statPercentColor={
                                        getStats(Statistics.today)?.now > getStats(Statistics.today)?.before
                                            ? 'text-emerald-500'
                                            : 'text-red-500'
                                    }
                                    statDescripiron="Od včeraj"
                                    statIconName="bar_chart"
                                    statIconColor="bg-amber-600"
                                />
                            )) || <CardSkeleton />}
                        </div>

                        <div className="mb-3">
                            {(!powerPlantStatisticsLoading && (
                                <CardStats
                                    statSubtitle="PROIZVODNJA V TEKOČEM TEDNU DO ZDAJ"
                                    statTitle={
                                        Number(getStats(Statistics.week)?.now.toFixed(2)).toLocaleString() + ' kW'
                                    }
                                    statArrow={
                                        getStats(Statistics.week)?.now > getStats(Statistics.week)?.before
                                            ? 'up'
                                            : 'down'
                                    }
                                    statPercent={differencePercentCalculation(getStats(Statistics.week)) + ' %'}
                                    statPercentColor={
                                        getStats(Statistics.week)?.now > getStats(Statistics.week)?.before
                                            ? 'text-emerald-500'
                                            : 'text-red-500'
                                    }
                                    statDescripiron="Od prejšnjega tedna"
                                    statIconName="solar_power"
                                    statIconColor="bg-emerald-500"
                                />
                            )) || <CardSkeleton />}
                        </div>

                        <div className="mb-3">
                            {(!powerPlantStatisticsLoading && (
                                <CardStats
                                    statSubtitle="PROIZVODNJA V TEKOČEM MESECU DO ZDAJ"
                                    statTitle={
                                        Number(getStats(Statistics.month)?.now.toFixed(2)).toLocaleString() + ' kW'
                                    }
                                    statArrow={
                                        getStats(Statistics.month)?.now > getStats(Statistics.month)?.before
                                            ? 'up'
                                            : 'down'
                                    }
                                    statPercent={differencePercentCalculation(getStats(Statistics.month)) + ' %'}
                                    statPercentColor={
                                        getStats(Statistics.month)?.now > getStats(Statistics.month)?.before
                                            ? 'text-emerald-500'
                                            : 'text-red-500'
                                    }
                                    statDescripiron="Od prejšnjega meseca"
                                    statIconName="partly_cloudy_day"
                                    statIconColor="bg-sky-500"
                                />
                            )) || <CardSkeleton />}
                        </div>

                        <div className="mb-3">
                            {(!powerPlantStatisticsLoading && (
                                <CardStats
                                    statSubtitle="PROIZVODNJA V TEKOČEM LETU DO ZDAJ"
                                    statTitle={
                                        Number(getStats(Statistics.year)?.now.toFixed(2)).toLocaleString() + ' kW'
                                    }
                                    statArrow={
                                        getStats(Statistics.year)?.now > getStats(Statistics.year)?.before
                                            ? 'up'
                                            : 'down'
                                    }
                                    statPercent={differencePercentCalculation(getStats(Statistics.year)) + ' %'}
                                    statPercentColor={
                                        getStats(Statistics.year)?.now > getStats(Statistics.year)?.before
                                            ? 'text-emerald-500'
                                            : 'text-red-500'
                                    }
                                    statDescripiron="Od lanskega leta"
                                    statIconName="bolt"
                                    statIconColor="bg-red-500"
                                />
                            )) || <CardSkeleton />}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
