<script lang="ts">
    import Select from "@components/ui/atoms/Select.svelte";
    // import { Input, Modal, Button } from "@components/ui";

    // let modalRef = $state<Modal>()

    // const openModal = () => {
    //     modalRef?.open();
    // }


    const categorias = [
        { id: 1, categoria: "Ferretería" },
        { id: 2, categoria: "Pinturas" },
        { id: 3, categoria: "Electricidad" },
    ];

    let categoriaSeleccionada: number = 0;
</script>

<h1>Registrar venta</h1>
<br>
<Select
    label="Categoría"
    options={categorias}
    displayKey="categoria"
    bind:value={categoriaSeleccionada}
/>

<p>🧾 ID seleccionado: {categoriaSeleccionada}</p>
<!-- <Button variant="primary" onclick={openModal}>
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
</Modal> -->
<!-- 
<style>
    form {
        background: red;
        padding: var(--space-4) 
    }
</style> -->