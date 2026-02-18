import { apiRoutes } from "@lib/api/endpoints";
import { safeApiRequest } from "@lib/api/safeApiRequest";
import type { ResponseGetAllNotes } from "../interfaces/interfaces";
import * as XLSX from 'xlsx';
import { storeNotes } from "../store";
import { get } from "svelte/store";

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

export function exportNotesExcel(){
  let data = processDataNotes(get(storeNotes));
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista facturas anuladas');
  // Generar un archivo Excel y descargarlo
  XLSX.writeFile(workbook, 'lista_notas.xlsx');
}

function processDataNotes(data: any[]){
  let notes = data.map(nota => {
    return {
      "# ID": nota.id,
      "Nro. Nota": nota.nro_nota,
      "Tipo nota": nota.tipo_nota,
      "Factura asociada": nota.nro_factura,
      "Importe total": nota.importe_total,
      "CAE": nota.cae,
      "Fecha vto. CAE": nota.vto_cae
    }
  })

  return notes
}