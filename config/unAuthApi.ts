import axios from "axios";
import { backendUrl, backendUrlApi } from "../constants/url";

const $unAuthApi = axios.create({
    baseURL: backendUrlApi
})

export default $unAuthApi