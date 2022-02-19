import axios from 'axios';
import { baseUrl } from 'services';

export const getAccounts = () => {
    return axios.get(`${baseUrl}/accounts/`);
}

export const getAccountsByType = (type: string) => {
    return axios.get(`${baseUrl}/accounts/${type}`);
}

export const getOneAccount = (id: string) => {
    return axios.get(`${baseUrl}/accounts/get/${id}`);
}

export const updateAccount = (id: string, body: any) => {
    return axios.put(`${baseUrl}/accounts/update/${id}`, body);
}

export const deleteAccount = (id: string) => {
    return axios.delete(`${baseUrl}/accounts/delete/${id}`);
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