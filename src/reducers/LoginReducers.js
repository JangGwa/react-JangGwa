/**
 * Created by zkw on 2017/5/16.
 */
import {LOGIN} from '../constants/actionTypes';

const initialState = {
  loading : false,
  data:'a'
}

export default function login(state = initialState, action){
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loading: true
      });
    default:
      return state;
  }
}