export interface BillType {
    [key: string]: string | number
    id: number
    tipo_factura: string
}

export interface FilterSalesParams {
    dateFromInput: string
    dateToInput: string
    selectTypeBillInput: number
    selectUserInput: number
    selectStateInput: string
}

export interface DetailSale {
    id_producto: number
    cod_producto: string
    nombre_producto: string
    precio: number
    precio_sin_iva: string
    iva: string
    cantidad: number
}

export interface SelectProduct {
    [key: string]: string | number
    id: number
    cod_producto: string
    nombre_producto: string
    precio: number
}

export interface FormSaleData {
    id_tipo_factura: number
    fecha_venta: string,
    metodo_pago: string,
    observaciones: string,
    condicion_iva_cliente: string
    tipo_documento_cliente: string
    nro_documento_cliente: string,
    nombre_cliente: string,
    domicilio_cliente: string,
}

export interface CreateSaleRequestData {
    cabecera: {
        id_tipo_factura: number,
        fecha_venta: string,
        id_usuario: number,
        metodo_pago: string,
        estado: string,
        importe_total: number,
        observaciones: string,
        condicion_iva_cliente: string
        tipo_documento_cliente: string
        nro_documento_cliente: string,
        nombre_cliente: string,
        domicilio_cliente: string,
    },
    detalles: {
        cod_producto: string
        nombre_producto: string
        precio: number
        cantidad: number
    }[]
}

export interface GetOneSaleResponse {
    data: {
        id: number 
        fecha_venta: string
        id_tipo_factura: number
        tipo_factura: string
        estado: 'pendiente' | 'emitida' | 'anulada'
        id_usuario: number
        usuario: string
        cae: number
        vto_cae: string
        observaciones: string
        metodo_pago: string
        importe_total: number
        condicion_iva_cliente: string
        tipo_documento_cliente: string
        nro_documento_cliente: string
        nombre_cliente: string
        domicilio_cliente: string
        detalle: {
            cod_producto: string
            nombre_producto: string
            cantidad: number
            precio: number
            subtotal: number
        }[]
    }
}

export interface Sale {
    id: number
    fecha_venta: string
    id_usuario: number,
    usuario: string,
    estado: string,
    nro_factura: number,
    id_tipo_factura: number,
    tipo_factura: string,
    importe_total: number
}

export interface ResponseGetAllSales {
    data: any[]
    current_page: number
    total_pages: number
    total_items: number
}