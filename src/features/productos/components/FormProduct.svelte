<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import Select from "@components/ui/atoms/Select.svelte";
    import { cleanDataProduct, createProduct, getCategories } from "../helpers/products";
    import { productsCategories, reloadProducts } from "../store";
    import { createProductForm } from "../helpers/productForm";

    interface Props {
        isEditMode?: boolean
        onClose: () => void
    }

    let { isEditMode = false, onClose }: Props = $props();
    
    const { productForm } = createProductForm();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const newProduct = cleanDataProduct($productForm);
        const res = await createProduct(newProduct);

        if(!res) return;

        alert('Producto registrado con exito')
        onClose();
        $reloadProducts = true;
    }

    onMount(async() => {
        const res = await getCategories();
        if(res) {
            $productsCategories = res.data;
        }
    })
</script>

<Modal title={isEditMode ? 'Editar producto' : 'Registrar producto'} alignTitle="text-center" onClose={onClose}>
    {#snippet modalBody()}
        <form class="form" onsubmit={handleSubmit}>
            <div class="form-inputs">
                <Input bind:value={$productForm.cod_producto} type="text" label="Cod. de producto *" required={true} />
                <Input bind:value={$productForm.nombre_producto} type="text" label="Nombre de producto *" required={true} />
                <Select
                    bind:value={$productForm.id_categoria_producto}
                    label="Categoría *"
                    options={$productsCategories}
                    valueKey="id"
                    displayKey="categoria_producto"
                    required={true}
                />
                <Input bind:value={$productForm.descripcion} type="text" label="Descripción" />
                <Input bind:value={$productForm.precio} type="text" label="Precio" format="money" />
                <Input bind:value={$productForm.stock} type="number" label="Stock inicial" />
            </div>
            <div class="form-info">
                <small>* Campos obligatorios</small>
            </div>
            <div class="form-buttons">
                <Button variant="secondary" onclick={onClose}>
                    {#snippet label()}
                        Cancelar
                    {/snippet}
                </Button>
                <Button variant="primary" type="submit">
                    {#snippet label()}
                        {isEditMode ? 'Modificar' : 'Registrar'}
                    {/snippet}
                </Button>
            </div>
        </form>
    {/snippet}
</Modal>

<style>
    .form {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-4);
        padding: 0 var(--space-6);
    }

    .form-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: var(--space-2);
        column-gap: var(--space-4);
    }

    .form-info {
        opacity: 0.8;
    }

    .form-buttons {
        grid-column: span 2;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-2);
    }
</style>