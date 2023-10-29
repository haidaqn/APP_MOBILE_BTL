import axiosClient from './axiosClient';
import axios from 'axios';
import { PageConfig, CreateProduct } from '../models';
import { ASSETS_NAME, CLOUD_NAME } from '../constants/common';
const adminApi = {
    getAllUser(page: PageConfig) {
        const url = `admin/get-all-user?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    getPagingOrder(page: PageConfig) {
        const url = `admin/get-all-order?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    getPagingProduct(page: PageConfig) {
        const url = `admin/get-all-products?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    updateIsBlockUser(isBlocked: boolean, idUser: string) {
        const url = `admin/update-user/${idUser}`;
        return axiosClient.post(url, { isBlocked });
    },
    updateStatusOrder(orderId: string, newStatus: string) {
        const url = `admin/update-order/${orderId}`;
        return axiosClient.post(url, { newStatus });
    },
    getUploadImages(images: FormData) {
        const url = `https://api.cloudinary.com/v1_1/drussspqf/image/upload`;
        return axios.post(url, images);
    },
    createProduct(data: CreateProduct) {
        const url = 'admin/create-product';
        return axiosClient.post(url, data);
    },
    deleteProduct(data: string[]) {
        const url = 'admin/delete-products';
        return axiosClient.delete(url, { data: data });
    }
};

export default adminApi;
