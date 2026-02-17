import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import { storeDetailSale, storeSelectProducts } from "../store";
import { get } from "svelte/store";
import { user } from "@lib/utils/auth";
import type { CreateSaleRequestData, FormSaleData, GenerateTicketRequestData, GetOneSaleResponse, ResponseGetAllSales } from "../interfaces/interfaces";
import type { UserData } from "@features/auth/interfaces/interfaces";

export async function getUsers() {
    const response = await safeApiRequest('get', apiRoutes.users_names);
    return response
}

export function addDetailToStore(cantidad: number, id_producto: number) {
    let productData: { cod_producto: string, nombre_producto: string, precio: number }
    const filteredProduct = get(storeSelectProducts).filter(product => product.id === id_producto)

    productData = {
        cod_producto: filteredProduct[0].cod_producto,
        nombre_producto: filteredProduct[0].nombre_producto,
        precio: filteredProduct[0].precio
    }

    storeDetailSale.update(values => {
        let productExist = findExistingProduct(id_producto)

        if (productExist) {
            values.forEach(detalle => {
                if (detalle.id_producto === id_producto) {
                    detalle.cantidad += cantidad
                }
            })
        } else {
            let precio_sin_iva: number = productData.precio / 1.21
            let iva: number = precio_sin_iva * 0.21

            values.push({
                id_producto,
                cod_producto: productData.cod_producto,
                nombre_producto: productData.nombre_producto,
                precio: productData.precio,
                precio_sin_iva: precio_sin_iva.toFixed(2),
                iva: iva.toFixed(2),
                cantidad
            })
        }

        return values
    })
}

function findExistingProduct(id_producto: number): boolean {
    const product = get(storeDetailSale).filter(detail => detail.id_producto === id_producto)
    if (product.length === 0 || product === undefined) {
        return false
    } else {
        return true
    }
}

export function modifyQantProduct(id_producto: number, newValue: number) {
    storeDetailSale.update(values => {
        values.map(element => {
            if (element.id_producto === id_producto) {
                element.cantidad = newValue
            }
        })

        return values
    })
}

export function deleteProductFromDetail(id_producto: number) {
    storeDetailSale.update(values => {
        values = values.filter(detail => detail.id_producto !== id_producto)

        return values
    })
}

export function calculateSubTotal(): number {
    let subTotal: number = 0
    get(storeDetailSale).map(detail => {
        subTotal += Number(detail.precio_sin_iva) * detail.cantidad
    })
    return subTotal
}

export function calculateIva(): number {
    let iva: number = 0
    get(storeDetailSale).map(detail => {
        iva += Number(detail.iva) * detail.cantidad
    })
    return iva
}

export function calculateTotal(): number {
    let total: number = 0
    get(storeDetailSale).map(detail => {
        total += Number(detail.precio) * detail.cantidad
    })
    return total
}

export function prepareRequestData(formData: FormSaleData): CreateSaleRequestData {
    const userData = get(user) as UserData
    const userId = userData?.id || 1;
    const state = 'pendiente'
    const total = calculateTotal();

    const details = get(storeDetailSale).map(detail => {
        return {
            cod_producto: detail.cod_producto,
            nombre_producto: detail.nombre_producto,
            precio: detail.precio,
            cantidad: detail.cantidad
        }
    });

    const requestData = {
        cabecera: {
            id_tipo_factura: formData.id_tipo_factura,
            fecha_venta: formData.fecha_venta,
            id_usuario: userId,
            metodo_pago: formData.metodo_pago,
            estado: state,
            importe_total: total,
            observaciones: formData.observaciones,
            condicion_iva_cliente: formData.condicion_iva_cliente,
            tipo_documento_cliente: formData.tipo_documento_cliente,
            nro_documento_cliente: formData.nro_documento_cliente,
            nombre_cliente: formData.nombre_cliente,
            domicilio_cliente: formData.domicilio_cliente,
        },
        detalles: details
    };

    return requestData;
}

export async function createSale(requestData: CreateSaleRequestData) {
    const response = await safeApiRequest<{ id_venta: number }>('post', apiRoutes.sales, requestData);
    return response;
}

export async function facturarVenta(id_venta: number) {
    const response = await safeApiRequest<{message: string, nro_factura: number}>('post', `${apiRoutes.sales}/facturar-venta/${id_venta}`);
    return response;
}

export async function getDataOneSale(id_venta: number) {
    const response = await safeApiRequest<GetOneSaleResponse>('get', `${apiRoutes.sales}/${id_venta}`);
    return response;
}

export async function editSale(id_venta: number, requestData: CreateSaleRequestData) {
    const response = await safeApiRequest('patch', `${apiRoutes.sales}/${id_venta}`, requestData);
    return response;
}

export async function deleteSale(id_venta: number) {
    const response = await safeApiRequest('delete', `${apiRoutes.sales}/${id_venta}`);
    return response;
}

export async function anularFactura(id_venta: number) {
    const response = await safeApiRequest('patch', apiRoutes.anular_factura + id_venta);
    return response;
}

interface GetSalesFilterParams {
    fecha_desde?: string
    fecha_hasta?: string
    id_tipo_factura?: number
    metodo_pago?: string
    estado?: string
    id_usuario?: number
}

export async function getSales(
    page: number,
    filters: GetSalesFilterParams = {}
) {
    const params = new URLSearchParams();

    params.append("page", String(page));

    if (filters.fecha_desde && filters.fecha_desde.trim() !== "") {
        params.append("fecha_desde", filters.fecha_desde.trim());
    }

    if (filters.fecha_hasta && filters.fecha_hasta !== "") {
        params.append("fecha_hasta", String(filters.fecha_hasta));
    }

    if (filters.id_tipo_factura && filters.id_tipo_factura !== 0) {
        params.append("id_tipo_factura", String(filters.id_tipo_factura));
    }

    if (filters.metodo_pago && filters.metodo_pago !== "") {
        params.append("metodo_pago", filters.metodo_pago);
    }

    if (filters.estado && filters.estado !== "") {
        params.append("estado", filters.estado);
    }

    if (filters.id_usuario && filters.id_usuario !== 0) {
        params.append("id_usuario", String(filters.id_usuario));
    }

    const response = await safeApiRequest<ResponseGetAllSales>('get', `${apiRoutes.sales}?${params.toString()}`);
    return response;
}

export function getFirstDayOfCurrentMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);

    const formatted = firstDay.toLocaleDateString('en-CA');
    return formatted;
}