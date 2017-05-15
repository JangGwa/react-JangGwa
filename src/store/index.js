/**
 * Created by zkw on 2017/5/15.
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    ),
)


export default store;