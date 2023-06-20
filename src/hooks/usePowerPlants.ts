import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { PowerPlant } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlants = () => {
    const { data, mutate, error, isLoading } = useSWR<PowerPlant[], ApiResponseError>(CacheKey.POWER_PLANTS, () =>
        PowerPlantsService.getPowerPlants()
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        powerPlants: data,
        powerPlantsMutate: mutate,
        powerPlantsError: error,
        powerPlantsLoading: isLoading,
    };
};

export default usePowerPlants;
