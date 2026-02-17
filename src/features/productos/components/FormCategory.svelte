<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import { reloadCategories } from "../store";
    import { alert_error, loading, success } from "@lib/utils/alerts";
    import { createCategory, editCategory, getOneCategory } from "../helpers/categoryProduct";

    interface Props {
        categoryID: number;
        isEditMode?: boolean;
        onClose: () => void;
    }

    let { isEditMode = false, onClose, categoryID = 0 }: Props = $props();
    
    let inputCategory: string = $state(""); 

    const handleCreateSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        const newCategory = {
            categoria: inputCategory.trim(),
        }
        const res = await createCategory(newCategory);

        if (!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        await success.fire({ text: 'La categoría fue registrada con éxito' });
        onClose();
        $reloadCategories = true;
    };

    const getDataCategory = async (id: number) => {
        const res = await getOneCategory(id);

        if(!res.ok) {
            alert_error.fire({ text: res.message });
            return
        }

        const data = res.data.data;

        inputCategory = data[0].categoria_producto;
    };

    const handleEditSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        const data = { categoria: inputCategory.trim()};
        const res = await editCategory(categoryID, data);

        if (!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        success.fire({ text: 'La categoría fue modificada con exito' });
        onClose();
        $reloadCategories = true;
    };

    onMount(async () => {
        if (categoryID) {
            await getDataCategory(categoryID);
        }
    });
</script>

<Modal
    title={isEditMode ? "Editar categoría" : "Registrar categoría"}
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
                    bind:value={inputCategory}
                    type="text"
                    label="Nombre de la categoria *"
                    required={true}
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
        place-items: center;
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
