export interface PropsInput {
    type?: 'text' | 'number' | 'password' | 'email'
    id?: string
    label?: string
    value?: string | number
    required?: boolean
    disabled?: boolean
    name?: string
    placeholder?: string
    error?: string
    format?: 'money' | 'dni' | ''
    minLength?: number
    maxLength?: number
    onChange?: (e: Event) => void
}