import { writable } from "svelte/store";
import type { Nota } from "./interfaces/interfaces";

export const storeNotes = writable<Nota[]>([]);