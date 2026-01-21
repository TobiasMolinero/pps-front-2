<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import Select from "@components/ui/atoms/Select.svelte";
    import {
        cleanDataProduct,
        createProduct,
        editProduct,
        getCategories,
        getOneProduct,
    } from "../helpers/products";
    import { productsCategories, reloadProducts } from "../store";
    import { createProductForm } from "../helpers/productForm";

    interface Props {
        productID: number;
        isEditMode?: boolean;
        onClose: () => void;
    }

    let { isEditMode = false, onClose, productID = 0 }: Props = $props();

    const { productForm } = createProductForm();

    const handleCreateSubmit = async (e: Event) => {
        e.preventDefault();
        const newProduct = cleanDataProduct($productForm);
        const res = await createProduct(newProduct);

        if (!res) return;

        alert("Producto registrado con exito");
        onClose();
        $reloadProducts = true;
    };

    const getDataProduct = async (id: number) => {
        const res = await getOneProduct(id);
        if (res) {
            const data = res.data;

            $productForm.cod_producto = data[0].cod_producto;
            $productForm.nombre_producto = data[0].nombre_producto;
            $productForm.id_categoria_producto = data[0].id_categoria_producto;
            $productForm.precio = data[0].precio || "";
            $productForm.stock = data[0].stock || "";
            $productForm.descripcion = data[0].descripcion || "";
        }
    };

    const handleEditSubmit = async (e: Event) => {
        e.preventDefault();
        const modifiedProduct = cleanDataProduct($productForm);
        const res = await editProduct(productID, modifiedProduct);

        if (!res) return;

        alert("El producto se modificó con exito");
        onClose();
        $reloadProducts = true;
    };

    onMount(async () => {
        if(!$productsCategories.length) {
            const res = await getCategories();
            if (res) {
                $productsCategories = res.data;
            }
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
