<script lang="ts">
  import type { Column } from "@lib/interfaces/table";

  interface Props {
    columns: Column[]
    hasActions?: boolean 
  };

  let { columns, hasActions = true }: Props = $props(); 
</script>

<thead>
  <tr>
    {#each columns as column (column.key)}
      <th>{column.label}</th>
    {/each}

    {#if hasActions}
      <th></th>
    {/if}
  </tr>
</thead>

<style>
  thead {
    position: sticky;
    top: 0;
    background: var(--text-white);
    color: var(--text-black);
    font-weight: var(--font-weight-semibold);
    box-shadow: -4px 1px 1px 1px var(--color-slate-800);
    z-index: 1;
  }

  thead th {
    padding: var(--space-2) var(--space-4)
  }
</style>