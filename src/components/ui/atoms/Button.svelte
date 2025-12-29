<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
        disabled?: boolean
        type?: 'button' | 'submit' | 'reset'
        icon?: Snippet | null
        label?: Snippet | null
        onclick?: () => void
    }
    
    let {
        variant = 'primary',
        disabled = false,
        type = 'button',
        icon,
        label,
        onclick 
    }: Props = $props()
</script>

<button class={`btn ${variant}`} {disabled} type={type} {onclick}>
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
        color: var(--text-black-disabled);
        background-color: var(--color-slate-200)
    }

    .success {
        background-color: var(--color-green-600);
        color: var(--text-white);
    }
    .success:hover {
        background-color: var(--color-green-500);
    }
    .success:active {
        background-color: var(--color-green-600);
    }
    .success:disabled {
        background-color: var(--color-green-300);
    }

    .warning {
        color: var(--text-black);
        background-color: var(--color-yellow-400)
    }
    .warning:hover {
        background-color: var(--color-yellow-300);
    }
    .warning:active {
        background-color: var(--color-yellow-400)
    }
    .warning:disabled {
        color: var(--text-black-disabled);
        background-color: var(--color-yellow-200);
    }

    .danger {
        color: var(--text-white);
        background-color: var(--color-red-600)
    }
    .danger:focus-visible {
        box-shadow: var(--focus-ring-danger)
    }
    .danger:hover {
        background-color: var(--color-red-500);
    }
    .danger:active {
        background-color: var(--color-red-600);
    }
    .danger:disabled {
        background-color: var(--color-red-400);
    }
</style>