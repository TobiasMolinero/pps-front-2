<script lang="ts">
    import { Button } from "@components/ui";
    import DatePicker from "@components/ui/atoms/DatePicker.svelte";
    import Select from "@components/ui/atoms/Select.svelte";
    import type { FilterSalesParams } from "../interfaces/interfaces";
    import { billTypesOptions, stateOptions } from "../helpers/sales";

    interface Props {
        onFilter: (event: FilterSalesParams) => void
    }

    let { onFilter }: Props = $props();

    let disabledButton: boolean = $state(true);
    let showCleanButton: boolean = $state(false);
    let dateFromInput: string = $state("");
    let dateToInput: string = $state("");
    let selectTypeBillInput: number = $state(0);
    let selectStateInput: string = $state("");
    let selectUserInput: number = $state(0);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onFilter?.({
            dateFromInput,
            dateToInput,
            selectTypeBillInput,
            selectStateInput,
            selectUserInput,
        });
    }
    
    const handleClean = () => {
        dateFromInput = "";
        dateToInput = "";
        selectTypeBillInput = 0;
        selectStateInput = "";
        selectUserInput = 0;

        onFilter?.({
            dateFromInput: "",
            dateToInput: "",
            selectTypeBillInput: 0,
            selectStateInput: "",
            selectUserInput: 0,
        });
    }

    $effect(() => {
        disabledButton = !(
            dateFromInput ||
            dateToInput ||
            selectTypeBillInput !== 0 ||
            selectStateInput !== "" ||
            selectUserInput !== 0
        );

        showCleanButton = (
            dateFromInput ||
            dateToInput ||
            selectTypeBillInput !== 0 ||
            selectStateInput !== "" ||
            selectUserInput !== 0
        ) as boolean;
    })
</script>

<form class="form" onsubmit={handleSubmit}>
    <div class="form-inputs">
        <DatePicker label="Desde" bind:value={dateFromInput} />
        <DatePicker label="Hasta" bind:value={dateToInput} />
        <Select
            label="Tipo de factura"
            options={billTypesOptions}
            valueKey="id"
            displayKey="tipo_factura"
            bind:value={selectTypeBillInput}
        />
        <Select
            label="Estado"
            options={stateOptions}
            valueKey="value"
            displayKey="label"
            bind:value={selectStateInput}
        />
        <Select 
            label="Vendedor"
            options={[{id: 1, usuario: "tobias"}]}
            valueKey="id"
            displayKey="usuario"
            bind:value={selectUserInput}
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