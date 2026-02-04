import axios from "axios";
import { backendUrl, backendUrlApi } from "../constants/url";
import auth from "../api/auth";

const $AuthApi = axios.create({
  baseURL: backendUrlApi,
  validateStatus: function (status) {
    return status < 402 ;
  },
});

$AuthApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(auth.getObject().accessKey)
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => Promise.reject(error)
)

export default $AuthApi;
