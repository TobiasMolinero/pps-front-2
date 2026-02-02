import { writable } from "svelte/store";
import { type BillType } from "./interfaces/interfaces";

export const storeBillsTypes = writable<BillType[]>();