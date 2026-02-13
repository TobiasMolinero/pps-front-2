<script lang="ts">
    import { Button, Heading } from '@components/ui';
    import FormEditUser from '@features/auth/components/FormEditUser.svelte';
    import { apiRoutes } from '@lib/api/endpoints';
    import { safeApiRequest } from '@lib/api/safeApiRequest';
    import { alert_error, info, loading } from '@lib/utils/alerts';
    import { user } from '@lib/utils/auth';

    let isFormOpen: boolean = $state(false);

    const handleResetPassword = async () => {
        loading.fire();

        const res = await safeApiRequest<any>('post', apiRoutes.forgot_password, {
            correo: $user?.correo
        })

        if(!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        info.fire({ text: res.data.message })
    }

    const openForm = () => {
        isFormOpen = true;
    }

    const closeForm = () => {
        isFormOpen = false;
    }
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Perfil {$user?.nombre}
        {/snippet}
    </Heading>
</div>
<div class="info-container">
    <Heading level={3} textAlign="text-start">
        {#snippet children()}
            Información
        {/snippet}
    </Heading>
    <div>
        <ul>
            <li><strong>Nombre:</strong> {`${$user?.nombre} ${$user?.apellido}`}</li>
            <li><strong>Usuario: </strong> {$user?.usuario}</li>
            <li><strong>Correo:</strong> {$user?.correo}</li>
            <li><strong>Rol: </strong> {$user?.rol_usuario}</li>
        </ul>
    </div>
    <div style="margin-top: 10px;">
        <Button onclick={openForm}>
            {#snippet label()}
                Editar datos
            {/snippet}
        </Button>
        <Button onclick={handleResetPassword}>
            {#snippet label()}
                Cambiar contraseña
            {/snippet}
        </Button>
    </div>
</div>
{#if isFormOpen}
    <FormEditUser onClose={closeForm} />
{/if}

<style>
    .title-container {
        padding: var(--space-md) var(--space-2);
    }

    .info-container {
        padding: 0 var(--space-2);
        display: flex;
        flex-direction: column;
        row-gap: var(--space-sm);
    }
</style>