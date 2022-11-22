import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';

const api = axios.create({
  baseURL: Environment.URL_BASE,
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { api }; 