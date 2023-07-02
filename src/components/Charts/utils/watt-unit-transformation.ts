export const formatWatts = (watts: number, magnitude: number = 10000, unit: string = 'W') => {
    let powerOfNumber = ['k', 'M', 'G', 'T', 'P'];
    let i;

    for (i = 0; watts >= magnitude && i < powerOfNumber.length; i++) {
        watts /= 1000;
    }

    return `${Number(watts.toFixed(2)).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })} ${powerOfNumber[i]}${unit}`;
};
