import axios from "axios";

import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL,
});

const ErrorMessages = {
  post: "Registro creado con éxito.",
  put: "Registro actualizado con éxito.",
  delete: "Registro eliminado con éxito.",
};

apiClient.interceptors.response.use(
  function (response) {
    const { method } = response.config;

    if (ErrorMessages[method]) {
      toast.success(ErrorMessages[method]);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 401 || error.response.status === 403) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 404) {
      // toast.error("Recurso no encontrado");
    }
    return Promise.reject(error);
  }
);

export function setToken(token) {
  apiClient.defaults.headers.common["x-auth-token"] = token;
}

export default apiClient;
