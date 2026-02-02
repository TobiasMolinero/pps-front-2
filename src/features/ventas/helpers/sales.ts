import type { Action } from "@lib/interfaces/actionsmenu";
import iconReceipt from '@assets/icons/receipt-fill.svg';
import iconReceiptX from '@assets/icons/receipt-x-fill.svg';
import iconEye from "@assets/icons/eye-fill.svg";
import iconTrash from "@assets/icons/trash-fill.svg";
import iconPencil from "@assets/icons/pencil-fill.svg";
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

export const actions: Action[] = [
    {
        icon: iconReceiptX,
        label: "Anular factura",
        show: true,
        onClick: (id: number) => console.log(id),
    },
    {
        icon: iconReceipt,
        label: "Generar factura",
        show: true,
        onClick: (id: number) => console.log(id),
    },
    {
        icon: iconEye,
        label: "Ver detalle",
        show: true,
        onClick: (id: number) => console.log(id),
    },
    {
        icon: iconPencil,
        label: "Editar",
        show: true,
        onClick: (id: number) => console.log(id),
    },
    {
        icon: iconTrash,
        label: "Eliminar",
        show: true,
        onClick: (id: number) => console.log(id),
    },
];

export const filterActionsForRow = (row: any, actions: Action[]): Action[] => {
    if (row.estado === "pendiente") {
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

    if (row.estado === "emitida") {
        return actions.map((a) => ({
            ...a,
            show: ["Ver detalle", "Anular factura"].includes(a.label),
        }));
    }

    if (row.estado === "anulada") {
        return actions.map((a) => ({
            ...a,
            show: ["Ver detalle"].includes(a.label),
        }));
    }

    return actions;
}

export const billTypesOptions: BillType[] = [
    {id: 1, tipo_factura: 'A'},
    {id: 2, tipo_factura: 'B'},
    {id: 3, tipo_factura: 'C'}
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