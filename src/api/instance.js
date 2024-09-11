import axios from "axios";
import Cookies from "js-cookie";
import i18next from "@/localization/i18n";
export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://stage-sv253n6d4bqc7d.iknology.com:253/";

const instance = axios.create({
  baseURL: BASE_URL + "gateway/",
  timeout: 20000,
});

instance.interceptors.request.use(function (config) {
  let authToken = Cookies.get("token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  if (i18next.language) {
    config.headers["Accept-Language"] = i18next.language;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    //if 401 delete token
    return response;
  },
  function (error) {
    if (error?.response?.status == 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      location.reload();
    }
    return Promise.reject(error);
  },
);
export default instance;
