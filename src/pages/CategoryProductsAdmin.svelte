<script lang="ts">
    import { Button, Heading, PlusIcon, Table } from "@components/ui";
    import { user } from "@lib/utils/auth";
    import { colorTextWhite } from "@lib/utils/constants";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);

    const columns = [
        { key: "id", label: "# ID" },
        { key: "categoria_producto", label: "Categoria" },
        { key: "registro_activo", label: "Estado" }
    ];
    
    const actions: any = [];

    const handleForm = () => {
        
    }
</script>


<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Productos
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
                Nuevo producto
            {/snippet}
        </Button>
    {/if}
</div>
<Table
    {columns}
    data={[]}
    {actions}
    {currentPage}
    {totalPages}
    onClick={() => console.log('hola')}
/>

<!-- {#if formProductIsOpen}
    <FormProduct
        isEditMode={formProductIsEdit}
        onClose={handleProductForm}
        {productID}
    />
{/if} -->

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
