<script lang="ts">
    import { Heading } from "@components/ui";
    import iconUserManager from "@assets/icons/user-manag-dark.svg";
    import iconCategoryManager from "@assets/icons/gear-fill.svg";
    import { push } from 'svelte-spa-router';

    const navToCategoryProducts = () => {
        push('/admin/categorias-productos');
    }

    const navToUserAdmin = () => {
        push('/admin/usuarios');
    }
</script>

<div class="admin-section">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Administración
        {/snippet}
    </Heading>
    <div class="menu-admin">
        <button onclick={navToCategoryProducts}>
            <img src={iconCategoryManager} alt="Icono gestión de usuarios">
            Gestionar categoria de productos
        </button>
        <button onclick={navToUserAdmin}>
            <img src={iconUserManager} alt="Icono gestión de usuarios">
            Gestionar usuarios
        </button>
    </div>
</div>

<style>
    .admin-section {
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        row-gap: var(--space-6);
    }


    .menu-admin {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2)
    }

    button {
        width: 400px;
        text-align: start;
        background-color: white;
        border: 1px solid var(--color-slate-400);
        border-radius: var(--radius-button);
        padding: var(--space-4);
        display: flex;
        justify-content: start;
        align-items: center;
        column-gap: var(--space-4);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
    }
    button:hover {
        box-shadow: var(--shadow-hover);
    }
    button:active {
        box-shadow: var(--shadow-active);
    }

    img {
        width: 25px;
    }
</style>