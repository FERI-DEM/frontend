import ChartLine from './ChartLine';
import { Dropdown } from 'flowbite-react';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { dateRangeOptions } from '@/types/common.types';
import usePowerPlantProduction from '@/hooks/usePowerPlantProduction';
import { useEffect, useState } from 'react';
import { PowerPlantProduction } from '@/types/power-plant.type';
import usePowerPlants from '@/hooks/usePowerPlants';

export default function ChartHistoryProduction() {
  const { powerPlants, powerPlantsLoading } = usePowerPlants();
  const { powerPlantProduction, powerPlantProductionError, powerPlantProductionLoading } = usePowerPlantProduction(
    powerPlants?.map((x) => x._id)
  );

  const [productionSum, setProductionSum] = useState(0);
  const [dateRange, setDateRange] = useState<any>();

  useEffect(() => {
    setProductionSum(
      powerPlantProduction
        ?.flat()
        ?.map((x: any) => x.power)
        ?.reduce((sum: any, current: any) => sum + +current, 0)
        .toFixed(2) ?? 0
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
      {(!powerPlantProductionLoading && !powerPlantProductionError && (
        <ChartLine
          dataset={(powerPlants ?? [])?.map((powerPlant) => {
            const COLOR_PALETTE = [
              '#1A56DB',
              '#FDBA8C',
              '#047857',
              '#facc15',
              '#F98080',
              '#E3A008',
              '#6875F5',
              '#9061F9',
              '#E74694',
            ];
            return {
              name: `Proizvodnja ${powerPlant.displayName}`,
              data: [
                ...(powerPlantProduction ?? [])
                  ?.flat()
                  ?.filter((x) => x.power_plant_id === powerPlant._id)
                  ?.sort((a: PowerPlantProduction, b: PowerPlantProduction) =>
                    `${a.timestamp}`.localeCompare(`${b.timestamp}`)
                  )
                  ?.map((d: PowerPlantProduction) => ({ x: new Date(`${d.timestamp}`), y: d.power })),
              ],
              color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE?.length)],
            };
          })}
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
              {dateRange ? dateRange?.label : 'Pretekli mesec'}
              <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
            </span>
          }
          arrowIcon={false}
          inline={true}
        >
          {dateRangeOptions([0]).map((data, index) => {
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
