import axios, { AxiosResponse } from "axios";
import { responseProps } from "../api/queue";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL,
});

instance.interceptors.request.use();

instance.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data;
  }
});

export default instance;
