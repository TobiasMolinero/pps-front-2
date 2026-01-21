<script lang="ts">
    import { formatDNI, formatMoney } from "@lib/formatters";
    import type { PropsInput } from "@lib/interfaces/input";
    import Icon from "./Icon.svelte";
    import eyeOpen from "@assets/icons/eye.svg";
    import eyeClosed from "@assets/icons/eye-hidden.svg";

    let {
        type = "text",
        id,
        name,
        value = $bindable(""),
        label,
        required,
        disabled,
        error,
        placeholder,
        format = "",
        minLength,
        maxLength,
        showToggle = false,
    }: PropsInput = $props();

    let showPassword: boolean = $state(false);
    let inputType: string = $state("");

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        let inputValue = target.value;

        if (format === "dni") {
            value = formatDNI(inputValue);
            return;
        }

        if (format === "money") {
            value = formatMoney(inputValue);
            return;
        }
    };

    const togglePassword = () => {
        showPassword = !showPassword;
    };

    $effect(() => {
        inputType = type === "password" && showPassword ? "text" : type;
    });
</script>

<div class="input-wrapper">
    {#if label}
        <label for={id} class="input-label">{label}</label>
    {/if}

    <div class="input-container">
        <input
            {id}
            {name}
            type={inputType}
            class="input-field"
            bind:value
            minlength={minLength}
            maxlength={maxLength}
            {placeholder}
            {disabled}
            {required}
            class:error
            oninput={handleInput}
        />

        {#if type === "password" && showToggle}
            <button type="button" class="toggle-btn" onclick={togglePassword}>
                <Icon src={showPassword ? eyeClosed : eyeOpen} />
            </button>
        {/if}
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

    .toggle-btn {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    .toggle-btn:hover {
        opacity: 0.8;
    }
</style>
