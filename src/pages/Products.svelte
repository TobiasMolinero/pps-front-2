<script lang="ts">
    import { onMount } from "svelte";
    import { formatMoney } from "@lib/formatters";
    import { Button, PlusIcon } from "@components/ui";
    import iconStock from '@assets/icons/add-stock.svg';
    import iconTrash from '@assets/icons/trash-fill.svg';
    import { products, reloadProducts } from "@features/productos/store";
    import iconPencil from '@assets/icons/pencil-fill.svg';
    import { colorTextWhite } from "@lib/helpers/constants";
    import Table from "@components/ui/organisms/Table.svelte";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import { deleteProduct, getProducts } from "@features/productos/helpers/products";
    import FormProduct from "@features/productos/components/FormProduct.svelte";
    import FormAddStock from "@features/productos/components/FormAddStock.svelte";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    let formStockIsOpen: boolean = $state(false);
    let formProductIsOpen: boolean = $state(false);
    let formProductIsEdit: boolean = $state(false);
    let productID: number = $state(0);
    
    const columns = [
        {key: 'cod_producto', label: 'Cod. Producto'},
        {key: 'nombre_producto', label: 'Nombre'},
        {key: 'categoria', label: 'Categoría'},
        {key: 'descripcion', label: 'Descripción'},
        {key: 'precio', label: 'Precio'},
        {key: 'stock', label: 'Stock'},
    ]
    
    const actions: Action[] = [
        {icon: iconStock, label: 'Ingresar stock', onClick: (id: number) => handleStockForm(id)},
        {icon: iconPencil, label: 'Editar', onClick: (id: number) => handleFormEdit(id)},
        {icon: iconTrash, label: 'Eliminar', onClick: (id: number) => handleDelete(id)},
    ]

    const handleProductForm = () => {
        formProductIsOpen = !formProductIsOpen;
        if(formProductIsEdit) {
            formProductIsEdit = false;
            productID = 0;
        }
    }

    const handleStockForm = (id: number) => {
        formStockIsOpen = !formStockIsOpen;
        productID = id;
    }

    const loadingProducts = async (page: number) => {
        const res = await getProducts(page);
        if(res) {
            $products = res.data.map(product => {
                return {
                    ...product,
                    descripcion: product.descripcion || '-',
                    stock: product.stock || 0,
                    precio: formatMoney(String(product.precio))
                }
            })
            currentPage = res.current_page;
            totalPages = res.total_pages;
        }
    }

    const handleDelete = async (id: number) => {
        const res = await deleteProduct(id);

        if(!res) return;

        alert('El producto fue eliminado correctamente.');

        if($products.length === 1 && currentPage > 1) {
            currentPage--;
        }

        await handleReload()
    }

    const handleFormEdit = (id: number) => {
        productID = id;
        formProductIsEdit = true;
        formProductIsOpen = true;
    }

    const handleReload = async () => {
        await loadingProducts(currentPage);
        $reloadProducts = false;
    } 

    $effect(() => {
        if($reloadProducts) {
            handleReload();
        }
    })

    onMount(async () => {
        await loadingProducts(currentPage);
    })
</script>

<h1>Productos</h1>
<div class="products-menu">
    <div></div>
    <Button variant="success" onclick={handleProductForm}>
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />  
        {/snippet}
        {#snippet label()}
            Nuevo producto
        {/snippet}
    </Button>
</div>
<Table {columns} data={$products} {actions} {totalPages} {currentPage} onClick={(page: number) => loadingProducts(page)} />

{#if formProductIsOpen}
    <FormProduct isEditMode={formProductIsEdit} onClose={handleProductForm} {productID} />
{/if}

{#if formStockIsOpen}
    <FormAddStock onClose={handleStockForm} {productID} />
{/if}


<style>
    .products-menu {
        display: flex;
        justify-content: space-between;
        padding: var(--space-4);
    }
</style>