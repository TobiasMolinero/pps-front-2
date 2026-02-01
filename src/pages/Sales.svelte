<script lang="ts">
    import { Heading, Button, PlusIcon, Table } from "@components/ui";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import { colorTextWhite } from "@lib/utils/constants";
    import iconReceipt from '@assets/icons/receipt-fill.svg';
    import iconReceiptX from '@assets/icons/receipt-x-fill.svg';
    import iconEye from "@assets/icons/eye-fill.svg";
    import iconTrash from "@assets/icons/trash-fill.svg";
    import iconPencil from "@assets/icons/pencil-fill.svg";
    import FilterOptions from "@features/ventas/components/FilterOptions.svelte";
    import type { BillType } from "@features/ventas/interfaces/interfaces";
    import { billsTypes } from "@features/ventas/store";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);

    const columns = [
        { key: "id", label: "# ID" },
        { key: "fecha_venta", label: "Fecha" },
        { key: "usuario", label: "Vendedor" },
        { key: "estado", label: "Estado" },
        { key: "nro_factura", label: "Nro. factura" },
        { key: "tipo_factura", label: "Tipo factura"},
        { key: "importe_total", label: "Importe" }
    ];

    const actions: Action[] = [
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

    const filterActionsForRow = (row: any, actions: Action[]): Action[] => {
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

    const billTypesOptions: BillType[] = [
        {id: 1, tipo_factura: 'A'},
        {id: 2, tipo_factura: 'B'},
        {id: 3, tipo_factura: 'C'}
    ]

    const handleFilter = async ({ 
        dateFromInput,
        dateToInput,
        selectTypeBillInput,
        selectUserInput,
        selectStateInput,
        billNumberInput
    }: {
        dateFromInput: string
        dateToInput: string
        selectTypeBillInput: number
        selectUserInput: number
        selectStateInput: string
        billNumberInput: string
    }) => {}
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Ventas
        {/snippet}
    </Heading>
</div>
<div class="ventas-menu">
    <FilterOptions options={billTypesOptions} onFilter={handleFilter} />
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
