import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";

export function getActualMonth() {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const date = new Date();
  return months[date.getMonth()];
}

export async function getTopProducts() {
    const response = await safeApiRequest<{data: any[]}>('get', apiRoutes.dashboard + '/get-top-products');
    return response;
}

export async function getVentasPendientes() {
    const response = await safeApiRequest<any>('get', apiRoutes.dashboard + '/ventas-sin-facturar');
    return response;
}

export async function getProductsSinStock() {
    const response = await safeApiRequest<any>('get', apiRoutes.dashboard + '/productos-sin-stock');
    return response;
}

export async function getVentasMesActual() {
    const response = await safeApiRequest<any>('get', apiRoutes.dashboard + '/total-ventas');
    return response;
}