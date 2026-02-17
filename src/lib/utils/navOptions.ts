import { derived } from "svelte/store";
import { user } from "./auth";
import iconHome from '@assets/icons/inicio.svg';
import iconSells from '@assets/icons/ventas.svg';
import iconNewSell from '@assets/icons/receipt-fill.svg';
import iconNotaCredito from '@assets/icons/receipt-x.svg';
import iconProducts from '@assets/icons/barcode.svg';
import iconAdmin from '@assets/icons/user-manag.svg';

const baseNavOptions = [
    { src: iconHome, label: 'Inicio', route: '/dashboard' },
    { src: iconNewSell, label: 'Registrar venta', route: '/registrar-venta' },
    { src: iconSells, label: 'Ventas', route: '/ventas' },
    { src: iconNotaCredito, label: 'Facturas anuladas', route: '/notas-credito' },
    { src: iconProducts, label: 'Productos', route: '/productos' },
    { src: iconAdmin, label: 'Administración', route: '/admin'}
]

export const storeNavOptions = derived(user, ($user) => {
    if ($user?.rol_usuario === 'admin') return baseNavOptions;
    return baseNavOptions.filter(opt => opt.label !== 'Administración');
}) 