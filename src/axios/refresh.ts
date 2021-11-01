import axios from 'axios';
import { baseUrl } from '../services'

 export const refresh = (refreshToken: string) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': refreshToken
    }
    return axios.post(`${baseUrl}/auth/refresh-token`, headers);
 }