import axios from "axios";
import { apiRoutes } from "./endpoints";
import { isAuthenticated, user } from "@lib/utils/auth";
import { push, location } from "svelte-spa-router";
import { warning } from "@lib/utils/alerts";
import { get } from "svelte/store";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

let isRefreshing = false
let subscribers: ((token: void) => void)[] = [];

function subscribeTokenRefresh(cb: () => void) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.forEach((cb) => cb());
  subscribers = [];
}

http.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && error.response.data.error === 'NO_ACC_TKN') {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      if (isRefreshing) {
        // Si ya hay un refresh en curso, esperá a que termine
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => resolve(http(originalRequest)));
        });
      }

      isRefreshing = true
      try {
        await http.post(apiRoutes.refresh_token)
        isRefreshing = false;
        onRefreshed(); // avisar a las requests en espera
        return http(originalRequest); // 🔁 reintentar la request original
      } catch (err: any) {
        isRefreshing = false
        if (err.response?.status === 401 || err.response?.status === 403) {
          user.set(null)
          isAuthenticated.set(false)
          await warning.fire({ text: 'La sesión expiró. Vuelva a iniciar sesión.', showCancelButton: false })
          if (get(location) !== '/login') push('/login')
        }
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)