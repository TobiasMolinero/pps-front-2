import { writable } from "svelte/store";
import { type BillType } from "./interfaces/interfaces";

export const billsTypes = writable<BillType[]>();