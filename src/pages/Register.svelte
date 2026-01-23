<script lang="ts">
    import { Button, Input } from "@components/ui";
</script>

<div class="container-login">
    <form class="form">
        <div class="form-inputs">
            <Input
                label="Nombre *"
                type="text"
                required={true}
                id="txtNombre"
            />
            <Input
                label="Apellido *"
                type="text"
                required={true}
                id="txtApellido"
            />
            <Input
                label="Nombre de usuario *"
                type="text"
                required={true}
                id="txtUsuario"
            />
            <Input
                label="Correo electronico *"
                type="email"
                required={true}
            />
            <Input
                label="Contraseña *"
                type="password"
                required={true}
                id="txtContraseña"
                showToggle={true}
            />
        </div>
        <div class="form-button">
            <div class="form-info">
                <small>* Campos obligatorios</small>
            </div>
            <Button type="submit" variant="primary">
                {#snippet label()}
                    Registrarme
                {/snippet}
            </Button>
        </div>
    </form>
</div>

<style>
    .container-login {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 var(--space-4);
    }

    .form {
        width: 70%;
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
