<script lang="ts">
    import { fade } from "svelte/transition";
    import { Button, Heading, Icon } from "../atoms";
    import crossIcon from '@assets/icons/x-bold.svg';
    import type { ModalProps } from "@lib/interfaces/modal";

    let { 
        data,
        content,
        title,
        alignTitle = 'text-start',
        cancelButton = true,
        confirmButton = true,
        confirmLabel = 'Confirmar',
        cancelLabel = 'Cancelar',
    }: ModalProps = $props();

    let isOpen: boolean = $state(true);

    export function open(): void {
        isOpen = true
    }

    function close() {
        isOpen = false
    }
</script>

{#if isOpen}
    <div
        transition:fade={{duration: 100}} 
        class="background"
    >
        <div class="modal">
            <header class="modal-header">
                <button class="btn-close-modal" onclick={close}>
                    <Icon src={crossIcon} alt="Icono cruz cerrar" />
                </button>
            </header>
            <div class="modal-body">
                <Heading level={3} textAlign={alignTitle}>{title}</Heading>
                {@render content()}
            </div>
            <footer class="modal-footer">
                {#if cancelButton}
                    <Button variant="secondary" onclick={close}>
                        {#snippet label()}
                            {cancelLabel}
                        {/snippet}
                    </Button>
                {/if}
                {#if confirmButton}
                    <Button variant="primary">
                        {#snippet label()}
                            {confirmLabel}
                        {/snippet}
                    </Button>
                {/if}
            </footer>
        </div>
    </div>
{/if}

<style>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #1E1E1E80;
        display: grid;
        place-items: center;
        z-index: 10;
    }

    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: var(--space-2);
        padding: var(--space-md);
        border-radius: var(--radius-sm);
        background: var(--color-slate-100);
        box-shadow: var(--shadow-md);
        min-width: 400px;
    }

    .modal-header {
        display: flex;
        justify-content: end;
        width: 100%;
    }

    .btn-close-modal {
        background: none;
        border: none;
        padding: var(--space-sm);
        cursor: pointer;
    }

    .modal-body {
        width: 100%;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
        column-gap: var(--space-sm);
        width: 100%;
    }
</style>