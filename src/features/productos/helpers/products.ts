import { apiRoutes } from "@lib/api/endpoints";
import type { ProductForm, ResponseGetAllCategories, ResponseGetAllProducts, ResponseGetOneProduct } from "@features/productos/interfaces/interfaces";
import { cleanFormatMoney } from "@lib/formatters";
import { safeApiRequest } from "@lib/api/safeApiRequest";

export async function getProducts(
    page: number, 
    filters: { search?: string; category?: number } = {}
) {
    const params = new URLSearchParams();

    params.append("page", String(page));

    if(filters.search && filters.search.trim() !== "") {
        params.append("search", filters.search.trim());
    }

    if(filters.category && filters.category !== 0) {
        params.append("category", String(filters.category));
    }

    const response = await safeApiRequest<ResponseGetAllProducts>('get', `${apiRoutes.products}?${params.toString()}`);
    return response;
}

export async function getOneProduct(id: number) {
    const response = await safeApiRequest<ResponseGetOneProduct>('get', `${apiRoutes.products}/${id}`); 
    return response;
}

export async function createProduct(newProduct: ProductForm) {
    const response = await safeApiRequest<void>('post', apiRoutes.products, newProduct);
    return response;
}

export async function editProduct(id: number, modifiedProduct: ProductForm) {
    const response = await safeApiRequest<void>('patch', `${apiRoutes.products}/${id}`, modifiedProduct);
    return response;
}

export async function deleteProduct(id: number) {
    const response = await safeApiRequest<void>('delete', `${apiRoutes.products}/${id}`);
    return response;
}

export async function addStock(id: number, data: any) {
    const response = await safeApiRequest<void>('patch', `${apiRoutes.products}/add-stock/${id}`, data);
    return response;
}

export async function getCategories() {
   const response = await safeApiRequest<ResponseGetAllCategories>('get', apiRoutes.all_categories);
   return response;
}

export function cleanDataProduct(data: ProductForm): ProductForm {
    return {
        ...data,
        cod_producto: data.cod_producto.trim().replace(/\s+/g, ''),
        nombre_producto: data.nombre_producto.trim(),
        descripcion: data.descripcion.trim(),
        precio: cleanFormatMoney(data.precio as string),
        stock: Number(data.stock)
    }
}