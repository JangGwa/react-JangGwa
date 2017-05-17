import axios from 'axios';
import Cookie from './Cookie';

const baseURL = 'http://test.muyucloud.com/';
export const apiPath = {
  login: 'admin/login',
  getBase: 'admin/get/base',
  getRegister: 'admin/register/situation',
  getSign: 'admin/get/sign',
  passSign: 'admin/pass/sign',
  cancelSign: 'admin/reject/sign',
  getRecharge: 'admin/recharge/situation',
  getPurchase: 'admin/purchase/situation',
  getUserInfo: 'admin/user/base',
  getRegTab: 'admin/user/all',
  getTrade: 'admin/trade/all',
};

export const api = {
  getToken: () => {
    return Cookie.get('token');
  },
  clearToken: () => {
    Cookie.remove('token');
  },
  post: (url, data) => {
    return axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': Cookie.get('token'),
      }
    })
        .post(url, data)
        .catch(function (error) {
          console.warn(error);
        });
  },
};