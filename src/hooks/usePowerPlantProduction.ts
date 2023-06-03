import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PowerPlantProduction } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantProduction = (powerPlantIds?: string[], dateFrom?: Date, dateTo?: Date) => {
    const { data, error, isLoading } = useSWR<PowerPlantProduction[], ApiError>(
        () =>
            powerPlantIds
                ?.map((powerPlantId) => {
                    let cacheKey = `${CacheKey.POWER_PLANTS_PRODUCTION}_${powerPlantId}`;

                    if (dateFrom) {
                        cacheKey += dateFrom.toISOString();
                    }

                    if (dateTo) {
                        cacheKey += dateTo.toISOString();
                    }
                    return cacheKey;
                })
                ?.join(),
        () => PowerPlantsService.getPowerPlantProduction(powerPlantIds ?? [], dateFrom, dateTo)
    );

    return {
        powerPlantProduction: data,
        powerPlantProductionError: error,
        powerPlantProductionLoading: isLoading,
    };
};

export default usePowerPlantProduction;
