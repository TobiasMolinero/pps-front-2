<script lang="ts">
    import logo from '@assets/images/herramientas.webp';
    import iconUser from '@assets/icons/usuario.svg';
    import { isAuthenticated, user } from '@lib/utils/auth';
    import iconProfileUser from '@assets/icons/user-view.svg';
    import iconLogout from '@assets/icons/logout.svg';
    import { safeApiRequest } from '@lib/api/safeApiRequest';
    import { apiRoutes } from '@lib/api/endpoints';
    import { alert_error, success } from '@lib/utils/alerts';
    import { push } from 'svelte-spa-router';
    import { fade } from 'svelte/transition';
    import { addClickOutsideListener } from '@lib/utils/clickOutside';

    let buttonElement: HTMLButtonElement;
    let isDropdownOpen: boolean = $state(false); 

    const handleDropdown = () => {
        isDropdownOpen = !isDropdownOpen
    }

    const handleNav = () => {
        push('/mi-perfil');
        isDropdownOpen = false;
    }

    const handleLogout = async () => {
        const res = await safeApiRequest('patch', apiRoutes.logout + $user?.id);

        if(!res.ok) {
            alert_error.fire({ text: res.message });
            return;
        }

        user.set(null);
        isAuthenticated.set(false);
        success.fire({ text: 'La sesión se finalizó con exito'})
        push('/login');
    }

    $effect(() => {
        if(!isDropdownOpen) return;
        
        const cleanup = addClickOutsideListener(buttonElement, handleDropdown);
        return cleanup;
    })
</script>

<header>
    <div class="logo-container">
        <img src={logo} alt="Logo ToolsManagement">
        <p>ToolsManagement</p>
    </div>
    <div class="user-button">
        <button onclick={handleDropdown} bind:this={buttonElement}>
            {$user?.nombre}
            <img src={iconUser} alt="Icono de usuario">
        </button>
    </div>
</header>
{#if isDropdownOpen}    
    <div class="dropdown-menu" transition:fade={{ duration: 100 }}>
        <button class="nav-button" onclick={handleNav}>
            <img src={iconProfileUser} alt="Icono perfil de usuario">
            Ver perfil
        </button>
        <button class="logout-button" onclick={handleLogout}>
            <img src={iconLogout} alt="Icono cerrar sesión">
            Cerrar sesión
        </button>
    </div>
{/if}

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-slate-800);
        width: 100%;
        padding: var(--space-sm) var(--space-md)
    }

    .logo-container {
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
    }
    .logo-container > img {
        width: 40px;
        height: 40px;
    }
    .logo-container > p {
        color: var(--text-white);
        font-weight: var(--font-weight-semibold);
    }

    .user-button button {
        background: none;
        border: none;
        color: var(--text-white);
        font-size: 1.2rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--space-sm);
        cursor: pointer;
    }

    .dropdown-menu {
        position: absolute;
        background: var(--color-slate-900);
        top:60px;
        right: 10px;
        width: 200px;
        display: flex;
        flex-direction: column;
        padding: var(--space-md) var(--space-sm);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        z-index: 10;
    }
    .dropdown-menu button {
        background: none;
        border: none;
        color: var(--text-white);
        font-weight: 600;
        font-size: 1rem;
        padding: var(--space-sm);
        border-radius: var(--radius-xs);
        cursor: pointer;
        display: flex;
        justify-content: start;
        align-items: center;
        column-gap: var(--space-md);
    }
    .dropdown-menu img {
        width: 20px;
    }

    .nav-button:hover {
        background-color: var(--color-slate-700);
    }
    .nav-button:active {
        background-color: var(--color-slate-500);
    }

    .logout-button:hover {
        background-color: var(--color-red-600);
    }
    .logout-button:active {
        background-color: var(--color-red-400);
    }
</style>