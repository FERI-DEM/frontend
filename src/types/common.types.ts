import moment from 'moment';

export interface ApiError {
    error: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

export enum DateType {
    Default = 0,
    Today = 1,
    Yesterday = 2,
    Tomorrow = 3,
    CurrentWeek = 4,
    LastWeek = 5,
    NextWeek = 6,
    CurrentMonth = 7,
    LastMonth = 8,
    CurrentYear = 9,
    LastYear = 10,
}

export interface DateRangeOption {
    label: string;
    type: DateType;
    callback: () => void;
}

export const dateRangeOptions = (filter?: number[]): DateRangeOption[] => {
    const options = [
        {
            label: 'Privzeto obdobje',
            type: DateType.Default,
            callback() {
                return {
                    from: moment().add(-1, 'day').startOf('day').toDate(),
                    to: moment().add(2, 'day').endOf('day').toDate(),
                };
            },
        },
        {
            label: 'Danes',
            type: DateType.Today,
            callback() {
                return { from: moment().startOf('day').toDate(), to: moment().endOf('day').toDate() };
            },
        },
        {
            label: 'Jutri',
            type: DateType.Tomorrow,
            callback() {
                return {
                    from: moment().add(1, 'day').startOf('day').toDate(),
                    to: moment().add(1, 'day').endOf('day').toDate(),
                };
            },
        },
        {
            label: 'Včeraj',
            type: DateType.Yesterday,
            callback() {
                return {
                    from: moment().add(-1, 'day').startOf('day').toDate(),
                    to: moment().add(-1, 'day').endOf('day').toDate(),
                };
            },
        },
        {
            label: 'Trenutni teden',
            type: DateType.CurrentWeek,
            callback() {
                return {
                    from: moment().startOf('week').toDate(),
                    to: moment().endOf('week').toDate(),
                };
            },
        },
        {
            label: 'Naslednji teden',
            type: DateType.NextWeek,
            callback() {
                return {
                    from: moment().add(1, 'week').startOf('week').toDate(),
                    to: moment().add(1, 'week').endOf('week').toDate(),
                };
            },
        },
        {
            label: 'Prejšnji teden',
            type: DateType.LastWeek,
            callback() {
                return {
                    from: moment().add(-1, 'week').startOf('week').toDate(),
                    to: moment().add(-1, 'week').endOf('week').toDate(),
                };
            },
        },
        {
            label: 'Trenutni mesec',
            type: DateType.CurrentMonth,
            callback() {
                return {
                    from: moment().startOf('month').toDate(),
                    to: moment().endOf('month').toDate(),
                };
            },
        },
        {
            label: 'Prejšnji mesec',
            type: DateType.LastMonth,
            callback() {
                return {
                    from: moment().add(-1, 'month').startOf('month').toDate(),
                    to: moment().add(-1, 'month').endOf('month').toDate(),
                };
            },
        },
        {
            label: 'Trenutno leto',
            type: DateType.CurrentYear,
            callback() {
                return {
                    from: moment().startOf('year').toDate(),
                    to: moment().endOf('year').toDate(),
                };
            },
        },
        {
            label: 'Prejšnje leto',
            type: DateType.LastYear,
            callback() {
                return {
                    from: moment().add(-1, 'year').startOf('year').toDate(),
                    to: moment().add(-1, 'year').endOf('year').toDate(),
                };
            },
        },
    ];
    return (filter && options.filter((x) => filter.some((y) => y == x.type))) || options;
};
