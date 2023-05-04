import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { dateRangeOptions } from '@/types/common.types';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import { useEffect, useState } from 'react';

export default function ChartHistoryProduction() {
    const { powerPlantProduction, powerPlantProductionLoading } = usePowerPlantProduction();

    const [productionSum, setProductionSum] = useState(0);
    const [dateRange, setDateRange] = useState<any>();

    useEffect(() => {
        setProductionSum(
            powerPlantProduction
                ?.flat()
                ?.map((x) => x.DEM_Zlatolicje)
                ?.reduce((sum, current) => sum + +current, 0)
                .toFixed(3) ?? 0
        );
    }, [powerPlantProduction]);

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                        {productionSum} kWh
                    </span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                        Pregled proizvodnje za pretekli mesec
                    </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-sm text-gray-500 dark:text-gray-400">
                    Osveženo 5 minut nazaj
                </div>
            </div>
            {(!powerPlantProductionLoading && powerPlantProduction && powerPlantProduction?.length > 0 && (
                <ChartLine
                    dataset={[
                        {
                            name: 'Proizvodnja Zlatolicje',
                            data: [
                                ...powerPlantProduction
                                    ?.flat()
                                    ?.sort((a: any, b: any) => `${a.Date}${a.Time}`.localeCompare(`${b.Date}${b.Time}`))
                                    ?.map((d: any) => ({ x: new Date(`${d.Date}T${d.Time}`), y: d.DEM_Zlatolicje })),
                            ],
                            color: '#1A56DB',
                        },
                        {
                            name: 'Proizvodnja Formin',
                            data: [
                                ...powerPlantProduction
                                    ?.flat()
                                    ?.sort((a: any, b: any) => `${a.Date}${a.Time}`.localeCompare(`${b.Date}${b.Time}`))
                                    ?.map((d: any) => ({ x: new Date(`${d.Date}T${d.Time}`), y: d.DEM_Formin })),
                            ],
                            color: '#FDBA8C',
                        },
                        {
                            name: 'Proizvodnje MB Otok Uprava',
                            data: [
                                ...powerPlantProduction
                                    ?.flat()
                                    ?.sort((a: any, b: any) => `${a.Date}${a.Time}`.localeCompare(`${b.Date}${b.Time}`))
                                    ?.map((d: any) => ({
                                        x: new Date(`${d.Date}T${d.Time}`),
                                        y: d.DEM_MB_Otok_Uprava,
                                    })),
                            ],
                            color: '#047857',
                        },
                        {
                            name: 'Proizvodnje Dravograd',
                            data: [
                                ...powerPlantProduction
                                    ?.flat()
                                    ?.sort((a: any, b: any) => `${a.Date}${a.Time}`.localeCompare(`${b.Date}${b.Time}`))
                                    ?.map((d: any) => ({
                                        x: new Date(`${d.Date}T${d.Time}`),
                                        y: d.DEM_Dravograd,
                                    })),
                            ],
                            color: '#facc15',
                        },
                    ]}
                    displayRange={{
                        min: dateRange?.range?.from?.getTime() ?? new Date('2022-07-01').getTime(),
                        max: dateRange?.range?.to?.getTime() ?? new Date('2022-07-30T23:59').getTime(),
                    }}
                />
            )) || <ChartSkeleton />}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                <Dropdown
                    label={
                        <span className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            {dateRange ? dateRange?.label : 'Pretekli mesec'}
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
            </div>
        </div>
    );
}
