import axios from "axios";
import config from "../config";

const instance = axios.create({
  baseURL: config.circleBaseUrl,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${config.circleApiKey}`,
  },
});

export default instance;
