import axios from 'axios';
// import {
//   onSuccess,
//   onFailure,
//   startLoading,
// } from '../redux/actions/statusActions';
// import { signIn } from '../redux/actions/authActions';

// Axios Interceptors
// Request
axios.interceptors.request.use(
    async config => {
        // store.dispatch(startLoading());
        // const { auth } = store.getState();
        // const { isLoggedIn, exp } = auth;
        // let { token } = auth;
        // if (!isLoggedIn) return config;
        // const isExpired = exp < Date.now() / 1000;
        // if (isExpired) {
        //   /**
        //    * refreshTokens
        //    */
        //   return config;
        // }
        // eslint-disable-next-line no-param-reassign
        // config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
        // config.headers.withCredentials = `true`;

        return config;
    },
    error => {
        // store.dispatch(onFailure());
        return Promise.reject(error);
    },
);

// Response
axios.interceptors.response.use(
    response => {
        // store.dispatch(onSuccess());
        return response;
    },
    error => {
        const status = error.response && error.response.status;
        console.log("AXIOS=> error status: ", { status });

        return Promise.reject(error);
    },
);

export default axios;
