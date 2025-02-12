import axios from "axios";
const AxiosInstance = axios.create({
  // baseURL: API_PATH,
  timeout: -1,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => ({
    status: true,
    message: response.status,
    data: response.data,
  }),
  (error) => {
    return {
      status: false,
      message: error,
    };
  }
);

export default AxiosInstance;
