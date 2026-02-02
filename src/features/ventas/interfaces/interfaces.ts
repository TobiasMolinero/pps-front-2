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