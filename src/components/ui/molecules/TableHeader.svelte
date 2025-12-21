<script lang="ts">
    interface Props {
        columns: string[]
    };

    let { columns }: Props = $props(); 
</script>

<thead>
    <tr>
      {#each columns as column}
        <th>{column}</th>
      {/each}
    </tr>
</thead>

<style>
  thead {
    background-color: var(--color-slate-900);
    color: var(--text-white);
    font-weight: var(--font-weight-semibold);
  }
</style>