import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const expectedError = error.response.status >= 400 && error.response.status < 500;
      if (expectedError) {
        toast.error(JSON.stringify(error.response.data));
      }
    }
    return Promise.reject(error);
  },
);

function setAuthHeader(jwt: any) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthHeader,
};

export default exportedObject;
