import type { Snippet } from "svelte"

export type TextAlign = 'text-start' | 'text-center' | 'text-end'

export interface ModalProps {
    data?: any
    title?: string
    alignTitle?: TextAlign
    cancelButton?: boolean
    confirmButton?: boolean
    confirmLabel?: string
    cancelLabel?: string
    content: Snippet
};
