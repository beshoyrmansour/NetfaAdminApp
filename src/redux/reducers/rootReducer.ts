import { combineReducers } from 'redux';
// import authReducer from './authRedcuer';
import { productsReducer } from './productsReducer';

export default combineReducers({
    products: productsReducer,
});
