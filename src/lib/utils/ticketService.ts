import { http } from "@lib/api/axios";
import { apiRoutes } from "@lib/api/endpoints";

export async function openTicketInNewTab(id_venta: number) {
  const res = await http.get(`${apiRoutes.sales}/${id_venta}/ticket`, {
    responseType: "blob",
    headers: { "Content-Type": "" }
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(blob);
  const newWindow = window.open(pdfUrl, "_blank");
  newWindow?.print();
}

export async function openBillInNewTab(id_venta: number) {
  const res = await http.get(`${apiRoutes.sales}/${id_venta}/bill`, {
    responseType: "blob",
    headers: { "Content-Type": "" }
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(blob);
  window.open(pdfUrl, "_blank");
}

/**
 * Obtiene el ticket y devuelve una URL temporal (para usar dentro de un modal o <iframe>)
 */
export async function getBillUrl(id_venta: number): Promise<string> {
  const res = await http.get(`${apiRoutes.sales}/${id_venta}/bill`, {
    responseType: "blob",
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}