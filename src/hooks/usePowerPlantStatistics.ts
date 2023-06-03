import PowerPlantsService from '@/api/power-plants.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { PowerPlantStatistics, Statistics } from '@/types/power-plant.type';
import useSWR from 'swr';

const usePowerPlantStatistics = (types: Statistics[], powerPlantIds?: string[]) => {
    const { data, error, isLoading } = useSWR<PowerPlantStatistics[], ApiError>(
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

    return {
        powerPlantStatistics: data,
        powerPlantStatisticsError: error,
        powerPlantStatisticsLoading: isLoading,
    };
};

export default usePowerPlantStatistics;
