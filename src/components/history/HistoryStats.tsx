import { DateType } from '@/types/common.types';
import { PowerPlantProduction } from '@/types/power-plant.type';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { formatWatts } from '../Charts/utils/watt-unit-transformation';
import CardStatsBasic from '../Cards/CardStatsBasic';

interface Props {
    powerPlantProduction: PowerPlantProduction[] | undefined;
    dateRange: { label: string; range: { from: Date; to: Date }; type: DateType };
}

export default function HistoryStats({ powerPlantProduction, dateRange }: Props) {
    const [productionSum, setProductionSum] = useState<number>(0);
    const [selectedPeriodProductionSum, setSelectedPeriodProductionSum] = useState<number>(0);

    useEffect(() => {
        setProductionSum(
            powerPlantProduction
                ?.flat()
                ?.map((x: any) => x.power)
                ?.reduce((sum: any, current: any) => sum + +current * 0.25, 0) ?? 0
        );
    }, [powerPlantProduction]);

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
                ?.reduce((sum: any, current: any) => sum + +current * 0.25, 0) ?? 0
        );
    }, [powerPlantProduction, dateRange]);

    return (
        <>
            <div className="flex justify-start mb-4 ml-4">
                <CardStatsBasic
                    title="Proizvodnja v celotni obratovalni dobi"
                    value={formatWatts(Number(productionSum), 1000, 'Wh')}
                />
                <CardStatsBasic
                    title="Proizvodnja za trenutno izbrano obdobje"
                    value={formatWatts(Number(selectedPeriodProductionSum), 1000, 'Wh')}
                    dateRange={dateRange}
                />
            </div>
        </>
    );
}
