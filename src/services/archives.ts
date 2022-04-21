import axios from 'axios';
import { baseUrl } from 'services';

export const getArchives = () => {
    return axios.get(`${baseUrl}/archives/`);
}

export const getStationOneData = (body: any) => {
    return axios.post(`${baseUrl}/archives/station-one`, body);
}

export const getDashboardData = () => {
    return axios.get(`${baseUrl}/auth/data`);
}