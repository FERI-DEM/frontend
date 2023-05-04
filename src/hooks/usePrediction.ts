import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PredictedValue } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePrediction = (powerPlantIds?: string[]) => {
  const { data, error, isLoading } = useSWR<PredictedValue[], ApiError>(
    () => powerPlantIds?.map((powerPlantId) => `${CacheKey.PREDICTION}_${powerPlantId}`),
    async () => {
      if (powerPlantIds) {
        const result = await Promise.all(
          powerPlantIds?.map((powerPlantId) => PowerPlantsService.getPrediction(powerPlantId))
        );
        return result.flat();
      }
      return Promise.reject();
    }
  );

  return {
    powerPlantPrediction: data,
    powerPlantPredictionError: error,
    powerPlantPredictionLoading: isLoading,
  };
};

export default usePrediction;
