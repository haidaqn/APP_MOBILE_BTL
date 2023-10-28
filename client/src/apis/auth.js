import axiosClient from './axiosClient';

const authApi = {
    login(data) {
        const url = 'user/login';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = 'user/register';
        return axiosClient.post(url, data);
    }
};

export default authApi;
