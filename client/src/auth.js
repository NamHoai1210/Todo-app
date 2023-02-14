import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5 * 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
function refreshToken() {
  return instance.post('/login/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
}
instance.setToken = (token) => {
  instance.defaults.headers['x-access-token'] = token;
  localStorage.setItem('token', token);
};
instance.interceptors.request.use(
    (config)=>{
      config.headers['x-access-token'] = localStorage.getItem('token');
      return config;
    }, (err)=>{
      console.log(err);
      return err;
    },
);
instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response) {
        const {status, data} = err.response;
        if (status === 401) {
          if (data.message === 'Invalid token') {
            refreshToken()
                .then((res) => {
                  const {token} = res.data;
                  instance.setToken(token);
                  const config = err.config;
                  config.headers['x-access-token'] = token;
                  return instance(config);
                })
                .catch((e) => {
                  if (e.response.status === 404) {
                    location.href = '/todo';
                  } else {
                    localStorage.removeItem('refreshToken');
                    location.href='/login';
                  }
                  return Promise.reject(e);
                });
          }
        }
      }
      return Promise.reject(err);
    });
export default instance;
