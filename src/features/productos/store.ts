import type { Product, ProductCategory } from "@features/productos/interfaces/interfaces";
import { writable } from "svelte/store";

export const products = writable<Product[]>();
export const productsCategories = writable<ProductCategory[]>();
export const reloadProducts = writable<boolean>(false);

export const storeCategories = writable<ProductCategory[]>();
export const reloadCategories = writable<boolean>(false);