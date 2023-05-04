import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PredictedValue } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantPrediction = (powerPlantId: string) => {
    const { data, error, isLoading } = useSWR<PredictedValue[], ApiError>(
        `${CacheKey.PREDICTION}_${powerPlantId}`,
        () => PowerPlantsService.getPrediction(powerPlantId)
    );

    return {
        powerPlantPrediction: data,
        powerPlantPredictionError: error,
        powerPlantPredictionLoading: isLoading,
    };
};

export default usePowerPlantPrediction;
