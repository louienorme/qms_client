import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig
} from 'axios'
import { refresh } from './refresh';

/** Refresh Token */
const newToken = async (refreshToken: string) => {
    try {
        const payload = await refresh(refreshToken);
        
        return payload.data.token; 
    } catch (err: any) {
        if (err?.response?.status === 403) {
            window.location.replace('/');
        }

        return null;
    }
}

/** Modify Axios Conf before request is made */
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig  => {
  /** Edit headers for Axios Request */
    
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
        Authorization: token
    }
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

/** If response is 403, fetch new token using refresh token on axios response interceptor */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (error.response) {
        if (error.response.status === 403) {
            if (refreshToken) {
                const newAccessToken = await newToken(refreshToken);

                if (newAccessToken) {
                    localStorage.setItem('token', newAccessToken);
                }
            }
        }
    }

    return Promise.reject(error);
}

export function setupInterceptorsTo(
    axiosInstance : AxiosInstance
): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}