import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_PROD_URL } from '@env';

const instance = axios.create({
  baseURL: API_PROD_URL,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('TOKEN');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

instance.interceptors.request.use(
  config => {
    console.log('API: Sending request to the ', config.url, ' with data: ', config.data);
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  config => {
    console.log(
      'API: Received response for the request to ',
      config.config.url,
      ' with status ',
      config.status,
      ' with data: ',
      JSON.stringify(config.data),
    );
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
