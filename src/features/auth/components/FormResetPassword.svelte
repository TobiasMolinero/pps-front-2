<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import Select from "@components/ui/atoms/Select.svelte";
    import { alert_error, loading, success } from "@lib/utils/alerts";
    import { resetPassword } from "../helpers/auth";
    import { user } from "@lib/utils/auth";

    interface Props {
        onClose: () => void;
    }

    let { onClose }: Props = $props();

    let inputNewPassword: string = $state("");
    let inputRepeatPassword: string = $state("");
    let inputRepeatError: string = $state("")
    
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        if(inputRepeatPassword !== inputNewPassword) {
            loading.close();
            inputRepeatError = '¡Las contraseñas no coinciden!'
            return;
        }

        const userID = $user?.id as number
        const res = await resetPassword(userID, { nueva_contraseña: inputRepeatPassword });

        if (!res.ok) {
            await alert_error.fire({ text: res.message });
            return;
        }

        await success.fire({ text: 'Se cambió la contraseña'})
        onClose();
    };
</script>

<Modal
    title=""
    alignTitle="text-center"
    {onClose}
>
    {#snippet modalBody()}
        <form
            class="form"
            onsubmit={handleSubmit}
        >
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
                        Registrar
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
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
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