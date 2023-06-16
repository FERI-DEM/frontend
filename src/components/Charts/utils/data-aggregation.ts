import { AggregationType } from '@/types/common.types';
import { PowerPlantProduction } from '@/types/power-plant.type';
import moment from 'moment';

export const aggregationByDay = (powerPlantProduction: PowerPlantProduction[], aggregationType: AggregationType) => {
    const mergeAndSumSameDates = Array.from(
        (powerPlantProduction ?? []).reduce((map, powerPlantProduction) => {
            const key = `${powerPlantProduction?.powerPlantId}_${moment(powerPlantProduction?.timestamp)
                .startOf('day')
                .toDate()
                .getTime()}`;

            let calculations = {};
            if (aggregationType == AggregationType.Sum || aggregationType == AggregationType.Avg) {
                calculations = {
                    power: (map.get(key)?.power || 0) + +powerPlantProduction?.power,
                    predictedPower: (map.get(key)?.predictedPower || 0) + +powerPlantProduction?.predictedPower,
                    solar: (map.get(key)?.solar || 0) + +powerPlantProduction?.solar,
                };
            }
            if (aggregationType == AggregationType.Max) {
                calculations = {
                    power:
                        ((map.has(key) && map.get(key)?.power) || 0) < +powerPlantProduction?.power
                            ? +powerPlantProduction?.power
                            : (!map.has(key) && 0) || map.get(key)?.power,
                    predictedPower:
                        ((map.has(key) && map.get(key)?.predictedPower) || 0) < +powerPlantProduction?.predictedPower
                            ? +powerPlantProduction?.predictedPower
                            : (!map.has(key) && 0) || map.get(key)?.predictedPower,
                    solar:
                        ((map.has(key) && map.get(key)?.solar) || 0) < +powerPlantProduction?.solar
                            ? +powerPlantProduction?.solar
                            : (!map.has(key) && 0) || map.get(key)?.solar,
                };
            }

            return map.set(key, {
                ...powerPlantProduction,
                timestamp: moment(powerPlantProduction?.timestamp).startOf('day').toDate().getTime(),
                oldTimestamp: powerPlantProduction?.timestamp,
                dataCount: (map.get(key)?.dataCount || 0) + 1,
                ...calculations,
            });
        }, new Map()),
        ([key, value]) => {
            let calculations: any = {
                power: value?.power,
                predictedPower: value?.predictedPower,
                solar: value?.solar,
            };
            if (aggregationType == AggregationType.Avg) {
                calculations = {
                    power: value?.power / value?.dataCount,
                    predictedPower: value?.predictedPower / value?.dataCount,
                    solar: value?.solar / value?.dataCount,
                };
            }
            return {
                ...value,
                ...calculations,
            };
        }
    );
    return mergeAndSumSameDates ?? [];
};

export const aggregationByHour = (powerPlantProduction: PowerPlantProduction[], aggregationType: AggregationType) => {
    const mergeAndSumSameDates = Array.from(
        (powerPlantProduction ?? []).reduce((map, powerPlantProduction) => {
            const key = `${powerPlantProduction?.powerPlantId}_${moment(powerPlantProduction?.timestamp)
                .startOf('hour')
                .toDate()
                .getTime()}`;

            let calculations = {};
            if (aggregationType == AggregationType.Sum || aggregationType == AggregationType.Avg) {
                calculations = {
                    power: (map.get(key)?.power || 0) + +powerPlantProduction?.power,
                    predictedPower: (map.get(key)?.predictedPower || 0) + +powerPlantProduction?.predictedPower,
                    solar: (map.get(key)?.solar || 0) + +powerPlantProduction?.solar,
                };
            }
            if (aggregationType == AggregationType.Max) {
                calculations = {
                    power:
                        ((map.has(key) && map.get(key)?.power) || 0) < +powerPlantProduction?.power
                            ? +powerPlantProduction?.power
                            : (!map.has(key) && 0) || map.get(key)?.power,
                    predictedPower:
                        ((map.has(key) && map.get(key)?.predictedPower) || 0) < +powerPlantProduction?.predictedPower
                            ? +powerPlantProduction?.predictedPower
                            : (!map.has(key) && 0) || map.get(key)?.predictedPower,
                    solar:
                        ((map.has(key) && map.get(key)?.solar) || 0) < +powerPlantProduction?.solar
                            ? +powerPlantProduction?.solar
                            : (!map.has(key) && 0) || map.get(key)?.solar,
                };
            }

            return map.set(key, {
                ...powerPlantProduction,
                timestamp: moment(powerPlantProduction?.timestamp).startOf('hour').toDate().getTime(),
                oldTimestamp: powerPlantProduction?.timestamp,
                dataCount: (map.get(key)?.dataCount || 0) + 1,
                ...calculations,
            });
        }, new Map()),
        ([key, value]) => {
            let calculations: any = {
                power: value?.power,
                predictedPower: value?.predictedPower,
                solar: value?.solar,
            };
            if (aggregationType == AggregationType.Avg) {
                calculations = {
                    power: value?.power / value?.dataCount,
                    predictedPower: value?.predictedPower / value?.dataCount,
                    solar: value?.solar / value?.dataCount,
                };
            }
            return {
                ...value,
                ...calculations,
            };
        }
    );
    return mergeAndSumSameDates ?? [];
};

