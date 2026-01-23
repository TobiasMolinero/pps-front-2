import ForgotPassword from "../pages/ForgotPassword.svelte";
import Login from "../pages/Login.svelte";
import Register from "../pages/Register.svelte";
import ResetPassword from "../pages/ResetPassword.svelte";

export const publicRoutes = {
    '/login': Login,
    '/register': Register,
    '/forgot-password': ForgotPassword,
    '/reset-password': ResetPassword 
}