import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PowerPlantProduction } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantProduction = (powerPlantIds?: string[]) => {
    const { data, error, isLoading } = useSWR<PowerPlantProduction[], ApiError>(
        () => powerPlantIds?.map((powerPlantId) => `${CacheKey.POWER_PLANTS_PRODUCTION}_${powerPlantId}`)?.join(),
        () => PowerPlantsService.getPowerPlantProduction(powerPlantIds ?? [])
    );

    return {
        powerPlantProduction: data,
        powerPlantProductionError: error,
        powerPlantProductionLoading: isLoading,
    };
};

export default usePowerPlantProduction;
