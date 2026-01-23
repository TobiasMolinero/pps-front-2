<script lang="ts">
    import { Button, Heading, Input } from "@components/ui";
    import logo from '@assets/images/herramientas.webp';
</script>

<div class="login-section">
    <div class="hero-content">
        <div class="hero-primary">
            <img class="hero-img" src={logo} alt="Logo de Management Tool's">
            <h1 class="hero-title">Management Tools</h1>
        </div>
        <div class="hero-secondary">
            <h2 class="hero-description">Sistema de Gestión para Negocios</h2>
            <h5 class="hero-legend">Desarrollado por Tobias Molinero</h5>
        </div>
    </div>
    <div class="container-login">
        <Heading textAlign="text-start" level={2}>
            {#snippet children()}
                Iniciar sesión
            {/snippet}
        </Heading>
        <form class="form">
            <div class="form-inputs">
                <Input
                    label="Usuario *"
                    type="text"
                    required={true}
                    id="txtUsuario"
                    error=""
                />
                <div class="input-password">
                    <Input
                        label="Contraseña *"
                        type="password"
                        required={true}
                        id="txtContraseña"
                        showToggle={true}
                    />
                    <button type="button" class="forgot-button"
                        >¿Olvidaste tu contraseña?</button
                    >
                </div>
            </div>
            <div class="form-button">
                <div class="form-info">
                    <small>* Campos obligatorios</small>
                </div>
                <Button type="submit" variant="primary">
                    {#snippet label()}
                        Iniciar sesión
                    {/snippet}
                </Button>
            </div>
        </form>
    </div>
</div>

<style>
    .login-section {
        display: flex;
        height: 100%;
    }

    .hero-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: var(--space-4);
        background-color: var(--dark-blue);
        padding: 8rem var(--space-8); 
    }

    .hero-primary {
        display: flex;
        align-items: center;
        column-gap: var(--space-6);
    }

    .hero-title, .hero-description, .hero-legend {
        color: var(--text-white);
    }

    .hero-description {
        font-weight: 500;
    }

    .hero-legend {
        font-weight: 400;
    }

    .hero-img {
        width: 180px;
        height: 180px;
    }
    
    .container-login {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: var(--space-4);
        padding: 0 var(--space-8);
    }

    .form {
        width: 60%;
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

    .input-password {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
    }

    .forgot-button {
        background: none;
        border: none;
        align-self: end;
        cursor: pointer;
        text-decoration: underline;
        opacity: 0.8;
    }
    .forgot-button:hover {
        opacity: 1;
    }
    .forgot-button:active {
        opacity: 0.8;
    }

    .form-button {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: var(--space-1);
    }

    .form-info {
        opacity: 0.8;
    }
</style>
