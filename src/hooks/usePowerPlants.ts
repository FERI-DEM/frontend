import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PowerPlant } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlants = () => {
  const { data, error, isLoading } = useSWR<PowerPlant[], ApiError>(CacheKey.POWER_PLANTS, () =>
    PowerPlantsService.getPowerPlants()
  );

  return {
    powerPlants: data,
    powerPlantsError: error,
    powerPlantsLoading: isLoading,
  };
};

export default usePowerPlants;
