export interface PropsInput {
    type: 'text' | 'number' | 'password' | 'email'
    id?: string
    label?: string
    value?: string | number
    required?: boolean
    disabled?: boolean
    name?: string
    placeholder?: string
    error?: string
    format?: 'money' | 'dni' | 'cuil' | ''
    minLength?: number
    maxLength?: number
    showToggle?: boolean 
    onChange?: (e: Event) => void
}