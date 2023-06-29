import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import {
    AggregationInterval,
    AggregationType,
    DateRangeOption,
    DateType,
    dateRangeOptions,
} from '@/types/common.types';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import { useEffect, useState } from 'react';
import { PowerPlantProduction } from '@/types/power-plant.type';
import usePowerPlants from '@/hooks/usePowerPlants';
import { aggregationByDay, aggregationByHour, aggregationByMonth, aggregationByWeek } from './utils/data-aggregation';
import moment from 'moment';

export default function ChartHistoryProduction() {
    const { powerPlants, powerPlantsLoading } = usePowerPlants();
    const { powerPlantProduction, powerPlantProductionError, powerPlantProductionLoading } = usePowerPlantProduction(
        powerPlants?.map((x) => x._id)
    );

    const [productionSum, setProductionSum] = useState<number>(0);
    const [dateRangeAvailableOptions, setDateRangeAvailableOptions] = useState<DateRangeOption[]>(
        dateRangeOptions(undefined, {
            from: moment().startOf('week').toDate(),
            to: moment().endOf('week').toDate(),
        })
    );
    const [dateRange, setDateRange] = useState<{ label: string; range: { from: Date; to: Date }; type: DateType }>({
        label: dateRangeAvailableOptions[0].label,
        range: dateRangeAvailableOptions[0].callback(),
        type: dateRangeAvailableOptions[0].type,
    });
    const [aggregationIntervalAvailableOptions, setAggregationIntervalAvailableOptions] = useState<
        { label: string; type: AggregationInterval }[]
    >([
        { label: 'Po uri', type: AggregationInterval.Hour },
        { label: 'Po dnevu', type: AggregationInterval.Day },
        { label: 'Po tednu', type: AggregationInterval.Week },
        { label: 'Po mesecu', type: AggregationInterval.Month },
    ]);
    const [selectedAggregationInterval, setSelectedAggregationInterval] = useState<{
        label: string;
        type: AggregationInterval;
    }>({ label: aggregationIntervalAvailableOptions[0].label, type: aggregationIntervalAvailableOptions[0].type });
    const [aggregationTypeAvailableOptions, setAggregationTypeAvailableOptions] = useState<
        { label: string; type: AggregationType }[]
    >([
        { label: 'Povprečje', type: AggregationType.Avg },
        { label: 'Vsota', type: AggregationType.Sum },
        { label: 'Maksimum', type: AggregationType.Max },
    ]);
    const [selectedAggregationType, setSelectedAggregationType] = useState<{
        label: string;
        type: AggregationType;
    }>({ label: aggregationTypeAvailableOptions[1].label, type: aggregationTypeAvailableOptions[1].type });

    useEffect(() => {
        setProductionSum(
            powerPlantProduction
                ?.flat()
                ?.map((x: any) => x.power)
                ?.reduce((sum: any, current: any) => sum + +current, 0) ?? 0
        );
    }, [powerPlantProduction]);

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

        if (selectedAggregationInterval.type === AggregationInterval.Hour) {
            aggregatedData = aggregationByHour(aggregatedData, selectedAggregationType.type);
        } else if (selectedAggregationInterval.type === AggregationInterval.Day) {
            aggregatedData = aggregationByDay(aggregatedData, selectedAggregationType.type);
        } else if (selectedAggregationInterval.type === AggregationInterval.Week) {
            aggregatedData = aggregationByWeek(aggregatedData, selectedAggregationType.type);
        } else if (selectedAggregationInterval.type === AggregationInterval.Month) {
            aggregatedData = aggregationByMonth(aggregatedData, selectedAggregationType.type);
        }

        return aggregatedData;
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                        {Number(productionSum.toFixed(2)).toLocaleString()} kW
                    </span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                        Proizvodnja v celotni obratovalni dobi
                    </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-sm text-gray-500 dark:text-gray-400">
                    Osveženo 5 minut nazaj
                </div>
            </div>
            {(!powerPlantProductionLoading && !powerPlantProductionError && (
                <ChartLine
                    dataset={(powerPlants ?? [])?.map((powerPlant) => {
                        const COLOR_PALETTE = [
                            '#E3A008',
                            '#E74694',
                            '#1A56DB',
                            '#FDBA8C',
                            '#047857',
                            '#facc15',
                            '#F98080',
                            '#6875F5',
                            '#9061F9',
                        ];
                        return {
                            name: `Proizvodnja ${powerPlant.displayName}`,
                            data: [
                                ...dataAggregationByScope(powerPlantProduction ?? [])
                                    ?.flat()
                                    ?.filter((x) => x.powerPlantId === powerPlant._id)
                                    ?.sort((a: PowerPlantProduction, b: PowerPlantProduction) =>
                                        `${a.timestamp}`.localeCompare(`${b.timestamp}`)
                                    )
                                    ?.map((d: PowerPlantProduction) => ({
                                        x: new Date(+d.timestamp),
                                        y:
                                            d.power ||
                                            (moment(new Date(+d.timestamp)).isAfter('2023-03-01', 'day') &&
                                                d.predictedPower),
                                    })),
                            ],
                            type: 'bar',
                            color: COLOR_PALETTE[(powerPlants ?? []).indexOf(powerPlant) % COLOR_PALETTE.length],
                        };
                    })}
                    displayRange={{
                        min: dateRange?.range?.from?.getTime(),
                        max: dateRange?.range?.to?.getTime(),
                    }}
                    isDashboard={false}
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
                            type: dateRangeAvailableOptions[0].type,
                        })
                    }
                >
                    <span className="material-symbols-rounded material-font-size-xs">home</span>
                    <span className="sr-only">Privzeti pogled</span>
                </button>
            </div>

            <div className="flex items-center justify-start pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                <Dropdown
                    label={
                        <span className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Obdobje: {dateRange?.label}
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
                <Dropdown
                    label={
                        <span className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Izbira prikaza podatkov: {selectedAggregationInterval?.label}
                            <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
                        </span>
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    {aggregationIntervalAvailableOptions.map((data, index) => {
                        return (
                            <Dropdown.Item
                                key={`${data.label}${index}`}
                                onClick={() => setSelectedAggregationInterval(data)}
                            >
                                {data.label}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
                <Dropdown
                    label={
                        <span className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Izbira tipa združevanja podatkov: {selectedAggregationType?.label}
                            <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
                        </span>
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    {aggregationTypeAvailableOptions.map((data, index) => {
                        return (
                            <Dropdown.Item
                                key={`${data.label}${index}`}
                                onClick={() => setSelectedAggregationType(data)}
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
