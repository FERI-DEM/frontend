import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { DateRangeOption, dateRangeOptions } from '@/types/common.types';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import usePowerPlants from '@/hooks/usePowerPlants';
import { useEffect, useState } from 'react';
import { PredictedValue } from '@/types/power-plant.type';
import moment from 'moment';
import usePrediction from '@/hooks/usePrediction';

export default function ChartDashboardForecasts() {
    const { powerPlants, powerPlantsLoading } = usePowerPlants();
    const { powerPlantProduction, powerPlantProductionError, powerPlantProductionLoading } = usePowerPlantProduction(
        powerPlants?.map((x) => x._id)
    );
    const { powerPlantPrediction, powerPlantPredictionError, powerPlantPredictionLoading } = usePrediction(
        powerPlants?.filter((x) => x.calibration && x.calibration.length > 0).map((x) => x._id)
    );
    const [predictions, setPredictions] = useState<{ x: Date; y: number }[]>([]);
    const [dateRangeAvailableOptions, setDateRangeAvailableOptions] = useState<DateRangeOption[]>(dateRangeOptions());
    const [dateRange, setDateRange] = useState<any>({
        label: dateRangeAvailableOptions[0].label,
        range: dateRangeAvailableOptions[0].callback(),
    });
    const [todayProductionPrediction, setTodayProductionPrediction] = useState<number>(0);

    useEffect(() => {
        const mergeAndSumSameDays = Array.from(
            (powerPlantPrediction ?? []).reduce(
                (m, { date, power }) => m.set(date, (m.get(date) || 0) + power),
                new Map()
            ),
            ([date, power]) => ({ date, power })
        );
        if (powerPlantPrediction) {
            setPredictions(
                mergeAndSumSameDays
                    ?.sort((a: PredictedValue, b: PredictedValue) => `${a.date}`.localeCompare(`${b.date}`))
                    ?.map((d: PredictedValue) => ({ x: new Date(`${d.date}`), y: +d.power }))
            );
            setTodayProductionPrediction(
                mergeAndSumSameDays
                    ?.filter((x: PredictedValue) => moment(x.date).isSame(new Date(), 'day'))
                    ?.reduce((sum, value) => sum + +value.power, 0)
            );
        }
    }, [powerPlantPrediction]);

    const actualProduction = () => {
        const mergeAndSumSameDays = Array.from(
            (powerPlantProduction ?? []).reduce(
                (m, { timestamp, power }) => m.set(timestamp, (m.get(timestamp) || 0) + power),
                new Map()
            ),
            ([timestamp, power]) => ({ timestamp, power })
        );
        return [
            ...(mergeAndSumSameDays ?? [])
                ?.flat()
                ?.sort((a: any, b: any) => `${a.timestamp}`.localeCompare(`${b.timestamp}`))
                ?.filter((x) => {
                    return (
                        new Date(x.timestamp).getTime() > dateRange.range.from.getTime() &&
                        new Date(x.timestamp).getTime() < dateRange.range.to.getTime()
                    );
                })
                ?.map((d: any) => ({
                    x: new Date(`${d.timestamp}`),
                    y: d.power,
                })),
        ];
    };
    const historyPredictions = () => {
        const mergeAndSumSameDays = Array.from(
            (powerPlantProduction ?? []).reduce(
                (m, { timestamp, predictedPower }) => m.set(timestamp, (m.get(timestamp) || 0) + predictedPower),
                new Map()
            ),
            ([timestamp, predictedPower]) => ({ timestamp, predictedPower })
        );
        return [
            ...(mergeAndSumSameDays ?? [])
                ?.flat()
                ?.sort((a: any, b: any) => `${a.timestamp}`.localeCompare(`${b.timestamp}`))
                ?.filter((x) => {
                    return (
                        new Date(x.timestamp).getTime() > dateRange.range.from.getTime() &&
                        new Date(x.timestamp).getTime() < dateRange.range.to.getTime()
                    );
                })
                ?.map((d: any) => ({
                    x: new Date(`${d.timestamp}`),
                    y: d.predictedPower,
                })),
        ];
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                        {todayProductionPrediction.toFixed(2)} kW
                    </span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                        Proizvodnja za tekoči teden
                    </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-sm text-gray-500 dark:text-gray-400">
                    Osveženo 5 minut nazaj
                </div>
            </div>
            {(!powerPlantPredictionLoading &&
                !powerPlantPredictionError &&
                !powerPlantProductionLoading &&
                !powerPlantProductionError && (
                    <ChartLine
                        dataset={[
                            {
                                name: 'Zgodovina napovedi',
                                data: [...historyPredictions()],
                                color: '#FDBA8C',
                            },
                            {
                                name: 'Dejanska proizvodnja',
                                data: [...actualProduction()],
                                color: '#1A56DB',
                            },
                            {
                                name: 'Napoved proizvodnje',
                                data: [...(predictions ?? [])],
                                color: '#FDBA8C',
                            },
                        ]}
                        displayRange={{
                            min: dateRange?.range?.from?.getTime(),
                            max: dateRange?.range?.to?.getTime(),
                        }}
                    />
                )) || <ChartSkeleton />}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                <Dropdown
                    label={
                        <span className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            {dateRange?.label}
                            <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
                        </span>
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    {dateRangeAvailableOptions.map((data, index) => {
                        return (
                            <Dropdown.Item
                                key={`${data.label}${index}`}
                                onClick={() => setDateRange({ label: data.label, range: data.callback() })}
                            >
                                {data.label}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
                <div className="flex-shrink-0">
                    <button className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                        POROČILO PROIZVODNJE
                        <span className="material-symbols-rounded w-6 h-6">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
