import { pop, push } from "svelte-spa-router";
import { get, writable } from "svelte/store";

export const skipNextRouteCheck = writable(false); 

const appRoutes = [
    '/dashboard',
    '/productos',
    '/ventas',
    '/registrar-venta',
    '/editar-venta',
    '/detalle-venta',
    '/notas-credito',
    '/mi-perfil',
    '/admin',
    '/admin/usuarios',
    '/admin/categorias-productos',
];

export async function handleRoutes(route: string, userRole?: string) {

    if(get(skipNextRouteCheck)) {
        skipNextRouteCheck.set(false);
        return;
    }

    if(!appRoutes.includes(route)) {
        pop();
        return;
    }

    if(route === "/") {
        push('/dashboard');
        return;
    }

    if(route.startsWith('/admin') && userRole !== 'admin') {
        pop();  
    }
}