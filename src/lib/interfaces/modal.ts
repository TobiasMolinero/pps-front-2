import type { Snippet } from "svelte"

export type TextAlign = 'text-start' | 'text-center' | 'text-end'

export interface ModalProps {
    title?: string
    alignTitle?: TextAlign
    modalBody: Snippet
    onClose: () => void
};
