import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import useSWR from 'swr';

const usePowerPlantProduction = () => {
  const { data, error, isLoading } = useSWR<any[], ApiError>(CacheKey.POWER_PLANTS_PRODUCTION, () =>
    PowerPlantsService.getPowerPlantProduction()
  );

  return {
    powerPlantProduction: data,
    powerPlantProductionError: error,
    powerPlantProductionLoading: isLoading,
  };
};

export default usePowerPlantProduction;
