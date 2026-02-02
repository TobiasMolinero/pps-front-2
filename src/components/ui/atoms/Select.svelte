<script lang="ts">
    import type { PropsSelect } from "@lib/interfaces/select";

    let {
        id,
        label,
        value = $bindable(0),
        options = [],
        disabled = false,
        required = false,
        error = "",
        displayKey = "label",
        valueKey = "id",
        width
    }: PropsSelect = $props();
</script>

<div class="select-wrapper">
    {#if label}
        <label for={id} class="input-label">{label}</label>
    {/if}

    <select {id} class="select-native" bind:value {disabled} {required} style="width: {width}">
        {#each options as option (option[valueKey])}
            <option value={option[valueKey]}>
                {option[displayKey]}
            </option>
        {/each}
    </select>

    {#if error}
        <span class="input-error">{error}</span>
    {/if}
</div>

<style>
    .select-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 100%;
    }

    .input-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-black);
        opacity: 0.7;
    }

    .select-native {
        width: 100%;
        height: 40px;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        border: 1px solid var(--color-slate-400);
        border-radius: 6px;
        background-color: white;
        cursor: pointer;
        transition: border-color 0.2s ease;
    }

    .select-native:hover:not(:disabled) {
        border-color: var(--color-slate-950);
    }

    .select-native:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .input-error {
        color: var(--color-red-600);
        font-size: 0.75rem;
    }
</style>
