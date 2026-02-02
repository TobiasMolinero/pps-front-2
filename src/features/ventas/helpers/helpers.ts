import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";

export async function getUsers() {
    const response = await safeApiRequest('get', apiRoutes.users_names);
    return response
}