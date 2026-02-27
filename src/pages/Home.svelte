<script lang="ts">
    import { Heading } from "@components/ui";
    import { getActualMonth, getProductsSinStock, getTopProducts, getVentasMesActual, getVentasPendientes } from "@features/dashboard/helpers/helpers";
    import { user } from "@lib/utils/auth";
    import { onMount } from "svelte";
    import iconWarning from '@assets/icons/warning-fill.svg';
    import iconWarningRed from '@assets/icons/warning-fill-red.svg';
    import { push } from 'svelte-spa-router';
    import { formatMoney } from "@lib/formatters";

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

<div class="header">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Bienvenido de vuelta {$user?.nombre}
        {/snippet}
    </Heading>
</div>
<div class="section-cards">
    {#if $user?.rol_usuario === 'admin'}
        <div class="card total-card">
            <p>Monto total de ventas en {actualMonth}</p>
            <span>{formatMoney(String(totalVentas))}</span>
            <a href="/#/ventas">Ver ventas</a>
        </div>
    {/if}
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
    {#if isProductsSinStock && $user?.rol_usuario === 'admin' && isVentasSinFacturar}        
    <button class="card sin-stock-card" onclick={navToProducts}>
        <img src={iconWarningRed} alt="Icono warning">
        <div>
            <p>¡Hay productos sin stock/stock bajo!</p>
            <span>
                Ir a productos
            </span>
        </div>
    </button>
    {/if}
    <div class="card top-products-card">
        <p>Productos más vendidos</p>
        <ul>
            {#each topProducts as product}
                <p>{product.nombre_producto} - <span>{product.total_vendido} uds</span></p>
            {/each}
        </ul>
    </div>
</div>
    
<style>
    .header {
        padding: var(--space-4);
    }

    .section-cards {
        flex: 1;
        min-height: 0;
        padding: var(--space-4);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 150px);
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
        min-height: 150px;
    }
    .card:hover {
        box-shadow: var(--shadow-hover);
    }

    .total-card {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        row-gap: var(--space-2)
    }
    .total-card p, .top-products-card > p, .sin-facturar-card p {
        font-size: 1rem;
        font-weight: 500;
    }
    .total-card span {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--color-green-700);
    }
    .total-card a {
        color: var(--text-black);
        font-size: 0.8rem;
    }

    .top-products-card {
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: var(--space-2);
        grid-column: span 2;
        overflow-y: auto;
    }

    .top-products-card span {
        font-weight: 600;
    }

    .sin-facturar-card, .sin-stock-card {
        display: flex;
        row-gap: var(--space-2);
        cursor: pointer;
    }
    .sin-facturar-card img, .sin-stock-card img {
        width: 50px;
    }
    .sin-facturar-card span, .sin-stock-card span {
        font-size: 0.8rem;
        text-decoration: underline;
        cursor: pointer;
    }
    .sin-facturar-card div, .sin-stock-card div {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
    }

    .sin-stock-card {
        place-self: start;
        width: 100%;
    }
    .sin-stock-card p {
        font-size: 1rem;
        font-weight: 500;
    }
</style>