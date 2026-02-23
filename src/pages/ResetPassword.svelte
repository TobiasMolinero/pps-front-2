<script lang="ts">
    import { push, querystring } from 'svelte-spa-router';
    import { Button, Heading, Input } from "@components/ui";
    import logo from '@assets/images/herramientas.webp';
    import { onMount } from 'svelte';
    import { safeApiRequest } from '@lib/api/safeApiRequest';
    import { apiRoutes } from '@lib/api/endpoints';
    import { alert_error, loading, success } from '@lib/utils/alerts';

    let token: string = $state('');
    let inputNewPassword: string = $state('');
    let inputRepeatPassword: string = $state('');

    let inputRepeatError: string = $state('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();
        
        if(inputRepeatPassword !== inputNewPassword) {
            loading.close();
            inputRepeatError = '¡Las contraseñas no coinciden!'
            return;
        }

        const res = await safeApiRequest('post', apiRoutes.reset_password, {
            token: token,
            nueva_contraseña: inputNewPassword
        })

        if(!res.ok) {
            alert_error.fire({ text: res.message });
            return
        }

        success.fire({ text: 'Contraseña reestablecida. Ya puedes iniciar sesión' });
        push('/login')
    }

    onMount(() => {
        if($querystring) token = $querystring.split('=')[1];
    })
</script>

<div class="background">
    <div class="container">
        <header>
            <div class="container-logo">
                <img class="logo-img" src={logo} alt="Logo de Management Tool's">
                <h2 class="logo-text">Management Tools</h2>
            </div>
        </header>
        <div class="body">
            <div class="container-text">
                <Heading textAlign="text-start" level={3}>
                    {#snippet children()}Ingresá tu nueva contraseña{/snippet}
                </Heading>
            </div>
            <form class="form" onsubmit={handleSubmit}>
                <div class="form-inputs">
                    <Input
                        bind:value={inputNewPassword}
                        label="Nueva contraseña *"
                        type="password"
                        required={true}
                        showToggle={true}
                        error=""
                    />
                    <Input
                        bind:value={inputRepeatPassword}
                        label="Repetir contraseña *"
                        type="password"
                        required={true}
                        showToggle={true}
                        error={inputRepeatError}
                    />
                </div>
                <div class="form-button">
                <div class="form-info">
                    <small>* Campos obligatorios</small>
                </div>
                    <Button type="submit" variant="primary">
                        {#snippet label()}
                            Reestablecer contraseña
                        {/snippet}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .background {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--dark-blue);
    }

    .container {
        width: 500px;
        background-color: var(--color-slate-200);
        padding: var(--space-6);
        border-radius: var(--radius-sm);
        display: flex;
        flex-direction: column;
        align-self: center;
        row-gap: var(--space-6);
    }
    
    .container-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--space-4);
    }
    
    .body {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
    }

    .logo-img {
        width: 60px;
    }

    .container-text {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
    }

    .form {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-4);
    }

    .form-inputs {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
        width: 100%;
    }

    .form-button {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: var(--space-1);
    }
</style>
