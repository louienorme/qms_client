import axios from 'axios'
import { baseUrl } from 'services';

export const getQueues = () => {
    return axios.get(`${baseUrl}/queue/`);
}