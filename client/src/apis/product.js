import axiosClient from './axiosClient';

const productApi = {
    getProductSmart() {
        const url = `product?page=0&limit=10&category=Smartphone`;
        return axiosClient({
            method: 'get',
            url
        });
    },
    getProductTablet() {
        const url = `product?page=0&limit=10&category=Tablet`;
        return axiosClient({
            method: 'get',
            url
        });
    },
    getProductLaptop() {
        const url = `product?page=0&limit=10&category=Laptop`;
        return axiosClient({
            method: 'get',
            url
        });
    },
    getProductAccessories() {
        const url = `product?page=0&limit=10&category=Accessories`;
        return axiosClient({
            method: 'get',
            url
        });
    },
    getDetailProduct(id) {
        const url = `product/${id}`;
        return axiosClient({
            method: 'get',
            url
        });
    },
    searchProduct(search) {
        const url = `product/search?searchQ=${search}`;
        return axiosClient({
            method: 'get',
            url
        });
    }
};
export default productApi;
