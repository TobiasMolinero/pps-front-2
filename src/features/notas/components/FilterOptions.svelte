<script lang="ts">
    import { Button, Select } from "@components/ui";

    interface Props {
        selectValue: number
        options: Record<string, number | string | boolean>[]
        onFilter: () => void
        onCleanFilter: () => void
    }

    let {
        selectValue = $bindable(0),
        options,
        onFilter,
        onCleanFilter
    }: Props = $props();
    
    let disabledButton: boolean = $state(true);
    let showCleanButton: boolean = $state(false);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onFilter?.();
    }

    const handleClean = () => {
        selectValue = 0;
        onCleanFilter?.()
    }

    $effect(() => {
        disabledButton = !(selectValue !== 0);
        showCleanButton = !disabledButton
    })
</script>

<form class="form" onsubmit={handleSubmit}>
    <div class="form-inputs">
        <Select
            {options}
            label="Seleccionar tipo de nota"
            valueKey="value"
            displayKey="label"
            width="200px"
            bind:value={selectValue}
        />
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