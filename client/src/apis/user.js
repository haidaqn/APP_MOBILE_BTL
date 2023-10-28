import axiosClient from './axiosClient';

const userApi = {
    setAddress(data) {
        const url = `user/current/update-address`;
        return axiosClient.put(url, { address: data });
    }
};

export default userApi;
