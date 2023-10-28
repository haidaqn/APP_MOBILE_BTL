import axiosClient from './axiosClient';

const categoryApi = {
  getAllCategory() {
    const url = 'category';
    return axiosClient({
      method: 'get',
      url
    });
  }
};
export default categoryApi;
