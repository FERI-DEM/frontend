import { useEffect, useState } from 'react';
import CommunityChart from './CommunityChart';
import { AggregationType, DateRangeOption, DateType, dateRangeOptions } from '@/types/common.types';
import moment from 'moment';
import { PowerPlantProduction, PredictedValue } from '@/types/power-plant.type';
import { Dropdown } from 'flowbite-react';
import { aggregationByDay, aggregationByHour, aggregationByMonth } from '../Charts/utils/data-aggregation';

interface Props {
    powerPlantProduction: PowerPlantProduction[] | undefined;
    powerPlantPrediction: PredictedValue[] | undefined;
    loading?: boolean;
}

export default function CommunityDashboard({ powerPlantProduction, powerPlantPrediction, loading }: Props) {
    const [dateRangeAvailableOptions, setDateRangeAvailableOptions] = useState<DateRangeOption[]>(
        dateRangeOptions(undefined, {
            from: moment().add(-7, 'day').startOf('day').toDate(),
            to: moment().add(7, 'day').endOf('day').toDate(),
        })
    );
    const [dateRange, setDateRange] = useState<{ label: string; range: { from: Date; to: Date }; type: DateType }>({
        label: dateRangeAvailableOptions[0].label,
        range: dateRangeAvailableOptions[0].callback(),
        type: dateRangeAvailableOptions[0].type,
    });

    const [predictions, setPredictions] = useState<{ x: Date; y: number }[]>([]);
    const [actualProduction, setActualProduction] = useState<{ x: Date; y: number }[]>([]);
    const [todayProductionPrediction, setTodayProductionPrediction] = useState<number>(0);
    const [productionSum, setProductionSum] = useState<number>(0);

    useEffect(() => {
        setProductionSum(
            powerPlantProduction
                ?.flat()
                ?.map((x: any) => x.power)
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantProduction]);

    useEffect(() => {
        const mergeAndSumSameDates = Array.from(
            (powerPlantPrediction ?? []).reduce(
                (m, { date, power }) => m.set(date, (m.get(date) || 0) + power),
                new Map()
            ),
            ([date, power]) => ({ date, power })
        );
        if (powerPlantPrediction) {
            setPredictions(
                mergeAndSumSameDates
                    ?.sort((a: PredictedValue, b: PredictedValue) => `${a.date}`.localeCompare(`${b.date}`))
                    ?.map((d: PredictedValue) => ({
                        x: new Date(d.date),
                        y: +d.power,
                    }))
            );
            setTodayProductionPrediction(
                mergeAndSumSameDates
                    ?.filter((x: PredictedValue) => moment(x.date).isSame(new Date(), 'day'))
                    ?.reduce((sum, value) => sum + +value.power, 0)
            );
        }
    }, [powerPlantPrediction, dateRange]);

    useEffect(() => {
        const mergeAndSumSameDates = Array.from(
            (powerPlantProduction ?? []).reduce(
                (map, { powerPlantId, timestamp, predictedPower, solar }) =>
                    map.set(`${timestamp}`, {
                        solar: map.get(`${timestamp}`)?.solar || solar,
                        power: (map.get(`${timestamp}`)?.power || 0) + predictedPower,
                        timestamp,
                    }),
                new Map()
            ),
            ([key, value]) => ({ timestamp: value?.timestamp, power: value?.power, solar: value?.solar })
        )
            ?.flat()
            ?.sort((a: any, b: any) => `${a.timestamp}`.localeCompare(`${b.timestamp}`))
            ?.filter((x) => {
                return (
                    new Date(x.timestamp).getTime() > dateRange?.range?.from?.getTime() &&
                    new Date(x.timestamp).getTime() < dateRange?.range?.to?.getTime()
                );
            });

        if (powerPlantProduction) {
            setActualProduction(
                (mergeAndSumSameDates ?? [])?.map((d: any) => ({
                    x: new Date(d.timestamp),
                    y: +d.power,
                }))
            );
        }
    }, [powerPlantProduction, dateRange]);

    const previousRange = () => {
        const from = moment(dateRange.range.from);
        const to = moment(dateRange.range.to);
        const difference = from.diff(to);

        setDateRange({
            label: 'Obdobje po meri',
            range: {
                from: from.add(difference).toDate(),
                to: to.add(difference).toDate(),
            },
            type: dateRange.type,
        });
    };

    const nextRange = () => {
        const from = moment(dateRange.range.from);
        const to = moment(dateRange.range.to);
        const difference = to.diff(from);

        setDateRange({
            label: 'Obdobje po meri',
            range: {
                from: from.add(difference).toDate(),
                to: to.add(difference).toDate(),
            },
            type: dateRange.type,
        });
    };

    const dataAggregationByScope = (powerPlantProduction: PowerPlantProduction[]) => {
        let aggregatedData = [
            ...powerPlantProduction.filter(
                (x) =>
                    new Date(x.timestamp).getTime() >= dateRange?.range?.from.getTime() &&
                    new Date(x.timestamp).getTime() <= dateRange?.range?.to.getTime()
            ),
        ];

        if ([DateType.CurrentMonth, DateType.LastMonth, DateType.Default].some((x) => x == dateRange?.type)) {
            aggregatedData = aggregationByDay(aggregatedData, AggregationType.Sum);
        } else if ([DateType.CurrentYear, DateType.LastYear].some((x) => x == dateRange?.type)) {
            aggregatedData = aggregationByMonth(aggregatedData, AggregationType.Sum);
        } else if ([DateType.CurrentWeek, DateType.LastWeek, DateType.NextWeek].some((x) => x == dateRange?.type)) {
            aggregatedData = aggregationByHour(aggregatedData, AggregationType.Sum);
        } else if ([DateType.Today, DateType.Yesterday, DateType.Tomorrow].some((x) => x == dateRange?.type)) {
            aggregatedData = aggregationByHour(aggregatedData, AggregationType.Sum);
        }

        return aggregatedData;
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                        Skupna poizvodnja skupnosti
                    </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-sm text-gray-500 dark:text-gray-400">
                    Osveženo 5 minut nazaj
                </div>
            </div>

            <div>
                <CommunityChart
                    actualProduction={actualProduction}
                    predictions={predictions}
                    dateRange={dateRange}
                    loading={loading}
                />
            </div>

            <div>
                <button
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-3 py-2 text-xs text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    title="Nazaj"
                    onClick={() => previousRange()}
                >
                    <span className="material-symbols-rounded material-font-size-xs">arrow_back_ios</span>
                    <span className="sr-only">Nazaj</span>
                </button>
                <button
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-3 py-2 text-xs text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    title="Naprej"
                    onClick={() => nextRange()}
                >
                    <span className="material-symbols-rounded material-font-size-xs">arrow_forward_ios</span>
                    <span className="sr-only">Naprej</span>
                </button>
                <button
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-3 py-2 text-xs text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    title="Privzeti pogled"
                    onClick={() =>
                        setDateRange({
                            label: dateRangeAvailableOptions[0].label,
                            range: dateRangeAvailableOptions[0].callback(),
                            type: dateRangeAvailableOptions[0].type,
                        })
                    }
                >
                    <span className="material-symbols-rounded material-font-size-xs">home</span>
                    <span className="sr-only">Privzeti pogled</span>
                </button>
            </div>

            <div className="flex items-center pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
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
                                onClick={() =>
                                    setDateRange({ label: data.label, range: data.callback(), type: data.type })
                                }
                            >
                                {data.label}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
            </div>
        </div>
    );
}
