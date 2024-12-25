import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const Token = typeof window !== 'undefined' ? localStorage.getItem("Token") ?? null : null;


const instance : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_baseURL,
  headers: {
     Authorization:`Bearer ${Token}`,
  }
});

instance.interceptors.response.use(
  function (config){
    return config;
  },
  function (error:AxiosError) {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  function (response:AxiosResponse) {
    if(response?.data?.message){
      toast.success(response?.data?.message);
    }
    return response;
  },
  function (error:AxiosError) { 
     if (error.response?.data) {
       toast.error((error.response.data as { msg: string }).msg);
     }
    return Promise.reject(error);
  }
);

export default instance