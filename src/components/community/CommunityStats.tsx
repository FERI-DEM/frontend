import { useEffect, useState } from 'react';
import moment from 'moment';
import CardStatsBasic from '../Cards/CardStatsBasic';
import { DateType } from '@/types/common.types';
import { PowerPlantProduction, PredictedValue } from '@/types/power-plant.type';
import { formatWatts } from '../Charts/utils/watt-unit-transformation';

interface Props {
    powerPlantProduction: PowerPlantProduction[] | undefined;
    powerPlantPrediction: PredictedValue[] | undefined;
    dateRange: { label: string; range: { from: Date; to: Date }; type: DateType };
}

export default function CommunityStats({ powerPlantProduction, powerPlantPrediction, dateRange }: Props) {
    const [selectedPeriodProductionSum, setSelectedPeriodProductionSum] = useState<number>(0);
    const [selectedPeriodPredictionSum, setSelectedPeriodPredictionSum] = useState<number>(0);

    useEffect(() => {
        setSelectedPeriodProductionSum(
            powerPlantProduction
                ?.filter(
                    (x) =>
                        new Date(x.timestamp).getTime() >= dateRange?.range?.from.getTime() &&
                        new Date(x.timestamp).getTime() <= dateRange?.range?.to.getTime()
                )
                ?.map(
                    (x: any) =>
                        x.power || (moment(new Date(+x.timestamp)).isAfter('2023-03-01', 'day') && x.predictedPower)
                )
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantProduction, dateRange]);

    useEffect(() => {
        setSelectedPeriodPredictionSum(
            powerPlantPrediction
                ?.filter(
                    (x) =>
                        new Date(x.date).getTime() >= dateRange?.range?.from.getTime() &&
                        new Date(x.date).getTime() <= dateRange?.range?.to.getTime()
                )
                ?.map((x: any) => x.power)
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantPrediction, dateRange]);

    return (
        <>
            <div className="flex justify-start mb-4 ml-4">
                <CardStatsBasic
                    title="Proizvodnja za izbrano obdobje"
                    value={formatWatts(Number(selectedPeriodProductionSum))}
                    dateRange={dateRange}
                />
                <CardStatsBasic
                    title="Trenutna napoved proizvodnje za izbrano obdobje"
                    value={formatWatts(Number(selectedPeriodPredictionSum))}
                    dateRange={dateRange}
                />
            </div>
        </>
    );
}
