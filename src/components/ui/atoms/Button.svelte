<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        variant?: 'primary' | 'secondary' | 'warning' | 'danger'
        disabled?: boolean
        type?: 'button' | 'submit' | 'reset'
        icon?: Snippet | null
        label?: Snippet | null
    }
    
    let {
        variant = 'primary',
        disabled = false,
        type = 'button',
        icon,
        label 
    }: Props = $props()
</script>

<button class={`btn ${variant}`} {disabled} type={type}>
    {@render icon?.()}
    {@render label?.()}
</button>

<style>
    .btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-sm);
        border: none;
        font-weight: var(--font-weight-semibold);
        cursor: pointer;
    }
    .btn:active {
        box-shadow: var(--shadow-inset-sm);
    }
    .btn:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring-primary);
    }
    .btn:disabled {
        cursor: not-allowed;
        box-shadow: none;
    }

    .primary {
        color: var(--text-white);
        background-color: var(--color-slate-800);
    }
    .primary:active {
        background-color: var(--interactive-primary-active);
    }
    .primary:disabled {
        background-color: var(--interactive-primary-disabled);
    }

    .secondary {
        color: var(--text-black);
        background-color: var(--color-slate-300)
    }
    .secondary:disabled {
        background-color: var(--interactive-secondary-disabled)
    }

    .warning {
        color: var(--text-black);
        background-color: var(--color-yellow-300)
    }

    .danger {
        color: var(--text-white);
        background-color: var(--color-red-600)
    }
    .danger:focus-visible {
        box-shadow: var(--focus-ring-danger)
    }
</style>