import type { Action } from "@lib/interfaces/actionsmenu";
import type { BillType } from "../interfaces/interfaces";
import * as XLSX from 'xlsx';
import { get } from "svelte/store";
import { storeSales } from "../store";

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

export function exportSalesExcel(){
  let data = processDataSales(get(storeSales));
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista ventas');
  // Generar un archivo Excel y descargarlo
  XLSX.writeFile(workbook, 'lista_ventas.xlsx');
}

function processDataSales(data: any[]){
  let sales = data.map(venta => {
    return {
      "# ID": venta.id,
      "Estado": venta.estado,
      "Nro. factura": venta.nro_factura,
      "Tipo venta": venta.tipo_factura,
      "Fecha venta": venta.fecha_venta,
      "Importe total": venta.importe_total,
      "CAE": venta.cae,
      "Fecha vto. CAE": venta.vto_cae,
      "Vendedor": venta.usuario
    }
  })

  return sales
}