import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { PowerPlant } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlant = (powerPlantId: string) => {
    const { data, error, isLoading } = useSWR<PowerPlant, ApiResponseError>(
        `${CacheKey.POWER_PLANT}_${powerPlantId}`,
        () => PowerPlantsService.getPowerPlant(powerPlantId)
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        powerPlant: data,
        powerPlantError: error,
        powerPlantLoading: isLoading,
    };
};

export default usePowerPlant;
