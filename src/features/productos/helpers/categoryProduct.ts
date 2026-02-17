import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import type { ResponseGetAllCategoriesPagination, ResponseGetOneCategory } from "../interfaces/interfaces";
import type { Action } from "@lib/interfaces/actionsmenu";

export async function getAllCategories(page: number) {
    const params = new URLSearchParams();
    params.append("page", String(page));

    const response = await safeApiRequest<ResponseGetAllCategoriesPagination>('get', `${apiRoutes.all_categories_pagination}?${params.toString()}`);

    return response;
}

export async function createCategory(data: any) {
    const response = await safeApiRequest('post', apiRoutes.all_categories, data);
    return response;
}

export async function editCategory(id: number, data: any) {
    const response = await safeApiRequest('patch', apiRoutes.all_categories + id, data);
    return response;
}

export async function deleteCategory(id: number) {
    const response = await safeApiRequest('delete', apiRoutes.all_categories + id);
    return response;
}

export async function getOneCategory(id: number) {
    const response = await safeApiRequest<ResponseGetOneCategory>('get', apiRoutes.all_categories + id);
    return response;
}

export function filterActionsCategory(row: any, actions: Action[]) {
    return actions.map(action => ({
        ...action,
        show: row.id === 1 ? false : true  
    }))
}