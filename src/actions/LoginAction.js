/**
 * Created by zkw on 2017/5/16.
 */
import axios from 'axios';
import {api, apiPath} from '../utils/WebAPI';
import {LOGIN} from '../constants/actionTypes';

export function login(username, password) {
  return dispatch => {
    api.post(apiPath.login, {name: username, password: password})
        .then(function (response) {
          console.log('ss' + response);
          dispatch({
            type: LOGIN, payload: 'ss'
          })
        })
  }
}

