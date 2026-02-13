import { writable } from "svelte/store";
import type { BillType, DetailSale, Sale, SelectProduct } from "./interfaces/interfaces";

export const storeBillsTypes = writable<BillType[]>();
export const storeSelectedBillType = writable<number>(2);
export const storeSelectProducts = writable<SelectProduct[]>();
export const storeDetailSale = writable<DetailSale[]>([]);
export const updateSales = writable<boolean>(false);

export const storeSales = writable<Sale[]>();