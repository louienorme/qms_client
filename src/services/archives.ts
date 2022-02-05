import axios from 'axios';
import { baseUrl } from 'services';

export const getStationOneData = (body: any) => {
    return axios.post(`${baseUrl}/archives/station-one`, body);
}