<script lang="ts">
    import { Button, Input, Modal } from "@components/ui";
    import { apiRoutes } from "@lib/api/endpoints";
    import { safeApiRequest } from "@lib/api/safeApiRequest";
    import { alert_error, loading, success } from "@lib/utils/alerts";
    import { user } from "@lib/utils/auth";
    import { onMount } from "svelte";
    import { checkSession } from "../utils/checkSession";

    interface Props {
        onClose: () => void;
    }

    let { onClose }: Props = $props();

    let inputName: string = $state('');
    let inputLastName: string = $state('');
    let inputUsername: string = $state('');
    let inputEmail: string = $state('');

    const handleEditSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();
        
        const data = {
            nombre: inputName,
            apellido: inputLastName,
            usuario: inputUsername,
            correo: inputEmail
        }

        const res = await safeApiRequest('patch', apiRoutes.edit_user + $user?.id, data)
        
        if(!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        await success.fire({ text: '¡Los datos se modificaron con exito!' })
        await checkSession()
        onClose();
    }

    onMount(() => {
        if($user) {
            inputName = $user.nombre;
            inputLastName = $user.apellido;
            inputUsername = $user.usuario;
            inputEmail = $user.correo;
        }
    })
</script>

<Modal
    title="Editar datos"
    alignTitle="text-center"
    {onClose}
>
    {#snippet modalBody()}
        <form
            class="form"
            onsubmit={handleEditSubmit}
        >
            <div class="form-inputs">
                <Input
                    bind:value={inputName}
                    type="text"
                    label="Nombre *"
                    required={true}
                />
                <Input
                    bind:value={inputLastName}
                    type="text"
                    label="Apellido *"
                    required={true}
                />
                <Input
                    bind:value={inputUsername}
                    type="text"
                    label="Nombre usuario *"
                />
                <Input
                    bind:value={inputEmail}
                    type="email"
                    label="Correo electronico *"
                />
            </div>
            <div class="form-info">
                <small>* Campos obligatorios</small>
            </div>
            <div class="form-buttons">
                <Button variant="secondary" onclick={onClose}>
                    {#snippet label()}
                        Cancelar
                    {/snippet}
                </Button>
                <Button variant="primary" type="submit">
                    {#snippet label()}
                        Modificar
                    {/snippet}
                </Button>
            </div>
        </form>
    {/snippet}
</Modal>

<style>
    .form {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-4);
        padding: 0 var(--space-6);
    }

    .form-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: var(--space-2);
        column-gap: var(--space-4);
    }

    .form-info {
        opacity: 0.8;
    }

    .form-buttons {
        grid-column: span 2;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-2);
    }
</style>