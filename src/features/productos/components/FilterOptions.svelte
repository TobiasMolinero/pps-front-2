<script lang="ts">
    import { Button, Input, Select } from "@components/ui";

    interface Props {
        options: Record<string, number | string | boolean>[]
        onFilter: (event: { inputValue: string, selectValue: number}) => void
    }

    let { options, onFilter }: Props = $props();
    
    let inputValue: string = $state('');
    let selectValue: number = $state(0);
    let disabledButton: boolean = $state(true);
    let showCleanButton: boolean = $state(false);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onFilter?.({ inputValue, selectValue });
    }

    const handleClean = () => {
        inputValue = '';
        selectValue = 0;
        onFilter?.({ inputValue, selectValue })
    }

    $effect(() => {
        disabledButton = !(inputValue || selectValue !== 0);
        showCleanButton = !disabledButton
    })
</script>

<form class="form" onsubmit={handleSubmit}>
    <div class="form-inputs">
        <Input type="text" label="Ingresar código o nombre" bind:value={inputValue} />
        <Select
            {options}
            label="Seleccionar categoría"
            valueKey="id"
            displayKey="categoria_producto"
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