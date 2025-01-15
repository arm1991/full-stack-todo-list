import axios from "axios";

export const SERVER_URL = "http://localhost:8000/api";

const $api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      try {
        const { data } = await axios.get(`${SERVER_URL}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("token", data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Not Authorizrd");
      }
    }
    throw err;
  }
);

export default $api;
