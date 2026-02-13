<script lang="ts">
    import iconReceipt from "@assets/icons/receipt-fill.svg";
    import iconReceiptX from "@assets/icons/receipt-x-fill.svg";
    import iconEye from "@assets/icons/eye-fill.svg";
    import iconTrash from "@assets/icons/trash-fill.svg";
    import iconPencil from "@assets/icons/pencil-fill.svg";
    import { Heading, Button, PlusIcon, Table } from "@components/ui";
    import { colorTextWhite } from "@lib/utils/constants";
    import {
        columns,
        filterActionsForRow,
    } from "@features/ventas/helpers/sales";
    import FilterOptions from "@features/ventas/components/FilterOptions.svelte";
    import type { FilterSalesParams } from "@features/ventas/interfaces/interfaces";
    import { storeSales, updateSales } from "@features/ventas/store";
    import { alert_error, loading, success, warning } from "@lib/utils/alerts";
    import {
    anularFactura,
    deleteSale,
        facturarVenta,
        getFirstDayOfCurrentMonth,
        getSales,
    } from "@features/ventas/helpers/helpers";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import type { Action } from "@lib/interfaces/actionsmenu";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    let firstDayOfMonth: string = $state("");
    let currentDay: string = $state("");

    const actions: Action[] = [
        {
            icon: iconReceiptX,
            label: "Anular factura",
            show: true,
            onClick: (id: number) => handleAnularFactura(id),
        },
        {
            icon: iconReceipt,
            label: "Generar factura",
            show: true,
            onClick: (id: number) => handleFacturacion(id),
        },
        {
            icon: iconEye,
            label: "Ver detalle",
            show: true,
            onClick: (id: number) => push(`/detalle-venta?id=${id}`),
        },
        {
            icon: iconPencil,
            label: "Editar",
            show: true,
            onClick: (id: number) => push(`/editar-venta?id=${id}`),
        },
        {
            icon: iconTrash,
            label: "Eliminar",
            show: true,
            onClick: (id: number) => handleDelete(id),
        },
    ];

    const loadingSales = async (page: number) => {
        const res = await getSales(page, {
            fecha_desde: firstDayOfMonth,
            fecha_hasta: currentDay,
        });

        if (!res.ok) return await alert_error.fire({ text: res.message });

        $storeSales = res.data.data.map((sale) => ({
            ...sale,
            nro_factura: sale.nro_factura || "-",
            fecha_venta: sale.fecha_venta.substring(0, 10),
        }));

        currentPage = res.data.current_page;
        totalPages = res.data.total_pages;
    };

    const handleFilter = async ({
        dateFromInput,
        dateToInput,
        selectTypeBillInput,
        selectUserInput,
        selectStateInput,
    }: FilterSalesParams) => {
        const res = await getSales(currentPage, {
            fecha_desde: dateFromInput,
            fecha_hasta: dateToInput,
            id_tipo_factura: selectTypeBillInput,
            id_usuario: selectUserInput,
            estado: selectStateInput,
        });

        if (!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        $storeSales = res.data.data.map((sale) => ({
            ...sale,
            nro_factura: sale.nro_factura || "-",
            fecha_venta: sale.fecha_venta.substring(0, 10),
        }));

        currentPage = res.data.current_page;
        totalPages = res.data.total_pages;
    };

    const handleReload = async () => {
        await loadingSales(currentPage);
        $updateSales = false;
    };

    const navToNewSale = () => {
        push("/registrar-venta");
    };

    const handleDelete = async (id: number) => {
        console.log(id)
        const alertResolve = await warning.fire({
            text: "¿Está seguro que desea eliminar este producto?",
        });

        if (!alertResolve.isConfirmed) return;

        loading.fire();

        const res = await deleteSale(id);

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        await success.fire({ text: "El producto fue eliminado correctamente." });

        if ($storeSales.length === 1 && currentPage > 1) {
            currentPage--;
        }

        await handleReload();
    };

    const handleFacturacion = async (id: number) => {
        loading.fire();
        const res = await facturarVenta(id);
        if(!res.ok) return await alert_error.fire({ text: res.message });

        await success.fire({ text: 'Venta facturada con exito' });
        $updateSales = true;
    }

    const handleAnularFactura = async (id: number) => {
        loading.fire();
        const res = await anularFactura(id);
        if(!res.ok) return await alert_error.fire({ text: res.message });

        await success.fire({ text: 'La factura fue anulada. Se creo una nota de crédito por esta operación' });
        $updateSales = true;
    }

    $effect(() => {
        if ($updateSales) {
            handleReload();
        }
    });

    onMount(async () => {
        firstDayOfMonth = getFirstDayOfCurrentMonth();
        currentDay = new Date().toISOString().split("T")[0];
        await loadingSales(currentPage);
    });
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Ventas
        {/snippet}
    </Heading>
</div>
<div class="ventas-menu">
    <FilterOptions onFilter={handleFilter} />
    <Button variant="success" onclick={navToNewSale}>
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />
        {/snippet}
        {#snippet label()}
            Registrar venta
        {/snippet}
    </Button>
</div>
<Table
    {columns}
    data={$storeSales}
    {actions}
    {currentPage}
    {totalPages}
    filterActions={filterActionsForRow}
    onClick={(page: number) => console.log(page)}
/>

<style>
    .title-container {
        padding: 0 var(--space-2);
    }

    .ventas-menu {
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding: var(--space-4);
    }
</style>
