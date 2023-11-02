import axios from 'axios';
import { urlsServices } from '../../../../configs/urlsConfig';

export const APIBg = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

APIBg.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
