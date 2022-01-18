import axios from 'axios';
import { baseUrl } from 'services';

export const createNumber = (queueName: string, body: any) => {
    return axios.put(`${baseUrl}/pools/getTicket/${queueName}`, body);
}

export const getNumber = (body: any) => {
    return axios.post(`${baseUrl}/pools/getTicket`, body);
}

export const nextNumber = (body: any) => {
    return axios.post(`${baseUrl}/pools/nextTicket`, body);
}

export const returnNumber = (body: any) => {
    return axios.post(`${baseUrl}/pools/returnTicket`, body);
}

export const getWindowNumber = (body: any) => {
    return axios.post(`${baseUrl}/pools/windowTicket`, body);
}

export const getStationTickets = (body: any) => {
    return axios.post(`${baseUrl}/pools/getTickets`, body);
}