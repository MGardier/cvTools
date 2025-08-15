import axios, { AxiosError, type AxiosInstance } from 'axios';



const axiosClient = (): AxiosInstance => {
  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

  });
  axiosClient.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error: AxiosError) => {

      if (error.response?.data)
        throw error.response.data;

      throw {
        success: false,
        statusCode: 0,
        message: 'UNKNOWN_ERROR',
        path: error.config?.url || 'unknown'
      };
    }


  );

  return axiosClient;

};

export const apiClient = axiosClient();



