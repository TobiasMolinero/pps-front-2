<script lang="ts">
    import { Button, Heading, PlusIcon, Table } from "@components/ui";
    import { disabledUser, enabledUser, filterActionsByActivo, getAllUsers } from "@features/auth/helpers/auth";
    import type { UserData } from "@features/auth/interfaces/interfaces";
    import { alert_error, success } from "@lib/utils/alerts";
    import { onMount } from "svelte";
    import iconUserPlus from '@assets/icons/user-plus.svg';
    import iconUserMinus from '@assets/icons/user-minus.svg';
    import { colorTextWhite } from "@lib/utils/constants";
    import FormUser from "@features/auth/components/FormUser.svelte";
    import { reloadUsers } from "@features/auth/store";

    let currentPage: number = $state(1);
    let totalPages: number = $state(1);
    let users: UserData[] = $state([]);
    let formUserIsOpen: boolean = $state(false);

    const columns = [
        { key: "id", label: "#ID" },
        { key: "nombre", label: "Nombre" },
        { key: "apellido", label: "Apellido" },
        { key: "usuario", label: "Usuario" },
        { key: "rol_usuario", label: "Rol" },
        { key: "activo", label: "Estado" },
    ];

    const actions: any[] = [
        {
            icon: iconUserMinus,
            label: "Dar de baja",
            show: true,
            onClick: (id: number) => handleDisabledUser(id)
        },
        {
            icon: iconUserPlus,
            label: "Dar de alta",
            show: true,
            onClick: (id: number) => handleEnabledUser(id)
        }
    ]
    
    const loadingUsers = async (page: number) => {
        const res = await getAllUsers(page)

        if(!res.ok) return await alert_error.fire({ text: res.message });

        users = res.data.data.map(user => ({
            ...user,
            activo: user.activo && user.activo === 1 ? 'Activo' : 'Inactivo' 
        }));
        currentPage = res.data.current_page;
        totalPages = res.data.total_pages;
    }

    const handleReload = async () => {
        await loadingUsers(currentPage);
        $reloadUsers = false;
    }

    const handleUserForm = () => {
        formUserIsOpen = !formUserIsOpen
    }

    const handleDisabledUser = async (id: number) => {
        const res = await disabledUser(id);

        if (!res.ok) {
            return await alert_error.fire({ text: res.message });
        }

        await success.fire({ text: 'El usuario se dio de baja' });
        $reloadUsers = true;
    }

    const handleEnabledUser = async (id: number) => {
        const res = await enabledUser(id);

        if (!res.ok) {
            return await alert_error.fire({ text: res.message });
        }

        await success.fire({ text: 'El usuario se dio de alta' });
        $reloadUsers = true;
    }

    $effect(() => {
        if ($reloadUsers) {
            handleReload();
        }
    })

    onMount(async () => {
        await loadingUsers(currentPage);
    })
</script>

<div class="title-container">
    <Heading level={3} textAlign="text-start">
        {#snippet children()}
            Administración
        {/snippet}
    </Heading>
</div>
<div class="admin-menu">
    <Button variant="success" onclick={handleUserForm}>
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />
        {/snippet}
        {#snippet label()}
            Generar usuario
        {/snippet}
    </Button>
</div>
<Table
    data={users}
    {currentPage}
    {totalPages}
    {columns}
    {actions}
    filterActions={filterActionsByActivo}
    onClick={(page: number) => loadingUsers(page)}
/>

{#if formUserIsOpen}
    <FormUser onClose={handleUserForm} />
{/if}

<style>
    .title-container {
        padding: var(--space-2);
    }

    .admin-menu {
        display: flex;
        justify-content: end;
        align-items: end;
        padding: var(--space-4);
    }
</style>
