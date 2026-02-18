import { writable } from "svelte/store";
import type { Nota } from "./interfaces/interfaces";

export const storeNotes = writable<Nota[]>([]);
export const updateNotes = writable<boolean>(false);