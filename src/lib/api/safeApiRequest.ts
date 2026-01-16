import type { AxiosRequestConfig } from "axios";
import { http } from "./axios";
import axios from "axios";

export async function safeApiRequest<T>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T | null> {
    try {
        const response = await http.request<T>({ method, url, data, ...config });
        return response.data;
    } catch (error) {
        console.error(error);

        const message = getErrorMessage(error);
        alert(`Error: ${message}`);

        return null;
    }
}

function getErrorMessage(error: unknown): string {
    if(axios.isAxiosError(error)) {
        if(error.response) {
            const data = error.response.data as { message?: string };
            if(data?.message) {
                return data.message;
            }

            return `Error: ${error.response.status}: ${error.response.statusText}`;
        }

        if(error.request) {
            return "No fue posible conectar con el servidor. Verifica tu conexión a internet. Si el problema persiste, contacta a un administador.";
        }

        return `Error al preparar la solicitud: ${error.message}. Vuelva a intenrarlo más tarde. Si el problema persiste, contacta a un administrador.`;
    }

    if(error instanceof Error) {
        return error.message;
    }

    return "Ocurrió un error inesperado. Si el problema persiste, contacta a un administrador.";
}