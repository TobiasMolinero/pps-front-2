<script lang="ts">
    import iconClose from '@assets/icons/x-bold.svg';
    import iconMenu from '@assets/icons/icon-menu.svg'; 
    import { Icon } from '../atoms';

    interface Props {
        open: boolean
        onclick: () => void
    }

    let { open, onclick }: Props = $props();
</script>

<button type="button" class="toggle-menu" {onclick}>
    {#if open}
        <Icon src={iconClose} alt="Icono cruz cerrar menú" />
    {:else}
        <Icon src={iconMenu} alt="Icono menu de tres puntos" />
    {/if}
</button>

<style>
    .toggle-menu {
        background-color: transparent;
        padding: var(--space-xs);
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
    }
</style>


