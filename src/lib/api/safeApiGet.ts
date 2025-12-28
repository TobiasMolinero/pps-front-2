import type { AxiosRequestConfig } from "axios";
import { http } from "./axios";

export async function safeApiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
    try {
        const response = await http.get(url, config);
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}