import type { Action } from "@lib/interfaces/actionsmenu";
import type { BillType } from "../interfaces/interfaces";

export const columns = [
    { key: "id", label: "# ID" },
    { key: "fecha_venta", label: "Fecha" },
    { key: "usuario", label: "Vendedor" },
    { key: "estado", label: "Estado" },
    { key: "nro_factura", label: "Nro. factura" },
    { key: "tipo_factura", label: "Tipo factura" },
    { key: "importe_total", label: "Importe" }
];

export const filterActionsForRow = (row: any, actions: Action[]): Action[] => {
    if (row.estado === "Pendiente") {
        return actions.map((a) => ({
            ...a,
            show: [
                "Editar",
                "Eliminar",
                "Ver detalle",
                "Generar factura",
            ].includes(a.label),
        }));
    }

    if (row.estado === "Emitida") {
        return actions.map((a) => ({
            ...a,
            show: ["Ver detalle", "Anular factura"].includes(a.label),
        }));
    }

    if (row.estado === "Anulada") {
        return actions.map((a) => ({
            ...a,
            show: ["Ver detalle"].includes(a.label),
        }));
    }

    return actions;
}

export const billTypesOptions: BillType[] = [
    {id: 1, tipo_factura: 'A - Responsable inscripto / Monotributista'},
    {id: 2, tipo_factura: 'B -  Consumidor Final / Exento de IVA'},
]

export const customerConditionA = [
    { label: 'Monotributista', value: 'monotributo' },
    { label: 'Responsable inscripto', value: 'resp_inscripto' }
]

export const customerConditionB = [
    { label: 'Consumidor final', value: 'consumidor' },
    { label: 'Exento de IVA', value: 'exento' },
]

export const documentTypeOptions = [
    { label: 'CUIL', value: 'CUIL'},
    { label: 'CUIT', value: 'CUIT'}
]

export const stateOptions = [
    { label: "Pendiente", value: "pendiente" },
    { label: "Emitida", value: "emitida" },
    { label: "Anulada", value: "anulada" }
]

export const paymentMethodsOptions = [
    { label: "Efectivo", value: 'efectivo' },
    { label: "Tarjeta de crédito/débito", value: 'tarjeta' },
    { label: "Transferencia bancaria", value: 'transferencia' }
]