import axiosClient from './axiosClient';
import { LoginForm } from '../models/auth';

const authApi = {
    login(data: LoginForm) {
        const url = 'admin/login';
        return axiosClient.post(url, data);
    }
};

export default authApi;
