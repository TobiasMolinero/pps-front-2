<script lang="ts">
    import { Button, Heading, PlusIcon, Table } from "@components/ui";
    import { deleteCategory, filterActionsCategory, getAllCategories } from "@features/productos/helpers/categoryProduct";
    import { reloadCategories, storeCategories } from "@features/productos/store";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import { alert_error, loading, success, warning } from "@lib/utils/alerts";
    import { user } from "@lib/utils/auth";
    import { colorTextWhite } from "@lib/utils/constants";
    import { onMount } from "svelte";
    import iconTrash from "@assets/icons/trash-fill.svg";
    import iconPencil from "@assets/icons/pencil-fill.svg";
    import FormCategory from "@features/productos/components/FormCategory.svelte";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    let formCategoryIsOpen: boolean = $state(false);
    let formCategoryIsEdit: boolean = $state(false);
    let categoryID: number = $state(0);

    const columns = [
        { key: "id", label: "# ID" },
        { key: "categoria_producto", label: "Categoria" },
    ];
    
    const actions: Action[] = [
        {icon: iconTrash, label: 'Eliminar', show: true, onClick: (id: number) => handleDelete(id)},
        {icon: iconPencil, label: 'Editar', show: true, onClick: (id: number) => handleFormEdit(id)},
    ];

    const handleLoadingData = async (page: number) => {
        const res = await getAllCategories(page);

        if(!res.ok) return await alert_error.fire({ text: res.message });

        $storeCategories = res.data.data;
        currentPage = res.data.current_page;
        totalPages = res.data.total_pages;
    }

    const handleForm = () => {
        formCategoryIsOpen = !formCategoryIsOpen;
        if (formCategoryIsEdit) {
            formCategoryIsEdit = false;
            categoryID = 0;
        }
    }

    const handleFormEdit = (id: number) => {
        categoryID = id;
        formCategoryIsEdit = true;
        formCategoryIsOpen = true;
    };

    const handleDelete = async (id: number) => {
        const alertResolve = await warning.fire({
            text: "¿Está seguro que desea eliminar esta categoría?",
        });

        if (!alertResolve.isConfirmed) return;

        loading.fire();
        
        const res = await deleteCategory(id);

        if (!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        await success.fire({ text: "El producto fue eliminado correctamente." });

        if ($storeCategories.length === 1 && currentPage > 1) {
            currentPage--;
        }

        await handleReload();
    }

    const handleReload = async () => {
        await handleLoadingData(1);
        $reloadCategories = false;
    };

    $effect(() => {
        if($reloadCategories) {
            handleReload();
        }
    })

    onMount(async () => {
        await handleLoadingData(1);
    })
</script>


<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Gestión categorias de productos
        {/snippet}
    </Heading>
</div>
<div class="products-menu">
    {#if $user?.rol_usuario === 'admin'}    
        <Button variant="success" onclick={handleForm}>
            {#snippet icon()}
                <PlusIcon width={24} height={24} color={colorTextWhite} />
            {/snippet}
            {#snippet label()}
                Crear nueva categoria
            {/snippet}
        </Button>
    {/if}
</div>
<Table
    {columns}
    data={$storeCategories}
    {actions}
    {currentPage}
    {totalPages}
    filterActions={filterActionsCategory}
    onClick={(page: number) => handleLoadingData(page)}
/>

{#if formCategoryIsOpen}
    <FormCategory
        isEditMode={formCategoryIsEdit}
        onClose={handleForm}
        {categoryID}
    />
{/if}

<style>
    .title-container {
        padding: 0 var(--space-2);
    }

    .products-menu {
        display: flex;
        justify-content: end;
        align-items: end;
        padding: var(--space-4);
    }
</style>
