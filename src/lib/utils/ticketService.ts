import { http } from "@lib/api/axios";
import { apiRoutes } from "@lib/api/endpoints";

/**
 * Obtiene el ticket en formato PDF y lo abre en una nueva pestaña.
 */
export async function openTicketInNewTab(id_venta: number) {
  const newWindow = window.open("", "_blank");

  if (newWindow) {
    // 2️⃣ Crear contenido inicial del documento (loader)
    const doc = newWindow.document;
    doc.title = 'Generando ticket...'
    // const html = doc.documentElement;
    // const head = doc.createElement("head");
    // const body = doc.createElement("body");

    // Estilos
    const style = doc.createElement("style");
    style.textContent = `
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
      background: #fff;
    }
    h2 {
      color: #222;
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
      font-size: 0.95rem;
      margin-top: 0;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #ccc;
      border-top-color: #333;
      border-radius: 50%;
      margin: 1rem auto;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
    doc.head.appendChild(style);

    // Contenido principal
    // 3️⃣ Contenido inicial del loader
    const heading = doc.createElement("h2");
    heading.textContent = "Generando ticket...";

    const spinner = doc.createElement("div");
    spinner.classList.add("spinner");

    const text = doc.createElement("p");
    text.textContent = "Por favor espere unos segundos.";

    doc.body.append(heading, spinner, text);
  }

  try {
    const res = await http.get(`${apiRoutes.sales}/${id_venta}/ticket`, {
      responseType: "blob",
      headers: { "Content-Type": "" }
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);

    if (newWindow) {
      newWindow.location.href = pdfUrl;
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 10_000);
    }
  } catch (error) {
    console.error(error);
    if (newWindow) newWindow.close();
  }
  // console.log(blob)
  // console.log(pdfUrl);
  // window.open(pdfUrl, "_blank");
}

export async function openBillInNewTab(id_venta: number) {
  const res = await http.get(`${apiRoutes.sales}/${id_venta}/bill`, {
    responseType: "blob",
    headers: { "Content-Type": "" }
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(blob);
  console.log(blob)
  console.log(pdfUrl)
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