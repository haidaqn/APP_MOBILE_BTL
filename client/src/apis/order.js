import axiosClient from './axiosClient';

const orderApi = {
    createOrder(data) {
        const url = 'order/';
        return axiosClient.post(url, { products: data });
    },
    getOrderByUser() {
        const url = 'order/';
        return axiosClient.get(url);
    }
};

export default orderApi;
