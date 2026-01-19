<script lang="ts">
    import { Button, Input, Modal } from "@components/ui";
    import { addStock } from "../helpers/products";
    import { reloadProducts } from "../store";

    interface Props {
        productID: number
        onClose: (id: number) => void
    }

    let { productID, onClose }: Props = $props();
    
    let qantity: string = $state('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if(Number(qantity) <= 0) {
            alert('La cantidad ingresada debe ser mayor a 0')
            return;
        }

        const res = addStock(productID, {cantidad: qantity});
        
        if(!res) return;

        alert('Se registró el ingreso de stock con éxito');
        $reloadProducts = true;
        onClose(0);
    }
</script>

<Modal title="Añadir stock" alignTitle="text-center" onClose={() => onClose(0)}>
    {#snippet modalBody()}
        <form class="form" onsubmit={handleSubmit}>
            <div class="form-inputs">
                <Input bind:value={qantity} type="number" label="Cantidad a ingresar *" required={true} />
            </div>
            <div class="form-info">
                <small>* Campos obligatorios</small>
            </div>
            <div class="form-buttons">
                <Button variant="secondary" onclick={() => onClose(0)}>
                    {#snippet label()}
                        Cancelar
                    {/snippet}
                </Button>
                <Button variant="primary" type="submit">
                    {#snippet label()}
                        Aceptar
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