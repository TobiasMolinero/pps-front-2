<script lang="ts">
    import { Button, Heading, Table } from "@components/ui";
    import ExcelIcon from "@components/ui/atoms/DynamicIcons/ExcelIcon.svelte";
    import FilterOptions from "@features/notas/components/FilterOptions.svelte";
    import { exportNotesExcel, getNotas } from "@features/notas/helpers/notas";
    import { updateNotes, storeNotes } from "@features/notas/store";
    import { formatearFecha, formatMoney } from "@lib/formatters";
    import { alert_error } from "@lib/utils/alerts";
    import { onMount } from "svelte";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);

    let selectValue: number = $state(0);

    const columns = [
        { key: "nro_nota", label: "Nro. Nota" },
        { key: "fecha", label: "Fecha" },
        { key: "tipo_nota", label: "Cbt. Tipo" },
        { key: "nro_factura", label: "Nro. factura asociada" },
        { key: "importe_total", label: "Total" },
        { key: "cae", label: "CAE" },
        { key: "vto_cae", label: "Vto. CAE" },
    ];

    const options = [
        {value: 1, label: "Notas A"},
        {value: 2, label: "Notas B"},
    ]

    const handleFilter = async (page: number) => {
        const filters = { id_tipo_factura: selectValue };

        const res = await getNotas(page, filters);

        if (!res.ok) return await alert_error.fire({ text: res.message });

        const data = res.data.data;
        $storeNotes = data.map(nota => ({
            ...nota,
            fecha: formatearFecha(nota.fecha.substring(0, 10)),
            importe_total: formatMoney(String(nota.importe_total)),
            vto_cae: formatearFecha(nota.vto_cae.substring(0, 10))
        }));
    }
    
    const handleCleanFilter = async () => {
        selectValue = 0;
        await handleFilter(1);
    }

    const reloadingNotes = async () => {
        await handleFilter(1);
        $updateNotes = false;
    }

    $effect(() => {
        if($updateNotes) {
            reloadingNotes();
        }
    })

    onMount(async() => {
        await handleFilter(1);
    })
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Facturadas anuladas
        {/snippet}
    </Heading>
</div>
<div class="menu">
    <FilterOptions
        bind:selectValue={selectValue}
        options={options}
        onFilter={() => handleFilter(1)}
        onCleanFilter={handleCleanFilter}
    />
    <Button variant="primary" type="button" onclick={exportNotesExcel}>
        {#snippet icon()}
            <ExcelIcon />
        {/snippet}
        {#snippet label()}
            Exportar excel
        {/snippet}
    </Button>
</div>
<Table {columns} {currentPage} {totalPages} data={$storeNotes} onClick={(page: number) => handleFilter(page)} actions={[]}/>
    
<style>
    .title-container {
        padding: var(--space-2);
    }

    .menu {
        display: flex;
        justify-content: end;
        align-items: end;
        padding: var(--space-4);
    }
</style>