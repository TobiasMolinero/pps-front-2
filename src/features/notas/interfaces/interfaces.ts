export interface ResponseGetAllNotes {
    data: Nota[]
    current_page: number
    total_pages: number
    total_items: number
}

export interface Nota {
    id: number,
    nro_nota: number,
    id_tipo_factura: number,
    tipo_nota: string,
    fecha: string,
    id_venta: number,
    nro_factura: number,
    importe_total: string,
    cae: string,
    vto_cae: string
}