import { apiRoutes } from "@lib/api/endpoints";
import type { ProductForm, ResponseGetAllCategories, ResponseGetAllProducts, ResponseGetOneProduct } from "@features/productos/interfaces/interfaces";
import { cleanFormatMoney } from "@lib/formatters";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import type { Action } from "@lib/interfaces/actionsmenu";
import { user } from "@lib/utils/auth";
import { get } from "svelte/store";

export async function getProducts(
    page: number,
    filters: { search?: string; category?: number } = {}
) {
    const params = new URLSearchParams();

    params.append("page", String(page));

    if (filters.search && filters.search.trim() !== "") {
        params.append("search", filters.search.trim());
    }

    if (filters.category && filters.category !== 0) {
        params.append("category", String(filters.category));
    }

    const response = await safeApiRequest<ResponseGetAllProducts>('get', `${apiRoutes.products}?${params.toString()}`);
    return response;
}

export async function getOneProduct(id: number) {
    const response = await safeApiRequest<ResponseGetOneProduct>('get', `${apiRoutes.products}/${id}`);
    return response;
}

export async function createProduct(newProduct: Partial<ProductForm>) {
    const response = await safeApiRequest<void>('post', apiRoutes.products, newProduct);
    return response;
}

export async function editProduct(id: number, modifiedProduct: Partial<ProductForm>) {
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

export function cleanDataProduct(data: Partial<ProductForm>): Partial<ProductForm> {
    const cleaned: Partial<ProductForm> = {};

    if (data.cod_producto !== undefined) {
        cleaned.cod_producto = data.cod_producto.trim().replace(/\s+/g, '');
    }

    if (data.nombre_producto !== undefined) {
        cleaned.nombre_producto = data.nombre_producto.trim();
    }

    if (data.descripcion !== undefined) {
        cleaned.descripcion = data.descripcion.trim();
    }

    if (data.precio !== undefined) {
        cleaned.precio = cleanFormatMoney(data.precio as string);
    }

    if (data.stock !== undefined) {
        cleaned.stock = Number(data.stock);
    }

    if (data.id_categoria_producto !== undefined) {
        cleaned.id_categoria_producto = data.id_categoria_producto;
    }

    return cleaned;
}

export function getModifiedFields<T extends Record<string, any>>(
    original: T,
    current: T
): Partial<T> {
    const modified: Partial<T> = {};

    for (const key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
            if (current[key] !== original[key]) {
                modified[key] = current[key]
            }
        }
    }

    return modified;
}

export const filterActionsProductsByRol = (row: any, actions: Action[]): Action[] => {
    if (get(user)?.rol_usuario === 'vendedor') {
        return actions.map((a) => ({
            ...a,
            show: [
                "Ingresar stock"
            ].includes(a.label),
        }));
    }

    return actions;
}