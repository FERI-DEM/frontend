import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { PredictedValue } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantPrediction = (powerPlantId: string) => {
    const { data, error, isLoading } = useSWR<PredictedValue[], ApiResponseError>(
        `${CacheKey.PREDICTION}_${powerPlantId}`,
        () => PowerPlantsService.getPrediction(powerPlantId)
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        powerPlantPrediction: data,
        powerPlantPredictionError: error,
        powerPlantPredictionLoading: isLoading,
    };
};

export default usePowerPlantPrediction;
