export interface PropsSelect {
    id?: string;
    label?: string;
    value?: number;
    options: Record<string, number | string | boolean>[]; // lista de objetos
    disabled?: boolean;
    required?: boolean;
    error?: string;
    displayKey?: string; // qué campo se muestra
    valueKey?: string;   // qué campo se usa como valor
}