import { apiRoutes } from "@lib/api/endpoints";
import type { ProductForm, ResponseGetAllCategories, ResponseGetAllProducts, ResponseGetOneProduct } from "@features/productos/interfaces/interfaces";
import { cleanFormatMoney } from "@lib/formatters";
import { safeApiRequest } from "@lib/api/safeApiRequest";

export async function getProducts(page: number) {
    const response = await safeApiRequest<ResponseGetAllProducts>('get', `${apiRoutes.all_products}${page}`);
    return response;
}

export async function getOneProduct(id: number) {
    const response = await safeApiRequest<ResponseGetOneProduct>('get', `${apiRoutes.root_products}/${id}`); 
    return response;
}

export async function createProduct(newProduct: ProductForm) {
    const response = await safeApiRequest<void>('post', apiRoutes.root_products, newProduct);
    return response;
}

export async function deleteProduct(id: number) {
    const response = await safeApiRequest<void>('delete', `${apiRoutes.root_products}/${id}`);
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