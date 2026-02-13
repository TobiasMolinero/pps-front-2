<script lang="ts">
    import { Icon, NavItem } from '../atoms';
    import { menuItemSelected } from '@stores/nav';
    import { location } from 'svelte-spa-router';
    import { storeNavOptions } from '@lib/utils/navOptions';

    $effect(() => {
        const path = $location;
        const selectedOption = $storeNavOptions.find(option => option.route === path);
        menuItemSelected.set(selectedOption?.route || '');
    })
</script>

<nav>
    {#each $storeNavOptions as option}
        <NavItem route={option.route} selected={$menuItemSelected === option.route ? true : false}>
            <Icon src={option.src}/>
            {option.label}
        </NavItem>
    {/each}
</nav>

<style>
    nav {
        flex: 1;
        padding: var(--space-md) var(--space-sm);
        background-color: var(--color-slate-900);
        display: flex;
        flex-direction: column;
        row-gap: var(--space-sm);
    }
</style>