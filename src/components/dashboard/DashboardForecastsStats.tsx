import { useEffect, useState } from 'react';
import CardStatsBasic from '../Cards/CardStatsBasic';
import { DateType } from '@/types/common.types';
import { formatWatts } from '../Charts/utils/watt-unit-transformation';
import moment from 'moment';

interface Props {
    powerPlantPrediction: { x: Date; y: number }[] | undefined;
    dateRange: { label: string; range: { from: Date; to: Date }; type?: DateType };
}

export default function DashboardForecastsStats({ powerPlantPrediction, dateRange }: Props) {
    const [selectedPeriodPredictionSum, setSelectedPeriodPredictionSum] = useState<number>(0);
    const [predictionTodaySum, setpredictionTodaySum] = useState<number>(0);

    useEffect(() => {
        setpredictionTodaySum(
            powerPlantPrediction
                ?.filter((x) => moment(x.x).isSame(new Date(), 'day'))
                ?.reduce((sum, value) => sum + +value.y, 0) ?? 0
        );
    }, [powerPlantPrediction, dateRange]);

    useEffect(() => {
        setSelectedPeriodPredictionSum(
            powerPlantPrediction
                ?.filter(
                    (x) =>
                        new Date(x.x).getTime() >= dateRange?.range?.from.getTime() &&
                        new Date(x.x).getTime() <= dateRange?.range?.to.getTime()
                )
                ?.map((x: any) => x.y)
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantPrediction, dateRange]);

    return (
        <>
            <div className="flex flex-wrap justify-start">
                <CardStatsBasic
                    title="Napoved proizvodnje za izbrano obdobje"
                    value={formatWatts(Number(selectedPeriodPredictionSum))}
                />
                <CardStatsBasic
                    title="Predvidena proizvodnja do konca dneva"
                    value={formatWatts(Number(predictionTodaySum))}
                />
            </div>
        </>
    );
}
