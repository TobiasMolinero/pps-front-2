import { apiRoutes } from "@lib/api/endpoints";
import { safeApiGet } from "@lib/api/safeApiGet";
import type { ResponseGetAllProducts } from "@lib/interfaces/products";


export async function getProducts(page: number) {
    const response = await safeApiGet<ResponseGetAllProducts>(`${apiRoutes.all_products}${page}`);
    return response;
}