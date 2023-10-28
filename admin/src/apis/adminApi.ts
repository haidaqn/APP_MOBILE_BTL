import axiosClient from './axiosClient';
import { PageConfig } from '../models';
const adminApi = {
    getAllUser(page: PageConfig) {
        const url = `admin/get-all-user?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    getPagingOrder(page: PageConfig) {
        const url = `admin/get-all-order?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    getPagingProduct(page: PageConfig){
         const url = `admin/get-all-products?page=${page.pageIndex}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    }
};

export default adminApi;
