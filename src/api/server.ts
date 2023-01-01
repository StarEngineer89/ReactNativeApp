import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PROD_URL } from "@env";

const instance = axios.create({
  baseURL: API_PROD_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
