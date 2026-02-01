<script lang="ts">
    interface Props {
        id?: string;
        name?: string;
        label?: string;
        value?: string;
        min?: string;
        max?: string;
        required?: boolean;
        disabled?: boolean;
        error?: string;
        onChange?: (e: Event) => void;
    }

    let {
        id,
        name,
        label,
        value = "",
        min,
        max,
        required = false,
        disabled = false,
        error = "",
        onChange,
    }: Props = $props();

    // Emitir cambio de valor
    function handleChange(e: Event) {
        const input = e.target as HTMLInputElement;
        value = input.value;
        onChange?.(e);
    }
</script>

<div class="input-wrapper">
    {#if label}
        <label for={id} class="input-label">{label}</label>
    {/if}

    <div class="input-container">
        <input
            {id}
            {name}
            type="date"
            class="input-field"
            class:error={!!error}
            bind:value
            {min}
            {max}
            {required}
            {disabled}
            on:change={handleChange}
        />
    </div>

    {#if error}
        <span class="input-error">{error}</span>
    {/if}
</div>

<style>
    .input-wrapper {
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

    .input-container {
        position: relative;
    }

    .input-field {
        height: 40px;
        width: 100%;
        padding: 0.5rem 0.75rem; /* espacio para el icono */
        border: 1px solid var(--color-slate-400);
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
        background-color: white;
        color: var(--text-black);
    }

    .input-field:focus {
        border-color: var(--color-slate-950);
        outline: none;
    }

    .input-field.error {
        border-color: var(--color-red-600);
    }

    .input-error {
        color: var(--color-red-600);
        font-size: 0.75rem;
    }

    .calendar-btn {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        opacity: 0.6;
    }

    .calendar-btn:hover {
        opacity: 0.8;
    }

    .calendar-btn:disabled {
        opacity: 0.3;
        cursor: default;
    }
</style>
