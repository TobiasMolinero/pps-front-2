<script lang="ts">
    import { Input, Modal, Button } from "@components/ui";

    let modalRef = $state<Modal>()

    const openModal = () => {
        modalRef?.open();
    }
</script>

<h1>Registrar venta</h1>
<br>
<Button variant="primary" onclick={openModal}>
    {#snippet label()}
        Abrir modal
    {/snippet}
</Button>
<Modal bind:this={modalRef} data={''} title="Modal" alignTitle="text-center">
    {#snippet content()}
        <form>
            <Input type="text" />
        </form>
    {/snippet}
</Modal>

<style>
    form {
        background: red;
        padding: var(--space-4) 
    }
</style>