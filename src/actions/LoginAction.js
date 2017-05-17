/**
 * Created by zkw on 2017/5/16.
 */
import axios from 'axios';
import {api, apiPath} from '../utils/WebAPI';
import {LOGIN} from '../constants/actionTypes';
import loginService from '../services/loginService';

const loginDone = (userData) => ({
  type: LOGIN, payload: userData,
});

export function login(username, password) {
  return dispatch => {
    loginService.login(username, password)
        .then(function (response) {
          let res = response.data;
          console.log('jinle', JSON.stringify(res));
        })
  }
}

