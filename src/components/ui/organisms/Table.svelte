<script lang="ts">
    import { TableBody, TableFooter, TableHeader } from "../molecules";

    interface Props {
        columns: string[]
    };

    let { columns = ['caca'] }: Props = $props(); 
</script>

<table>
    <TableHeader columns={columns} />
    <TableBody />
    <TableFooter />
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
</style>