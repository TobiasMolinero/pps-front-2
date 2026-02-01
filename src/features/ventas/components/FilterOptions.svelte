<script lang="ts">
    import { Button } from "@components/ui";
    import DatePicker from "@components/ui/atoms/DatePicker.svelte";
    import Select from "@components/ui/atoms/Select.svelte";

    interface Props {
        options: Record<string, number | string | boolean>[]
        onFilter: (event: { inputValue: string, selectValue: number}) => void
    }

    let { options, onFilter }: Props = $props();

    let disabledButton: boolean = $state(true);
    let showCleanButton: boolean = $state(false);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
    }
    
    const handleClean = () => {

    }
</script>

<form class="form" onsubmit={handleSubmit}>
    <div class="form-inputs">
        <DatePicker label="Desde" />
        <DatePicker label="Hasta" />
        <Select label="Tipo de factura" {options} valueKey="id" displayKey="tipo_factura" />
    </div>
    <div class="form-buttons">
        <Button variant="primary" type="submit" disabled={disabledButton}>
            {#snippet label()}
                Filtrar
            {/snippet}
        </Button>
        {#if showCleanButton}
            <Button variant="secondary" type="button" onclick={handleClean}>
                {#snippet label()}
                    Limpiar filtros
                {/snippet}
            </Button>
        {/if}
    </div>
</form>

<style>
    .form {
        flex: 1;
        display: flex;
        align-items: end;
        gap: var(--space-4);
    }

    .form-inputs {
        display: flex;
        align-items: end;
        gap: var(--space-2)
    }
</style>