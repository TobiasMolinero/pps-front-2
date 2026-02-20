<script lang="ts">
    import { Button, Heading, Input, Tooltip } from "@components/ui";
    import logo from '@assets/images/herramientas.webp';
    import { push } from "svelte-spa-router";
    import { safeApiRequest } from "@lib/api/safeApiRequest";
    import { apiRoutes } from "@lib/api/endpoints";
    import { alert_error, loading, info } from "@lib/utils/alerts";
    import iconArrow from '@assets/icons/caret-left-bold.svg'
    import Icon from "@components/ui/atoms/Icon.svelte";

    let inputValue: string = $state('');
    let inputError: string = $state('');
    let isSubmit: boolean = $state(false);

    const handleSubmit = async(e: Event) => {
        e.preventDefault();
        loading.fire();

        const res = await safeApiRequest<any>('post', apiRoutes.forgot_password, {
            correo: inputValue
        })

        if(!res.ok) {
            if(res.error.code === 'NOT_FOUND') inputError = res.error.message;
            alert_error.fire({ text: res.message });
            return;
        }

        info.fire({ text: res.data.message })
        isSubmit = true;
    }

    const backToLogin = () => {
        push('/login')
    }
</script>

<div class="background">
    <div class="container">
        <div style="align-self: start;">
            <Tooltip position="top" label="Volver atras">
                {#snippet children()}    
                    <Button variant="secondary" onclick={backToLogin}>
                        {#snippet icon()}
                            <Icon src={iconArrow} width="15px"/>
                        {/snippet}
                    </Button>
                {/snippet}
            </Tooltip>
        </div>
        <header>
            <div class="container-logo">
                <img class="logo-img" src={logo} alt="Logo de Management Tool's">
                <h2 class="logo-text">Management Tools</h2>
            </div>
        </header>
        <div class="body">        
            <div class="container-text">
                <Heading textAlign="text-start" level={3}>
                    {#snippet children()}¿Olvidaste tu contraseña?{/snippet}
                </Heading>
                {#if isSubmit}
                    <p>Las instrucciones para reestablecer la contraseña fueron enviadas a:</p>
                {:else}
                    <p>Te enviaremos un correo con las instrucciones para resetear tu contraseña.</p>
                {/if}
            </div>
            {#if isSubmit}
                <strong>
                    {inputValue}
                </strong>
                <div class="backtologin-button">
                    <p>Si no lo recibiste, ponte en contacto con un administrador.</p>
                    <Button onclick={backToLogin}>
                        {#snippet label()}
                            Volver al Login
                        {/snippet}
                    </Button>
                </div>
            {:else}
                <form class="form" onsubmit={handleSubmit}>
                    <div class="form-inputs">
                        <Input
                            bind:value={inputValue}
                            placeholder="Correo electrónico"
                            type="email"
                            required={true}
                            id="txtCorreo"
                            error={inputError}
                        />
                    </div>
                    <div class="form-button">
                        <Button type="submit" variant="primary">
                            {#snippet label()}
                                Reestablecer contraseña
                            {/snippet}
                        </Button>
                    </div>
                </form>
            {/if}
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

    .body {
        display: flex;
        flex-direction: column;
        align-self: center;
        row-gap: var(--space-2);
    }

    .container-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--space-4);
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

    .backtologin-button {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-4);
    }
</style>
