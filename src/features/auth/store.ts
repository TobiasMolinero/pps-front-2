import { writable } from "svelte/store";

export const reloadUsers = writable<boolean>(false);