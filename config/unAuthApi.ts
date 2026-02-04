import axios from "axios";
import { backendUrl, backendUrlApi } from "../constants/url";

const $unAuthApi = axios.create({
  baseURL: backendUrlApi,
  validateStatus: function (status) {
    return status < 402 && status !== 400;
  },
});

export default $unAuthApi;
