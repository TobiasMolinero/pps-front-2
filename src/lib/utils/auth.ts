import type { UserData } from "@features/auth/interfaces/interfaces";
import { writable } from "svelte/store";

export const user = writable<UserData | null>({
    id: 1,
    usuario: "tobias",
    apellido: "Molinero",
    nombre: "Tobias",
    correo: "tobiasdesarrollador@gmail.com",
    rol_usuario: "admin"
});
export const isAuthenticated = writable(true);
export const isLoadingAuth= writable(true);