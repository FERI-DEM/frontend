import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { dateRangeOptions } from '@/types/common.types';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import usePowerPlants from '@/hooks/usePowerPlants';
import { useEffect, useState } from 'react';
import { PredictedValue } from '@/types/power-plant.type';
import PowerPlantsService from '@/api/power-plants.service';

export default function ChartDashboardForecasts() {
    const { powerPlantProduction, powerPlantProductionLoading } = usePowerPlantProduction();
    const { powerPlants, powerPlantsLoading } = usePowerPlants();
    const [predictions, setPredictions] = useState<{ x: Date; y: number }[]>();
    const [dateRange, setDateRange] = useState<any>(dateRangeOptions[0]);

    useEffect(() => {
        if (!powerPlantsLoading && powerPlants && powerPlants[0].calibration && powerPlants[0].calibration.length > 0) {
            PowerPlantsService.getPrediction(powerPlants[0]._id).then((powerPlantPrediction) => {
                setPredictions(
                    powerPlantPrediction
                        ?.sort((a: PredictedValue, b: PredictedValue) => `${a.date}`.localeCompare(`${b.date}`))
                        ?.map((d: PredictedValue) => ({ x: new Date(`${d.date}`), y: +d.power }))
                );
            });
        }
    }, [powerPlants]);

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                        100 kWh
                    </span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                        Proizvodnja za tekoči teden
                    </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-sm text-gray-500 dark:text-gray-400">
                    Osveženo 5 minut nazaj
                </div>
            </div>
            {(!powerPlantProductionLoading && powerPlantProduction && powerPlantProduction?.length > 0 && (
                <ChartLine
                    dataset={[
                        // {
                        //     name: 'Dejanska proizvodnja',
                        //     data: [
                        //         ...powerPlantProduction
                        //             ?.flat()
                        //             ?.sort((a: any, b: any) => `${a.Date}${a.Time}`.localeCompare(`${b.Date}${b.Time}`))
                        //             ?.map((d: any) => ({ x: new Date(`${d.Date}T${d.Time}`), y: d.DEM_Zlatolicje })),
                        //     ],
                        //     color: '#1A56DB',
                        // },
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
                    {dateRangeOptions.map((data, index) => {
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
