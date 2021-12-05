import axios from 'axios';
import { baseUrl } from 'services';

export const getAccounts = () => {
    return axios.get(`${baseUrl}/accounts/`);
}

export const postAccount = (data: any) => {
    return axios.post(`${baseUrl}/auth/create`, data);
}

export const createFlashboardsAccounts = (queueName: string) => {
    return axios.get(`${baseUrl}/accounts/flashboards/${queueName}`);
}

export const createWindowAccounts = (queueName: string) => {
    return axios.get(`${baseUrl}/accounts/windows/${queueName}`);
}