import { DateType } from '@/types/common.types';
import { PowerPlantProduction } from '@/types/power-plant.type';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { formatWatts } from '../Charts/utils/watt-unit-transformation';

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
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
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
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantProduction, dateRange]);

    return (
        <>
            <div className="flex justify-start mb-4 ml-4">
                <div className="p-4 border-l-2">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-slate-400 uppercase font-light text-xs">
                                Proizvodnja v celotni obratovalni dobi
                            </h5>
                            <span className="font-semibold text-xl text-slate-700 dark:text-white">
                                {formatWatts(Number(productionSum))}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-l-2">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-slate-400 uppercase font-light text-xs">
                                Proizvodnja za trenutno izbrano obdobje: <br />
                                {moment(dateRange.range.from).format('DD.MM.YYYY')} -{' '}
                                {moment(dateRange.range.to).format('DD.MM.YYYY')}
                            </h5>
                            <span className="font-semibold text-xl text-slate-700 dark:text-white">
                                {formatWatts(Number(selectedPeriodProductionSum))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
