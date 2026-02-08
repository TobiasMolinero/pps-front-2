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
    '/editar-venta',
    '/detalle-venta',
    '/notas-credito',
    '/admin'
];

export function handleRoutes(route: string, isLogin: boolean, userRole?: string) {
    if(route === "/" && isLogin) {
        push('/dashboard');
        return;
    }

    if(route === "/" && !isLogin) {
        push('/login');
        return;
    }

    if(!isLogin && !appRoutes.includes(route)) {
        console.log("no login, no ruta")
        push('/login');
        return;
    }
    
    if(isLogin && route.startsWith('/admin') && userRole !== 'admin') {
        console.log("login, ruta admin, no admin")
        pop();  
    }

    if(isLogin && !appRoutes.includes(route)) {
        console.log("login, no ruta")
        pop();
        return;
    }
}