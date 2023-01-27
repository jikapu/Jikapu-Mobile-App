import axios from 'axios';
import { Config } from 'react-native-config';
import { strings } from '@/localization';
import {BASE_URL} from "@/constants/apiUrls";
import { getItem } from '@/utils/AsyncUtils';


const client = axios.create({
  baseURL: BASE_URL,
  timeout:10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error(strings.common.connectionError));
    } else {
      return Promise.reject(error);
    }
  }
);

 const setAuthorization = (token) => {
    client.defaults.headers.common['Authorization'] = token
};

 const clearAuthorization = () => {
  delete client.defaults.headers.common['Authorization'];
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };
