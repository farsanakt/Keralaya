import axios from "axios";
import { toast } from "react-toastify";
import store from '../../redux/store';
// import { resetUser } from "../../redux/slices/authSlice";
const API_URL = import.meta.env.VITE_USER_API_URL


export const publicAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });


export const userAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


const controllerMap = new Map();



userAxiosInstance.interceptors.request.use(async (config) => {

  const token = localStorage.getItem('accessToken');

 console.log("Access Token:", token);
  

  
  if (token) {
    
    config.headers.authorization = `Bearer ${token}`;
    console.log(config.headers.authorization,'&&&&&&&&&&&&&&&&&&&&&&');

  }

 
  if (!config.signal) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controllerMap.set(config.url, controller);
  }

  return config;
});


userAxiosInstance.interceptors.response.use(
  (response) => {
    controllerMap.delete(response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await getNewAccessToken();
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return userAxiosInstance(originalRequest);
        } catch (err) {
          toast.error("Session expired");
        //   store.dispatch(resetUser())
          return Promise.reject(err);
        }
      }

      if (error.response.status >= 500) {
        toast.error("Server error, please try again later.");
      }

      if (error.response.status >= 400 && error.response.status < 500 && error.response.status !== 401) {
        toast.error(`${error.response.data.error || 'An error occurred'}`);
      }
    } else if (error.request) {
      toast.error("Network error, please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    controllerMap.delete(url);
    return Promise.reject(error);
  }
);

async function getNewAccessToken() {
  console.log('nmmmmmmude')
  const response = await axios.get(`${API_URL}/refresh-token`, {
    withCredentials: true,
  });
  console.log(response.data,'refreshhhheeeeee')
  
  return response.data.accessToken;
}