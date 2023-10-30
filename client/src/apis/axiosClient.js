import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
    baseURL: 'http://192.168.2.102:3000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return error?.data;
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response?.data;
    },
    (error) => {
        return error?.response?.data;
    }
);

export default axiosClient;
