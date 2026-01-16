<script lang="ts">
    import { fade } from "svelte/transition";
    import { Heading, Icon } from "../atoms";
    import crossIcon from '@assets/icons/x-bold.svg';
    import type { ModalProps } from "@lib/interfaces/modal";
    import { addClickOutsideListener } from "@lib/helpers/clickOutside";

    let { 
        title,
        alignTitle = 'text-start',
        modalBody,
        onClose,
    }: ModalProps = $props();

    let modal: HTMLElement;

    $effect(() => {
        const cleanup = addClickOutsideListener(modal, onClose);
        return cleanup;
    })
</script>

<div
    transition:fade={{ duration: 100 }} 
    class="background"
>
    <div class="modal" bind:this={modal}>
        <header class="modal-header">
            <button class="btn-close-modal" onclick={onClose}>
                <Icon src={crossIcon} alt="Icono cruz cerrar" />
            </button>
        </header>
        <div class="modal-body">
            <Heading level={3} textAlign={alignTitle}>{title}</Heading>
            {@render modalBody()}
        </div>
    </div>
</div>

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
        row-gap: var(--space-4);
        padding: var(--space-md);
        border-radius: var(--radius-sm);
        background: var(--color-slate-100);
        box-shadow: var(--shadow-md);
        min-width: 450px;
        max-width: 90vw;
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
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
        padding: var(--space-3) 0;
        width: 100%;
    }
</style>