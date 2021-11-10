import axios from 'axios';
import { baseUrl } from 'services';

export const getAccounts = () => {
    return axios.get(`${baseUrl}/accounts/`);
}