export interface Action {
    label: string
    icon: string
    show: boolean
    onClick: (param?: any) => void
}