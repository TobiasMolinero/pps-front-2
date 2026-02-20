import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import type { GetUsersResponse, UserForm } from "../interfaces/interfaces";
import type { Action } from "@lib/interfaces/actionsmenu";
import { get } from "svelte/store";
import { user } from "@lib/utils/auth";

export async function getAllUsers(page: number) {
    const params = new URLSearchParams();
    params.append('page', String(page));

    const response = await safeApiRequest<GetUsersResponse>('get', `${apiRoutes.get_users}?${params.toString()}`);
    return response;
}

export async function createUser(data: UserForm) {
    const response = await safeApiRequest('post', apiRoutes.create_user, data);
    return response;
}

export async function disabledUser(id: number) {
    const response = await safeApiRequest('patch', apiRoutes.disabled_user + id);
    return response;
}

export async function enabledUser(id: number) {
    const response = await safeApiRequest('patch', apiRoutes.enabled_user + id);
    return response;
}

export const filterActionsUser = (row: any, actions: Action[]): Action[] => {
    if(row.id === get(user)?.id) {
        return actions.map(a => ({
            ...a,
            show: false,
        }))
    }

    if (row.activo === 'Activo') {
        return actions.map(a => ({
            ...a,
            show: ["Dar de baja"].includes(a.label),
        }));
    }

    if (row.activo === "Inactivo") {
        return actions.map(a => ({
            ...a,
            show: ["Dar de alta"].includes(a.label),
        }));
    }

    return actions;
};