<script lang="ts">
    import { onMount } from "svelte";
    import { formatMoney } from "@lib/formatters";
    import { Button, Heading, PlusIcon } from "@components/ui";
    import iconStock from "@assets/icons/add-stock.svg";
    import iconTrash from "@assets/icons/trash-fill.svg";
    import {
        products,
        productsCategories,
        reloadProducts,
    } from "@features/productos/store";
    import iconPencil from "@assets/icons/pencil-fill.svg";
    import { colorTextWhite } from "@lib/utils/constants";
    import Table from "@components/ui/organisms/Table.svelte";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import {
        deleteProduct,
        filterActionsProductsByRol,
        getCategories,
        getProducts,
    } from "@features/productos/helpers/products";
    import FormProduct from "@features/productos/components/FormProduct.svelte";
    import FormAddStock from "@features/productos/components/FormAddStock.svelte";
    import FilterOptions from "@features/productos/components/FilterOptions.svelte";
    import { alert_error, loading, success, warning } from "@lib/utils/alerts";
    import { user } from "@lib/utils/auth";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    let formStockIsOpen: boolean = $state(false);
    let formProductIsOpen: boolean = $state(false);
    let formProductIsEdit: boolean = $state(false);
    let productID: number = $state(0);

    let inputSearchValue: string = $state("");
    let selectCategoryValue: number = $state(0);

    const columns = [
        { key: "cod_producto", label: "Cod. Producto" },
        { key: "nombre_producto", label: "Nombre" },
        { key: "categoria", label: "Categoría" },
        { key: "descripcion", label: "Descripción" },
        { key: "precio", label: "Precio" },
        { key: "stock", label: "Stock" },
    ];

    const actions: Action[] = [
        {
            icon: iconStock,
            label: "Ingresar stock",
            onClick: (id: number) => handleStockForm(id),
            show: true
        },
        {
            icon: iconPencil,
            label: "Editar",
            onClick: (id: number) => handleFormEdit(id),
            show: true
        },
        {
            icon: iconTrash,
            label: "Eliminar",
            onClick: (id: number) => handleDelete(id),
            show: true
        },
    ];

    const handleProductForm = () => {
        formProductIsOpen = !formProductIsOpen;
        if (formProductIsEdit) {
            formProductIsEdit = false;
            productID = 0;
        }
    };

    const handleStockForm = (id: number) => {
        formStockIsOpen = !formStockIsOpen;
        productID = id;
    };

    // const loadingProducts = async (page: number) => {
    //     const res = await getProducts(page);

    //     if (!res.ok) {
    //         alert_error.fire({ text: res.message });
    //         return;
    //     }

    //     $products = res.data.data.map((product) => {
    //         return {
    //             ...product,
    //             descripcion: product.descripcion || "-",
    //             stock: product.stock || 0,
    //             precio: formatMoney(String(product.precio)),
    //         };
    //     });
    //     currentPage = res.data.current_page;
    //     totalPages = res.data.total_pages;
    // };

    const handleFilter = async (page: number) => {
        const res = await getProducts(page, {
            search: inputSearchValue,
            category: selectCategoryValue,
        });

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        $products = res.data.data.map((product) => ({
            ...product,
            descripcion: product.descripcion || "-",
            stock: product.stock || 0,
            precio: formatMoney(String(product.precio)),
        }));
        currentPage = res.data.current_page;
        totalPages = res.data.total_pages;
    };

    const handleCleanFilter = async () => {
        inputSearchValue = "";
        selectCategoryValue = 0;
        await handleFilter(1);
    }

    const loadingCategories = async () => {
        const res = await getCategories();

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        $productsCategories = res.data.data;
    };

    const handleDelete = async (id: number) => {
        const alertResolve = await warning.fire({
            text: "¿Está seguro que desea eliminar este producto?",
        });

        if (!alertResolve.isConfirmed) return;

        loading.fire();
        
        const res = await deleteProduct(id);

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        success.fire({ text: "El producto fue eliminado correctamente." });

        if ($products.length === 1 && currentPage > 1) {
            currentPage--;
        }

        await handleReload();
    };

    const handleFormEdit = (id: number) => {
        productID = id;
        formProductIsEdit = true;
        formProductIsOpen = true;
    };

    const handleReload = async () => {
        await handleFilter(1);
        $reloadProducts = false;
    };

    $effect(() => {
        if ($reloadProducts) {
            handleReload();
        }
    });

    onMount(async () => {
        await handleFilter(1);
        await loadingCategories();
    });
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Productos
        {/snippet}
    </Heading>
</div>
<div class="products-menu">
    <FilterOptions
        bind:inputValue={inputSearchValue}
        bind:selectValue={selectCategoryValue}
        options={$productsCategories}
        onFilter={() => handleFilter(1)}
        onCleanFilter={handleCleanFilter}
    />
    {#if $user?.rol_usuario === 'admin'}    
        <Button variant="success" onclick={handleProductForm}>
            {#snippet icon()}
                <PlusIcon width={24} height={24} color={colorTextWhite} />
            {/snippet}
            {#snippet label()}
                Nuevo producto
            {/snippet}
        </Button>
    {/if}
</div>
<Table
    {columns}
    data={$products}
    {actions}
    {currentPage}
    {totalPages}
    filterActions={filterActionsProductsByRol}
    onClick={(page: number) => handleFilter(page)}
/>

{#if formProductIsOpen}
    <FormProduct
        isEditMode={formProductIsEdit}
        onClose={handleProductForm}
        {productID}
    />
{/if}

{#if formStockIsOpen}
    <FormAddStock onClose={handleStockForm} {productID} />
{/if}

<style>
    .title-container {
        padding: 0 var(--space-2);
    }

    .products-menu {
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding: var(--space-4);
    }
</style>
