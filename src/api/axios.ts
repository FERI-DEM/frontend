import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WATT4CAST_API_URL,
  timeout: 25000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});