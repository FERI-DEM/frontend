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
      return { from: new Date(), to: new Date() };
    },
  },
  {
    label: 'Jutri',
    callback() {
      return { from: new Date(), to: new Date() };
    },
  },
  {
    label: 'Včeraj',
    callback() {
      return { from: new Date(), to: new Date() };
    },
  },
  {
    label: 'Zadnjih 7 dni',
    callback() {
      return { from: new Date(), to: new Date() };
    },
  },
  {
    label: 'Trenutni mesec',
    callback() {
      return { from: new Date(), to: new Date() };
    },
  },
];
