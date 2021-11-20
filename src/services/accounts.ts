import axios from 'axios';
import { baseUrl } from 'services';

export const getAccounts = () => {
    return axios.get(`${baseUrl}/accounts/`);
}

export const postAccount = (data: any) => {
    return axios.post(`${baseUrl}/auth/create`, data);
}