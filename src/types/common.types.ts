import moment from 'moment';

export interface ApiError {
    error: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

export const dateRangeOptions = [
    {
        label: 'Danes',
        callback() {
            return { from: moment().startOf('day').toDate(), to: moment().endOf('day').toDate() };
        },
    },
    {
        label: 'Jutri',
        callback() {
            return {
                from: moment().add(1, 'day').startOf('day').toDate(),
                to: moment().add(1, 'day').endOf('day').toDate(),
            };
        },
    },
    {
        label: 'Včeraj',
        callback() {
            return {
                from: moment().add(-1, 'day').startOf('day').toDate(),
                to: moment().add(-1, 'day').endOf('day').toDate(),
            };
        },
    },
    {
        label: 'Zadnjih 7 dni',
        callback() {
            return {
                from: moment().add(-5, 'day').startOf('day').toDate(),
                to: moment().add(5, 'day').endOf('day').toDate(),
            };
        },
    },
    {
        label: 'Trenutni mesec',
        callback() {
            return {
                from: moment().startOf('month').toDate(),
                to: moment().endOf('month').endOf('day').toDate(),
            };
        },
    },
];
