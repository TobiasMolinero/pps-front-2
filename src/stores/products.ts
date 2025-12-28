import type { Product } from "@lib/interfaces/products";
import { writable } from "svelte/store";

export const products = writable<Product[]>();