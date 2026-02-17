<script lang=ts>
    import { Button, Icon } from '@components/ui';
    import { apiRoutes } from '@lib/api/endpoints';
    import { safeApiRequest } from '@lib/api/safeApiRequest';
    import { alert_error, loading } from '@lib/utils/alerts';
    import { onMount } from 'svelte';
    import { push, querystring } from 'svelte-spa-router';
    import iconPrint from '@assets/icons/printer-fill-white.svg';
    import { openBillInNewTab } from '@lib/utils/ticketService';

    let saleID: number = $state(0);
    let detailSale: any[] = $state([]);
    
    let subTotal: number = $state(0)
    let iva: number = $state(0)
    let total: number = $state(0)

    const formatearNumeroConPuntos = (numero: number) => {
        let [entero, decimal] = numero.toFixed(2).toString().split('.')
        entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        return decimal && decimal !== "00" ? `${entero},${decimal}` : entero
    }

    const handleGenerateBill = async () => {
        loading.fire();

        await openBillInNewTab(saleID);

        loading.close();
    }

    onMount(async () => {
        saleID = Number($querystring?.split("=")[1]);
        const res = await safeApiRequest<any>('get', `${apiRoutes.sales}/${saleID}`);
        if (!res.ok) return await alert_error.fire({ text: res.message });
        
        detailSale.push(res.data.data);
        
        if(detailSale[0].id_tipo_factura === 1 || detailSale[0].id_tipo_factura === 2) {
            total = Number(detailSale[0].importe_total);
            iva = total * 0.21;
            subTotal = total - iva;
        } else {
            iva = 0;
            total = Number(detailSale[0].importe_total);
            subTotal = total;
        }
    })
</script>

<div class="gral-container">
    <button onclick={() => push(`/ventas`)} title="Volver a ventas" class="back-button">Volver a ventas</button>
    <div class="detail-container">
        {#if detailSale}
            {#each detailSale as item}
                <div class="container-nro-factura">Nro. comprobante: <span class="nro-factura">#{item.nro_factura || '434'}</span></div>
                <div class="container-cae">
                    <div>C.A.E.: <span class="font-[400]">{item.cae || '-'}</span></div>
                    <div>Fecha vto. C.A.E.: <span class="font-[400]">{item.vto_cae ? item.vto_cae.substring(0, 10) : '-'}</span></div>
                </div>
                <div class="tipo-factura">
                    <div class="">
                        <span>Factura tipo</span>
                        <span style="font-size: 50px;">{item.tipo_factura ?? "-"}</span>
                    </div>
                </div>
                <div class="datos-empresa">
                    <div>Nombre de Empresa: <span>Empresa ficticia</span></div>
                    <div>Domicilio comercial: <span>Dirección 1234</span></div>
                    <div>Condición frente al IVA: <span>Responsable Inscripto</span></div>
                </div>
                <div class="datos-cliente">
                    <h3>Datos del cliente</h3>
                    <div>
                        <div class="datos-cliente_item">Nro. documento: <span> {Number(item.nro_documento_cliente) === 0 ? '-' : item.nro_documento_cliente} </span></div>
                        <div class="datos-cliente_item">Nombre: <span> {item.nombre_cliente || '-'} </span></div>
                        <div class="datos-cliente_item">Domicilio: <span> {item.domicilio_cliente || '-'} </span></div>
                    </div>
                </div>
                <div class="container-detalle-venta">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="padding-left: 5px;">Cod. Producto</th>
                                <th>Nombre Producto</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each item.detalle as detalle}                            
                                <tr>
                                    <td style="padding-left: 5px;">{detalle.cod_producto}</td>
                                    <td>{detalle.nombre_producto}</td>
                                    <td>$ {detalle.precio}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>{detalle.precio * detalle.cantidad}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <footer>
                    <Button variant="primary" type="button" onclick={handleGenerateBill}>
                        {#snippet icon()}
                            <Icon src={iconPrint} />
                        {/snippet}
                        {#snippet label()}
                            Generar comprobante
                        {/snippet}
                    </Button>
                    <div class="importes">
                        <div>
                            <span class="text-slate-800 font-[700]">Sub Total:</span>
                            <span class="w-[150px] text-end text-[18px] font-[700]">$ {formatearNumeroConPuntos(subTotal)}</span>
                        </div>
                        <div>
                            <span class="text-slate-800 font-[700]">IVA 21%:</span>
                            <span class="w-[150px] text-end text-[18px] font-[700]">$ {formatearNumeroConPuntos(iva)}</span>
                        </div>
                        <div>
                            <span class="text-slate-800 font-[700]">Monto total:</span>
                            <span class="w-[150px] text-end text-[18px] font-[700]">$ {formatearNumeroConPuntos(total)}</span>
                        </div>
                    </div>
                </footer>
            {/each}
        {/if}
    </div>
</div>

<style>
    .gral-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
        padding: 20px;
        overflow: auto;
    }

    .back-button {
        font-size: 14px;
        align-self: start;
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
        border: none
    }

    .detail-container {
        position: relative;
        width: 750px;
        padding: 10px;
        background-color: #e6dfdf;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    
    .container-nro-factura {
        position: absolute;
        top: 20px;
        left: 20px;
        font-weight: 600;
    }
    .nro-factura {
        font-weight: 400;
        font-size: 20px;
    }

    .container-cae {
        position: absolute;
        top: 20px;
        right: 20px;
    }
    .container-cae > div {
        font-weight: 600;
    }
    .container-cae span {
        font-weight: 400;
    }

    .tipo-factura {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tipo-factura > div {
        width: 150px;
        border: 1px solid var(--color-slate-700);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .tipo-factura span {
        font: 600;
    }

    .datos-empresa > div {
        padding: 2px 0;
        font-weight: 600;
    }
    .datos-empresa span {
        font-weight: 400;
    }

    .datos-cliente > div {
        border: 1px solid var(--color-slate-400);
        border-radius: 7px;
        padding: 10px;
        display: flex;
        column-gap: 20px;
        row-gap: 10px;
        flex-wrap: wrap;
    }
    .datos-cliente_item {
        font-weight: 600;
    }
    .datos-cliente_item span {
        font-weight: 400;
    }

    .container-detalle-venta {
        background: white;
        overflow-x: auto;
        border: 1px solid #00000050;
        border-radius: 10px;
    }
    .table {
        width: 100%;
        position: relative;
        border-collapse: collapse;
    }
    .table thead {
        position: sticky;
        top: 0;
        background: white;
        box-shadow: -4px 1px 1px 1px #0f172a;
    }
    .table thead tr {
        padding: 10px 0;
        color: var(--text-black);
    }
    .table thead tr th {
        text-align: start;
    }

    .table tbody {
        font-size: 14px;
        font-weight: 500;
    }   
    .table tbody tr {
        border-bottom: 1px solid var(--color-slate-50)
    }
    .table tbody tr td {
        padding: 10px 0;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .importes {
        /* flex-col *:pt-[10px] *:flex *:justify-end *:items-end *:gap-x-[40px] */
        display: flex;
        flex-direction: column;
    } 
    .importes > div {
        padding-top: 10px;
        display: flex;
        justify-content: end;
        align-items: end;
        column-gap: 40px;
    }
</style>