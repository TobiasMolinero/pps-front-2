<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Input, Modal } from "@components/ui";
    import Select from "@components/ui/atoms/Select.svelte";
    import { alert_error, loading, success } from "@lib/utils/alerts";

    interface Props {
        onClose: () => void;
    }

    let { onClose }: Props = $props();
    
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        loading.fire();

        const res = await resetPassword();

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
            onsubmit={handleCreateSubmit}
        >
            <div class="form-inputs">
                <Input
                    bind:value={$userForm.nombre}
                    type="text"
                    label="Nombre *"
                    required={true}
                />
                <Input
                    bind:value={$userForm.apellido}
                    type="text"
                    label="Apellido *"
                    required={true}
                />
                <Input
                    bind:value={$userForm.usuario}
                    type="text"
                    label="Nombre usuario *"
                />
                <Select
                    bind:value={$userForm.rol_usuario}
                    label="Categoría *"
                    options={[{value: 'admin', label: 'Administrador'}, {value: 'vendedor', label: 'Vendedor'}]}
                    valueKey="value"
                    displayKey="label"
                    required={true}
                />
                <Input
                    bind:value={$userForm.correo}
                    type="email"
                    label="Correo electronico *"
                />
                <Input
                    bind:value={$userForm.contraseña}
                    type="password"
                    showToggle={true}
                    label='Contraseña *'
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
