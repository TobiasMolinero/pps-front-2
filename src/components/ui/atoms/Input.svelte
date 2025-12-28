<script lang="ts">
    import { formatDNI, formatMoney } from "@lib/formatters";
    import type { PropsInput } from "@lib/interfaces/input";

    let {
        type,
        id,
        name,
        value = $bindable(''),
        label,
        required,
        disabled,
        error,
        placeholder,
        format = '',
        minLength,
        maxLength,
        onChange
    }: PropsInput = $props()

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        let inputValue = target.value;

        if(format === 'dni') {
            value = formatDNI(inputValue);
            return;
        }

        if(format === 'money') {
            value = formatMoney(inputValue);
            return;
        }
        
    }

</script>

<div class="input-wrapper">
    {#if label}
        <label for={id} class="input-label">{label}</label>
    {/if}

    <input
        {id}
        {name} 
        {type}
        class="input-field"
        bind:value={value}
        minlength={minLength}
        maxlength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        class:error={error}
        oninput={handleInput}
    >

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
    color: var(--text-black );
  }

  .input-field {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-slate-400);
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
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
</style>