import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { DateRangeOption, DateType, dateRangeOptions } from '@/types/common.types';
import { useEffect, useState } from 'react';
import { PowerPlant, PowerPlantProduction, PredictedValue } from '@/types/power-plant.type';
import moment from 'moment';
import { useRouter } from 'next/router';
import { addMissingDates } from './utils/data-aggregation';
import PowerPlantSelector from '../dashboard/PowerPlantSelector';
import DashboardForecastsStats from '../dashboard/DashboardForecastsStats';

interface Props {
    powerPlants: PowerPlant[] | undefined;
    powerPlantProduction: PowerPlantProduction[] | undefined;
    powerPlantPrediction: PredictedValue[] | undefined;
    loading?: boolean;
    selectedPowerPlantOutput: (output: PowerPlant) => void;
}

export default function ChartDashboardForecasts({
    powerPlants,
    powerPlantProduction,
    powerPlantPrediction,
    loading,
    selectedPowerPlantOutput,
}: Props) {
    const router = useRouter();
    const [predictions, setPredictions] = useState<{ x: Date; y: number }[]>([]);
    const [actualProduction, setActualProduction] = useState<{ x: Date; y: number }[]>([]);
    const [radiation, setRadiation] = useState<{ x: Date; y: number }[]>([]);
    const [dateRangeAvailableOptions, setDateRangeAvailableOptions] = useState<DateRangeOption[]>(
        dateRangeOptions(
            [
                DateType.Default,
                DateType.Today,
                DateType.Tomorrow,
                DateType.Yesterday,
                DateType.CurrentWeek,
                DateType.NextWeek,
                DateType.LastWeek,
            ],
            { from: moment().add(-1, 'day').toDate(), to: moment().add(1, 'day').endOf('day').toDate() }
        )
    );
    const [dateRange, setDateRange] = useState<{ label: string; range: { from: Date; to: Date } }>({
        label: dateRangeAvailableOptions[0].label,
        range: dateRangeAvailableOptions[0].callback(),
    });
    const [selectedPowerPlant, setSelectedPowerPlant] = useState<PowerPlant>();

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
        }
    }, [powerPlantPrediction, dateRange]);

    useEffect(() => {
        const mergeAndSumSameDates = Array.from(
            (powerPlantProduction ?? []).reduce(
                (map, { powerPlantId, timestamp, predictedPower, solar }) =>
                    map.set(`${powerPlantId}_${timestamp}`, {
                        solar: map.get(`${powerPlantId}_${timestamp}`)?.solar || solar,
                        power: map.get(`${powerPlantId}_${timestamp}`)?.power || predictedPower,
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
            setRadiation(
                (mergeAndSumSameDates ?? [])?.map((d: any) => ({
                    x: new Date(d.timestamp),
                    y: +d.solar,
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
        });
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
                <div>
                    <PowerPlantSelector
                        powerPlants={powerPlants}
                        selectedPowerPlantOutput={(data) => {
                            setSelectedPowerPlant(data);
                            selectedPowerPlantOutput(data);
                        }}
                    />
                </div>
                <DashboardForecastsStats powerPlantPrediction={predictions} dateRange={dateRange} />
            </div>
            <div></div>
            {(!loading && (
                <ChartLine
                    dataset={[
                        {
                            name: 'Proizvodnja',
                            data: [...(addMissingDates(actualProduction, predictions) ?? [])],
                            color: '#1A56DB',
                            type: 'area',
                        },
                        {
                            name: 'Napoved proizvodnje',
                            data: [...(addMissingDates(predictions, actualProduction) ?? [])],
                            color: '#FDBA8C',
                            type: 'area',
                        },
                        {
                            name: 'Sončna radiacija',
                            data: [...(addMissingDates(radiation, predictions) ?? [])],
                            color: '#FF1654',
                            type: 'area',
                        },
                    ]}
                    displayRange={{
                        min: dateRange?.range?.from?.getTime(),
                        max: dateRange?.range?.to?.getTime(),
                    }}
                    isDashboard={true}
                    isEnabledAnimation={false}
                />
            )) || <ChartSkeleton />}

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
                        })
                    }
                >
                    <span className="material-symbols-rounded material-font-size-xs">home</span>
                    <span className="sr-only">Privzeti pogled</span>
                </button>
            </div>

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
                    <button
                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                        onClick={() => router.push('/dashboard/history')}
                    >
                        POROČILO PROIZVODNJE
                        <span className="material-symbols-rounded w-6 h-6">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
