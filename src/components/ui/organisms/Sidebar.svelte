<script lang="ts">
    import iconLogout from '@assets/icons/logout.svg';
    import { Nav } from "../molecules";
    import { isAuthenticated, user } from '@lib/utils/auth';
    import { safeApiRequest } from '@lib/api/safeApiRequest';
    import { apiRoutes } from '@lib/api/endpoints';
    import { push } from 'svelte-spa-router';
    import { alert_error, success } from '@lib/utils/alerts';

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
</script>

<aside class="sidenav">
    <Nav />
    <div class="logout-button">
        <button onclick={handleLogout}>
            <img src={iconLogout} alt="Icono cerrar sesión">
            Cerrar sesión
        </button>
    </div>
</aside>

<style>
    .sidenav {
        flex: 0 0 220px;
        display: flex;
        flex-direction: column;
        background-color: var(--color-slate-900);
    }

    .logout-button {
        padding: var(--space-md) var(--space-sm);
    }

    .logout-button button > img {
        width: var(--icon-size)
    }

    .logout-button button {
        width: 100%;
        display: flex;
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
        cursor: pointer;
    }
    .logout-button button:hover {
        background-color: var(--color-red-600);
        box-shadow: var(--shadow-lg);
    }
    .logout-button button:active {
        background-color: var(--color-red-400);
    }
</style>