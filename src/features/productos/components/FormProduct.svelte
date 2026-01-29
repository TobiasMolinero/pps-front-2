<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import Select from "@components/ui/atoms/Select.svelte";
    import {
        cleanDataProduct,
        createProduct,
        editProduct,
        getCategories,
        getModifiedFields,
        getOneProduct,
    } from "../helpers/products";
    import { productsCategories, reloadProducts } from "../store";
    import { createProductForm } from "../helpers/productForm";
    import { alert_error, loading, success } from "@lib/utils/alerts";

    interface Props {
        productID: number;
        isEditMode?: boolean;
        onClose: () => void;
    }

    let { isEditMode = false, onClose, productID = 0 }: Props = $props();
    
    let originalProduct = $state({});

    const { productForm } = createProductForm();

    const handleCreateSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        const newProduct = cleanDataProduct($productForm);
        const res = await createProduct(newProduct);

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        success.fire({ text: 'Producto registrado con éxito'})
        onClose();
        $reloadProducts = true;
    };

    const getDataProduct = async (id: number) => {
        const res = await getOneProduct(id);

        if(!res.ok) {
            alert_error.fire({ text: res.message });
            return
        }

        const data = res.data.data;

        $productForm.cod_producto = data[0].cod_producto;
        $productForm.nombre_producto = data[0].nombre_producto;
        $productForm.id_categoria_producto = data[0].id_categoria_producto;
        $productForm.precio = data[0].precio || "";
        $productForm.stock = data[0].stock || "";
        $productForm.descripcion = data[0].descripcion || "";

        originalProduct = structuredClone(data[0]);
    };

    const handleEditSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        const updatedFields = getModifiedFields(originalProduct, $productForm);

        if(Object.keys(updatedFields).length === 0) {
            alert_error.fire({ text: 'No hay cambios para guardar' });
            return
        }

        const modifiedProduct = cleanDataProduct(updatedFields)
        const res = await editProduct(productID, modifiedProduct);

        if (!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        success.fire({ text: 'El producto se modificó con exito'})
        onClose();
        $reloadProducts = true;
    };

    onMount(async () => {
        if(!$productsCategories.length) {
            const res = await getCategories();

            if(!res.ok) {
                alert_error.fire({ text: res.message });
                return
            }

            $productsCategories = res.data.data;
        }

        if (productID) {
            await getDataProduct(productID);
        }
    });
</script>

<Modal
    title={isEditMode ? "Editar producto" : "Registrar producto"}
    alignTitle="text-center"
    {onClose}
>
    {#snippet modalBody()}
        <form
            class="form"
            onsubmit={isEditMode ? handleEditSubmit : handleCreateSubmit}
        >
            <div class="form-inputs">
                <Input
                    bind:value={$productForm.cod_producto}
                    type="text"
                    label="Cod. de producto *"
                    required={true}
                />
                <Input
                    bind:value={$productForm.nombre_producto}
                    type="text"
                    label="Nombre de producto *"
                    required={true}
                />
                <Select
                    bind:value={$productForm.id_categoria_producto}
                    label="Categoría *"
                    options={$productsCategories}
                    valueKey="id"
                    displayKey="categoria_producto"
                    required={true}
                />
                <Input
                    bind:value={$productForm.descripcion}
                    type="text"
                    label="Descripción"
                />
                <Input
                    bind:value={$productForm.precio}
                    type="text"
                    label="Precio"
                    format="money"
                />
                <Input
                    bind:value={$productForm.stock}
                    type="number"
                    label={isEditMode ? "Stock" : "Stock inicial"}
                />
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
                        {isEditMode ? "Modificar" : "Registrar"}
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
