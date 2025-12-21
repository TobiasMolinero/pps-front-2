<script lang="ts">
    import type { Snippet } from "svelte";
    import { link } from "svelte-spa-router";

    interface Props {
        children: Snippet
        route: string
        selected?: boolean
    };

    let { children, route, selected = false } : Props = $props();
</script>

<a use:link href={route} class="nav-item" class:selected={selected}>
    {@render children()}
</a>

<style>
    .nav-item {
        display: inline-flex;
        align-items: center;
        gap: var(--space-md);
        background-color: var(--color-slate-900);
        color: var(--text-white);
        font-weight: var(--font-weight-medium);
        font-size: var(--text-size-md);
        border: none;
        border-radius: var(--radius-sm);
        padding: var(--space-xs) var(--space-sm);
        text-decoration: none;
    }
    .nav-item:hover, .selected {
        background-color: var(--color-slate-700);
        box-shadow: var(--shadow-lg);
    }
</style>
