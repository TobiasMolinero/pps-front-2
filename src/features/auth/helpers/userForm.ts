import { writable } from "svelte/store";
import type { UserForm } from "../interfaces/interfaces";

export function createUserForm() {
    const initialValues: UserForm = {
        apellido: '',
        nombre: '',
        usuario: '',
        correo: '',
        rol_usuario: 'vendedor',  
        contraseña: '',
    }

    const userForm = writable<UserForm>(initialValues);

    function resetForm() {
        userForm.set({ ...initialValues });
    }

    return {
        userForm,
        resetForm
    }
}