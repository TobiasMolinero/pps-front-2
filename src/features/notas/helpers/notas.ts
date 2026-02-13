import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import type { ResponseGetAllNotes } from "../interfaces/interfaces";

export async function getNotas(
    page: number,
    filters?: { id_tipo_factura: number}
) {
    const params = new URLSearchParams();

    params.append("page", String(page));

    if(filters?.id_tipo_factura && filters?.id_tipo_factura !== 0) {
        params.append("id_tipo_factura", String(filters.id_tipo_factura));
    }

    const response = await safeApiRequest<ResponseGetAllNotes>('get', `${apiRoutes.notas}?${params.toString()}`);
    return response;
}