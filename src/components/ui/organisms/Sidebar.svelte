<script lang="ts">
    import iconLogout from '@assets/icons/logout.svg';
    import { Nav } from "../molecules";
    import { user } from '@lib/utils/auth';

    console.log($user)
    const handleLogout = async () => {

    }
</script>

<aside class="sidenav">
    <Nav />
    <div class="logout-button">
        <button>
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