import { combineReducers } from 'redux';
// import authReducer from './authRedcuer';
import { productsReducer } from './productsReducer';
import { settingsReducer } from './settingsReducer';
import { bundlesReducer } from './bundlesReducer';
import { usersReducer } from './usersReducer';

export default combineReducers({
    products: productsReducer,
    settings: settingsReducer,
    bundles: bundlesReducer,
    users: usersReducer,
});
