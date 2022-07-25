import axios from "axios";
let baseURL = "https://stage.api.sloovi.com/";
let token;

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] =  "*";

axios.defaults.headers.common["crossdomain"] = true;
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axios.defaults.headers.common["withCredentials"] = true;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
