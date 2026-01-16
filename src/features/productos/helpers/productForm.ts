import { writable } from "svelte/store";
import type { ProductForm } from "../interfaces/interfaces";

export function createProductForm() {
    const initialValues: ProductForm = {
        cod_producto: '',
        nombre_producto: '',
        descripcion: '',
        precio: '',
        stock: '',  
        id_categoria_producto: 0,
    }

    const productForm = writable<ProductForm>(initialValues);

    function resetForm() {
        productForm.set({ ...initialValues });
    }

    return {
        productForm,
        resetForm
    }
}