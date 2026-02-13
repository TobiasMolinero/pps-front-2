import type { UserData } from "@features/auth/interfaces/interfaces";
import { writable } from "svelte/store";

export const user = writable<UserData | null>(null);
export const isAuthenticated = writable(true);
export const isLoadingAuth= writable(true);