<script lang="ts">
    import { Icon, NavItem } from '../atoms';
    import iconHome from '@assets/icons/inicio.svg';
    import iconSells from '@assets/icons/ventas.svg';
    import iconNewSell from '@assets/icons/receipt-fill.svg';
    import iconNotaCredito from '@assets/icons/receipt-x.svg';
    import iconProducts from '@assets/icons/barcode.svg';
    import { menuItemSelected } from '@stores/nav';
    import { location } from 'svelte-spa-router';

    const navOptions = [
        { src: iconHome, label: 'Inicio', route: '/' },
        { src: iconNewSell, label: 'Registrar venta', route: '/registrar-venta' },
        { src: iconSells, label: 'Ventas', route: '/ventas' },
        { src: iconNotaCredito, label: 'Notas crédito', route: '/notas-credito' },
        { src: iconProducts, label: 'Productos', route: '/productos' },
    ]

    $: {
        const path = $location;
        const selectedOption = navOptions.find(option => option.route === path);
        menuItemSelected.set(selectedOption?.route || '');
    }
</script>

<nav>
    {#each navOptions as option}
        <NavItem route={option.route} selected={$menuItemSelected === option.route ? true : false}>
            <Icon src={option.src}/>
            {option.label}
        </NavItem>
    {/each}
</nav>

<style>
    nav {
        padding: var(--space-md) var(--space-sm);
        background-color: var(--color-slate-900);
        display: flex;
        flex-direction: column;
        row-gap: var(--space-sm);
    }
</style>