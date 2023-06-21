import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { PowerPlantStatistics, Statistics } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantStatistics = (types: Statistics[], powerPlantIds?: string[]) => {
    const { data, error, isLoading } = useSWR<PowerPlantStatistics[], ApiResponseError>(
        () =>
            powerPlantIds?.map((powerPlantId) => `${CacheKey.POWER_PLANTS_STATISTIC}_${powerPlantId}_${types?.join()}`),
        async () => {
            if (powerPlantIds) {
                const result = await Promise.all(
                    powerPlantIds?.map((powerPlantId) => PowerPlantsService.getPowerPlantStatistic(powerPlantId, types))
                );
                return result.flat();
            }
            return Promise.reject();
        }
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        powerPlantStatistics: data,
        powerPlantStatisticsError: error,
        powerPlantStatisticsLoading: isLoading,
    };
};

export default usePowerPlantStatistics;
