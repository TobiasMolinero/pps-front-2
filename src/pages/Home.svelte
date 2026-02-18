<script lang="ts">
    import { Heading } from "@components/ui";
    import { getActualMonth, getProductsSinStock, getTopProducts, getVentasMesActual, getVentasPendientes } from "@features/dashboard/helpers/helpers";
    import { user } from "@lib/utils/auth";
    import { onMount } from "svelte";
    import iconWarning from '@assets/icons/warning-fill.svg';
    import iconWarningRed from '@assets/icons/warning-fill-red.svg';
    import { push } from 'svelte-spa-router';
    import { capitalize, formatearFecha, formatMoney } from "@lib/formatters";

    let actualMonth: string = $state("");
    let topProducts: any[] = $state([]);
    let isVentasSinFacturar: boolean = $state(false);
    let isProductsSinStock: boolean = $state(false);
    let ventas: any[] = $state([]);
    let totalVentas: number = $state(0);

    const handleTopProducts = async () => {
        const res = await getTopProducts();
        if(!res.ok) return;

        topProducts = res.data.data
    }

    const handleVentasPendientes = async () => {
        const res = await getVentasPendientes();
        if(!res.ok) return;
        isVentasSinFacturar = res.data.ventas_sin_facturar;
    }

    const handleProductosSinStock = async () => {
        const res = await getProductsSinStock();
        if(!res.ok) return;
        console.log(res)
        isProductsSinStock = res.data.productos_stock_bajo
    }

    const handleTotalVentas = async () => {
        const res = await getVentasMesActual();
        if(!res.ok) return;

        ventas = res.data.data
        console.log(res.data.data)
        totalVentas = ventas.reduce((acumulador: any, venta: any) => {
            return acumulador + Number(venta.importe_total);
        }, 0);
    }

    const navToVentas = () => {
        push('/ventas')
    }

    const navToProducts = () => {
        push('/productos')
    }

    onMount(async () => {
        actualMonth = getActualMonth();
        await handleTopProducts();
        await handleVentasPendientes();
        await handleProductosSinStock();
        await handleTotalVentas();
    })
</script>

<div class="section-container">
    <div class="header">
        <Heading level={2} textAlign="text-start">
            {#snippet children()}
                Bienvenido de vuelta {$user?.nombre}
            {/snippet}
        </Heading>
    </div>
    <div class="section-cards">
        <div class="card total-card">
            <p>Monto total de ventas en {actualMonth}</p>
            <span>{formatMoney(String(totalVentas))}</span>
        </div>
        <div class="card top-products-card">
            <p>Productos más vendidos</p>
            <ul>
                {#each topProducts as product}
                    <p>{product.nombre_producto} - {product.total_vendido}</p>
                {/each}
            </ul>
        </div>
        {#if isVentasSinFacturar}        
            <button class="card sin-facturar-card" onclick={navToVentas}>
                <img src={iconWarning} alt="Icono warning">
                <div>
                    <p>¡Hay ventas sin facturar!</p>
                    <span>
                        Ir a ventas
                    </span>
                </div>
            </button>
        {/if}
        <div class="card table-card">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Metodo de pago</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Vendedor</th>
                        <th>Nro. Factura</th>
                    </tr>
                </thead>
                <tbody>
                    {#each ventas as venta}
                        <tr>
                            <td>{formatearFecha(venta.fecha_venta.substring(0, 10))}</td>
                            <td>{venta.metodo_pago}</td>
                            <td>{formatMoney(venta.importe_total)}</td>
                            <td>{capitalize(venta.estado)}</td>
                            <td>{capitalize(venta.usuario)}</td>
                            <td>{venta.nro_factura || '-'}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {#if isProductsSinStock}        
            <button class="card sin-facturar-card" onclick={navToProducts}>
                <img src={iconWarningRed} alt="Icono warning">
                <div>
                    <p>¡Hay productos sin stock o stock bajo!</p>
                    <span>
                        Ir a productos
                    </span>
                </div>
            </button>
        {/if}
    </div>
</div>

<style>

    .section-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .header {
        padding: var(--space-4);
    }

    .section-cards {
        background: red;
        padding: var(--space-4);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-2);
    }

    .card {
        text-align: start;
        background-color: white;
        border: 1px solid var(--color-slate-400);
        border-radius: var(--radius-button);
        padding: var(--space-4);
        display: flex;
        justify-content: start;
        align-items: center;
        column-gap: var(--space-4);
    }
    .card:hover {
        box-shadow: var(--shadow-hover);
    }

    .total-card {
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: var(--space-2)
    }
    .total-card p, .top-products-card p, .sin-facturar-card p {
        font-size: 1rem;
        font-weight: 500;
    }
    .total-card span {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--color-green-700);
    }

    .top-products-card {
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: var(--space-2);
    }

    .sin-facturar-card {
        display: flex;
        row-gap: var(--space-2);
        cursor: pointer;
    }
    .sin-facturar-card img {
        width: 50px;
    }
    .sin-facturar-card span {
        font-size: 1rem;
        text-decoration: underline;
        cursor: pointer;
    }
    .sin-facturar-card div {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
    }
    
    .table-card {
        grid-column: span 2;
        overflow: auto;
    }

    .table-card table {
        width: 100%;
    }
    .table-card thead th {
        text-align: start;
    }
</style>