<script lang="ts">
    import type { Column } from "@lib/interfaces/table";
    import ActionsMenu from "./ActionsMenu.svelte";

    interface Props<T = Record<string, any>> {
        columns: Column[]
        data: T[]
        actions: any[]
    };

    let { columns, data, actions }: Props = $props();
</script>

<tbody>
    {#each data as row, i(i)}
        <tr>
            {#each columns as column (column.key)}
                <td>{row[column.key]}</td>
            {/each}

            <td>
                <ActionsMenu {actions} />
            </td>
        </tr>
    {/each}
</tbody>

<style>
    tbody td {
        padding: var(--space-3);    
    }

    tbody tr:not(:last-child) {
        border-bottom: 1px solid var(--color-slate-300);
    }
</style>