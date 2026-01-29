import { pop, push } from "svelte-spa-router";

const appRoutes = [
    '/login',
    '/registrar',
    '/forgot-password',
    '/reset-password',
    '/dashboard',
    '/productos',
    '/ventas',
    '/registrar-venta',
    '/notas-credito',
    '/admin'
];

export function handleRoutes(route: string, isLogin: boolean, userRole?: string) {
    if(!isLogin && !appRoutes.includes(route)) {
        push('/login');
        return;
    }
    
    if(isLogin && route.startsWith('/admin') && userRole !== 'admin') {
        pop();  
    }

    if(isLogin && !appRoutes.includes(route)) {
        pop();
        return;
    }
}