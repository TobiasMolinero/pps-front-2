<script lang="ts">
    import { Heading, Button, PlusIcon, Table } from "@components/ui";
    import { colorTextWhite } from "@lib/utils/constants";
    import { actions, columns, filterActionsForRow } from "@features/ventas/helpers/sales";
    import FilterOptions from "@features/ventas/components/FilterOptions.svelte";
    import type { FilterSalesParams } from "@features/ventas/interfaces/interfaces";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);

    const data: any[] = [
        {
            id: 1,
            fecha_venta: "1/02/2026",
            usuario: "tobias",
            estado: "emitida",
            nro_factura: "-",
            tipo_factura: "C",
            importe_total: 4000,
        },
    ];

    const handleFilter = async ({ 
        dateFromInput,
        dateToInput,
        selectTypeBillInput,
        selectUserInput,
        selectStateInput,
    }: FilterSalesParams) => {
        console.log(dateFromInput);
        console.log(dateToInput);
        console.log(selectTypeBillInput);
        console.log(selectStateInput);
        console.log(selectUserInput);
    }
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
    <Button variant="success">
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />
        {/snippet}
        {#snippet label()}
            Nuevo producto
        {/snippet}
    </Button>
</div>
<Table
    {columns}
    {data}
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
