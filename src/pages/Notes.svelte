<script lang="ts">
    import { Heading, Table } from "@components/ui";
    import { getNotas } from "@features/notas/helpers/notas";
    import { storeNotes } from "@features/notas/store";
    import { formatMoney } from "@lib/formatters";
    import { alert_error } from "@lib/utils/alerts";
    import { onMount } from "svelte";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);

    const columns = [
        { key: "nro_nota", label: "Nro. Nota" },
        { key: "fecha", label: "Fecha" },
        { key: "tipo_nota", label: "Cbt. Tipo" },
        { key: "nro_factura", label: "Nro. factura asociada" },
        { key: "importe_total", label: "Total" },
    ];

    const loadingNotes = async (page: number) => {
        const res = await getNotas(page);

        if (!res.ok) return await alert_error.fire({ text: res.message });

        const data = res.data.data;
        $storeNotes = data.map(nota => ({
            ...nota,
            fecha: nota.fecha.substring(0, 10),
            importe_total: formatMoney(String(nota.importe_total))
        }));
    }

    onMount(async() => {
        await loadingNotes(currentPage);
    })
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Facturadas anuladas
        {/snippet}
    </Heading>
</div>
<Table {columns} {currentPage} {totalPages} data={$storeNotes} onClick={(page: number) => loadingNotes(page)} actions={[]}/>
    
<style>
    .title-container {
        padding: var(--space-2);
    }
</style>