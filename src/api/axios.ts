import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WATT4CAST_API_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const datastaxInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WATT4CAST_CASSADRA,
  timeout: 25000,
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-cassandra-token': process.env.NEXT_PUBLIC_ASTRA_DB_APPLICATION_TOKEN,
  },
});