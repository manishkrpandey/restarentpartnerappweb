import axios from "axios";
import { ENVIRONMENT as env} from "./../config";

axios.defaults.baseURL = env.BASE_URL;
axios.defaults.headers.common["Authorization"] = "auth";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const postfetcher = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => response)
    .catch(function (error) {
      console.log(error);
    });
};

export const getFetcher = (url) => {
  return axios
    .get(url)
    .then((response) => response)
    .catch(function (error) {})
    .finally(function () {});
};
