export function addClickOutsideListener(
    node: HTMLElement,
    callback: () => void
) {
    const handleClick = (e: MouseEvent) => {
        if(!node.contains(e.target as Node)) {
            callback();
        }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
        document.removeEventListener('click', handleClick, true)
    }
}