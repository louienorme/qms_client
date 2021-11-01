import axios from 'axios'
import { IAdminLogin } from '../../types'

const baseUrl = `${process.env.REACT_APP_QMS_URL}/api`;

export const adminLogin = (data: IAdminLogin) => {
    return axios.post(`${baseUrl}/auth/login`, data);
}