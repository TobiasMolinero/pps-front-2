<script lang="ts">
    import { Button } from "@components/ui";
    import DatePicker from "@components/ui/atoms/DatePicker.svelte";
    import Select from "@components/ui/atoms/Select.svelte";
    import type { FilterSalesParams } from "../interfaces/interfaces";
    import { billTypesOptions, stateOptions } from "../helpers/sales";
    import { onMount } from "svelte";
    import { safeApiRequest } from "@lib/api/safeApiRequest";
    import { apiRoutes } from "@lib/api/endpoints";
    import { alert_error } from "@lib/utils/alerts";
    import { getFirstDayOfCurrentMonth } from "../helpers/helpers";

    interface Props {
        dateFromInput: string
        dateToInput: string
        selectTypeBillInput: number
        selectStateInput: string
        selectUserInput: number
        onFilter: () => void
        onCleanFilter: () => void
    }

    let {
        dateFromInput = $bindable(""),
        dateToInput = $bindable(new Date().toISOString().split('T')[0]),
        selectTypeBillInput = $bindable(0),
        selectStateInput = $bindable(''),
        selectUserInput = $bindable(0),
        onFilter,
        onCleanFilter
    }: Props = $props();

    let disabledButton: boolean = $state(true);
    let showCleanButton: boolean = $state(false);
    // let dateFromInput: string = $state("");
    // let dateToInput: string = $state(new Date().toISOString().split('T')[0]);
    // let selectTypeBillInput: number = $state(0);
    // let selectStateInput: string = $state("");
    // let selectUserInput: number = $state(0);
    let usersOptions: {id: number, usuario: string}[] = $state([]);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onFilter?.();
    }
    
    const handleClean = () => {
        onCleanFilter?.();
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
            selectTypeBillInput !== 0 ||
            selectStateInput !== "" ||
            selectUserInput !== 0
        ) as boolean;
    })

    const loadingUsersOptions = async () => {
        const res = await safeApiRequest<{users: {id: number, usuario: string}[]}>('get', apiRoutes.users_names)
        
        if (!res.ok) return await alert_error.fire({ text: res.message });

        usersOptions = res.data.users;
    }

    onMount(async () => {
        dateFromInput = getFirstDayOfCurrentMonth();
        await loadingUsersOptions();
    })
</script>

<form class="form" onsubmit={handleSubmit}>
    <div class="form-inputs">
        <DatePicker label="Desde" bind:value={dateFromInput} />
        <DatePicker label="Hasta" bind:value={dateToInput} max={new Date().toISOString().split('T')[0]} />
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
            options={usersOptions}
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
        flex-grow: 1;
        flex-shrink: 1;
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