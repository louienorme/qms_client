import axios from 'axios'
import { baseUrl } from 'services';

export const getQueues = () => {
    return axios.get(`${baseUrl}/queue/`);
}

export const stepOne = (data: any) => {
    return axios.post(`${baseUrl}/queue/createStepOne`, data);
}

export const stepTwo = (queueName: string, data: any) => {
    return axios.post(`${baseUrl}/queue/createStepTwo/${queueName}`, data);
}

export const stepThree = (queueName: string) => {
    return axios.put(`${baseUrl}/queue/createStepThree/${queueName}`);
}

export const getStations = (queueName: string) => {
    return axios.get(`${baseUrl}/queue/stations/${queueName}`)
} 

export const getWindows = (queueName: string) => {
    return axios.get(`${baseUrl}/queue/windows/${queueName}`)
} 