export const aggregationByWeek = (powerPlantProduction: PowerPlantProduction[], aggregationType: AggregationType) => {
    const mergeAndSumSameDates = Array.from(
        (powerPlantProduction ?? []).reduce((map, powerPlantProduction) => {
            const key = `${powerPlantProduction?.powerPlantId}_${moment(powerPlantProduction?.timestamp)
                .startOf('week')
                .toDate()
                .getTime()}`;

            let calculations = {};
            if (aggregationType == AggregationType.Sum || aggregationType == AggregationType.Avg) {
                calculations = {
                    power: (map.get(key)?.power || 0) + +powerPlantProduction?.power,
                    predictedPower: (map.get(key)?.predictedPower || 0) + +powerPlantProduction?.predictedPower,
                    solar: (map.get(key)?.solar || 0) + +powerPlantProduction?.solar,
                };
            }
            if (aggregationType == AggregationType.Max) {
                calculations = {
                    power:
                        ((map.has(key) && map.get(key)?.power) || 0) < +powerPlantProduction?.power
                            ? +powerPlantProduction?.power
                            : (!map.has(key) && 0) || map.get(key)?.power,
                    predictedPower:
                        ((map.has(key) && map.get(key)?.predictedPower) || 0) < +powerPlantProduction?.predictedPower
                            ? +powerPlantProduction?.predictedPower
                            : (!map.has(key) && 0) || map.get(key)?.predictedPower,
                    solar:
                        ((map.has(key) && map.get(key)?.solar) || 0) < +powerPlantProduction?.solar
                            ? +powerPlantProduction?.solar
                            : (!map.has(key) && 0) || map.get(key)?.solar,
                };
            }

            return map.set(key, {
                ...powerPlantProduction,
                timestamp: moment(powerPlantProduction?.timestamp).startOf('week').toDate().getTime(),
                oldTimestamp: powerPlantProduction?.timestamp,
                dataCount: (map.get(key)?.dataCount || 0) + 1,
                ...calculations,
            });
        }, new Map()),
        ([key, value]) => {
            let calculations: any = {
                power: value?.power,
                predictedPower: value?.predictedPower,
                solar: value?.solar,
            };
            if (aggregationType == AggregationType.Avg) {
                calculations = {
                    power: value?.power / value?.dataCount,
                    predictedPower: value?.predictedPower / value?.dataCount,
                    solar: value?.solar / value?.dataCount,
                };
            }
            return {
                ...value,
                ...calculations,
            };
        }
    );
    return mergeAndSumSameDates ?? [];
};

export const aggregationByMonth = (powerPlantProduction: PowerPlantProduction[], aggregationType: AggregationType) => {
    const mergeAndSumSameDates = Array.from(
        (powerPlantProduction ?? []).reduce((map, powerPlantProduction) => {
            const key = `${powerPlantProduction?.powerPlantId}_${moment(powerPlantProduction?.timestamp)
                .startOf('month')
                .toDate()
                .getTime()}`;

            let calculations = {};
            if (aggregationType == AggregationType.Sum || aggregationType == AggregationType.Avg) {
                calculations = {
                    power: (map.get(key)?.power || 0) + +powerPlantProduction?.power,
                    predictedPower: (map.get(key)?.predictedPower || 0) + +powerPlantProduction?.predictedPower,
                    solar: (map.get(key)?.solar || 0) + +powerPlantProduction?.solar,
                };
            }
            if (aggregationType == AggregationType.Max) {
                calculations = {
                    power:
                        ((map.has(key) && map.get(key)?.power) || 0) < +powerPlantProduction?.power
                            ? +powerPlantProduction?.power
                            : (!map.has(key) && 0) || map.get(key)?.power,
                    predictedPower:
                        ((map.has(key) && map.get(key)?.predictedPower) || 0) < +powerPlantProduction?.predictedPower
                            ? +powerPlantProduction?.predictedPower
                            : (!map.has(key) && 0) || map.get(key)?.predictedPower,
                    solar:
                        ((map.has(key) && map.get(key)?.solar) || 0) < +powerPlantProduction?.solar
                            ? +powerPlantProduction?.solar
                            : (!map.has(key) && 0) || map.get(key)?.solar,
                };
            }

            return map.set(key, {
                ...powerPlantProduction,
                timestamp: moment(powerPlantProduction?.timestamp).startOf('month').toDate().getTime(),
                oldTimestamp: powerPlantProduction?.timestamp,
                dataCount: (map.get(key)?.dataCount || 0) + 1,
                ...calculations,
            });
        }, new Map()),
        ([key, value]) => {
            let calculations: any = {
                power: value?.power,
                predictedPower: value?.predictedPower,
                solar: value?.solar,
            };
            if (aggregationType == AggregationType.Avg) {
                calculations = {
                    power: value?.power / value?.dataCount,
                    predictedPower: value?.predictedPower / value?.dataCount,
                    solar: value?.solar / value?.dataCount,
                };
            }
            return {
                ...value,
                ...calculations,
            };
        }
    );
    return mergeAndSumSameDates ?? [];
};

export const addMissingDates = (
    dataToExtend: { x: Date; y: any }[],
    dataToCompare: { x: Date; y: any }[]
): { x: Date; y: any }[] => {
    const compareToDictionary = Object.assign(
        {},
        ...dataToCompare.map((x) => ({ [x.x.toISOString()]: { x: x.x, y: null } }))
    );
    const extendToDictionary = Object.assign(
        {},
        ...dataToExtend.map((x) => ({ [x.x.toISOString()]: { x: x.x, y: x.y } }))
    );

    const mergeMissingData = {
        ...compareToDictionary,
        ...extendToDictionary,
    };

    const result: { x: Date; y: any }[] = Object.values(mergeMissingData);
    return result?.sort((a, b) => a.x.getTime() - b.x.getTime());
};
