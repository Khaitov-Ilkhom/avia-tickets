import axios from "axios";
import NProgress from "nprogress";
import {config} from "@/config.ts";

NProgress.configure({
  showSpinner: false,
  trickle: true,
  trickleSpeed: 400,
  easing: "ease",
  speed: 200,
});

const useApi = () => {
  const request = axios.create({
    baseURL: config.baseURL,
    params: {},
  });

  request.interceptors.request.use(
      (config) => {
        config.headers["x-api-key"] = `4 |EYgCwe2MX2TzveHeMTNVZ7YmiWUg7488N1p0xCt8197b7145`;
        NProgress.start();
        return config;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      },
  );

  return {
    request,
  };
};

export default useApi;
