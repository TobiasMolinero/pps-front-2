<script lang="ts">
    import Table from "@components/ui/organisms/Table.svelte";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import iconTrash from '@assets/icons/trash-fill.svg';
    import iconPencil from '@assets/icons/pencil-fill.svg';
    import iconStock from '@assets/icons/add-stock.svg'
    import { Button, PlusIcon } from "@components/ui";
    import { colorTextWhite } from "@lib/helpers/constants";
    import { onMount } from "svelte";
    import { products } from "@stores/products";
    import { getProducts } from "@lib/helpers/products";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    
    const columns = [
        {key: 'cod_producto', label: 'Cod. Producto'},
        {key: 'nombre_producto', label: 'Nombre'},
        {key: 'categoria', label: 'Categoría'},
        {key: 'descripcion', label: 'Descripción'},
        {key: 'precio', label: 'Precio'},
        {key: 'stock', label: 'Stock'},
    ]
    
    const actions: Action[] = [
        {icon: iconStock, label: 'Ingresar stock', onClick: () => console.log('Modificar stock')},
        {icon: iconPencil, label: 'Editar', onClick: () => console.log('Editar registro')},
        {icon: iconTrash, label: 'Eliminar', onClick: () => console.log('Eliminar registro')},
    ]
    
    onMount(async () => {
        const res = await getProducts(currentPage);
        if(res) {
            $products = res.data;
            currentPage = res.current_page;
            totalPages = res.total_pages;
        }
    })
</script>

<h1>Productos</h1>
<div class="products-menu">
    <div></div>
    <Button variant="success" onclick={() => console.log('hola')}>
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />  
        {/snippet}
        {#snippet label()}
            Nuevo producto
        {/snippet}
    </Button>
</div>
<Table {columns} data={$products} {actions} {totalPages} {currentPage} />

<style>
    .products-menu {
        display: flex;
        justify-content: space-between;
        padding: var(--space-4);
    }
</style>