import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default api;