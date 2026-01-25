const eventName = "tooltip:hide-all";

export function hideAllTooltips() {
    window.dispatchEvent(new CustomEvent(eventName));
}

export function listenHideAllTooltips(callback: () => void) {
    window.addEventListener(eventName, callback);
    return () => window.removeEventListener(eventName, callback);
}