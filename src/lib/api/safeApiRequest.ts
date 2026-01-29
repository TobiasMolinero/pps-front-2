import { AxiosError, type AxiosRequestConfig } from "axios";
import { http } from "./axios";
import axios from "axios";

type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: AxiosError; message: string };

export async function safeApiRequest<T>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await http.request<T>({ method, url, data, ...config });
    return { ok: true, data: response.data };
  } catch (error) {
    const axiosError = error instanceof AxiosError ? error : new AxiosError('Unknown error');

    const message = getErrorMessage(error);

    return { ok: false, error: axiosError.response?.data, message };
  }
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      const data = axiosError.response.data;

      if (data?.message) return data.message;

      const status = axiosError.response.status;
      const statusText = axiosError.response.statusText || 'Error';
      return `Error ${status}: ${statusText}`;
    }

    if (axiosError.request) {
      return 'No fue posible conectar con el servidor. Verifica tu conexión a internet. Si el problema persiste, contacta a un administrador.';
    }

    return `Error al preparar la solicitud: ${axiosError.message}. Vuelva a intentarlo más tarde.`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrió un error inesperado. Si el problema persiste, contacta a un administrador.';
}