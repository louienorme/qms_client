import axios from 'axios';
import { baseUrl } from 'services';

export const getAccounts = () => {
    return axios.get(`${baseUrl}/accounts/`);
}

export const getOneAccount = (id: string) => {
    return axios.get(`${baseUrl}/accounts/get/${id}`);
}

export const getWindowAccounts = (queueName: string) => {
    return axios.get(`${baseUrl}/accounts/windows/${queueName}`);
}

export const getFlashboards = (queueName: string) => {
    return axios.get(`${baseUrl}/accounts/flashboards/${queueName}`);
}

export const postAccount = (data: any) => {
    return axios.post(`${baseUrl}/auth/create`, data);
}

export const createFlashboardsAccounts = (queueName: string) => {
    return axios.put(`${baseUrl}/accounts/flashboards-create/${queueName}`);
}

export const createWindowAccounts = (queueName: string) => {
    return axios.put(`${baseUrl}/accounts/windows-create/${queueName}`);
}