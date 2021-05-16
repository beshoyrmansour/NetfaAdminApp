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
        
        // config.headers["Access-Control-Allow-Origin"] = "*";
        // config.headers['Vary'] = "Origin";
        // config.headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, HEAD, OPTIONS";
        // config.headers["Access-Control-Allow-Credentials"] = "false";
        // config.headers["Access-Control-Allow-Headers"] = "Content-Type accept";

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

        return Promise.reject(error);
    },
);
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// OPTIONS http://myaccount.blob.core.windows.net/mycontainer/myblockblob  HTTP/1.1  
// Accept: */*  
// Origin: www.contoso.com
// axios.defaults.headers['Access-Control-Request-Method'] = ' GET';
// axios.defaults.headers['Origin'] = 'https://netf-test.herokuapp.com';
// axios.defaults.headers['Access-Control-Request-Headers'] = ' content-type, accept';
// axios.defaults.headers['Accept-Encoding'] = ' gzip, deflate  ';
// axios.defaults.headers['User-Agent'] = ' Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)';
// axios.defaults.headers['Content-Length'] = ' 0';
export default axios;
