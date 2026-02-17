export interface Product {
    id: number
    cod_producto: string
    nombre_producto: string
    descripcion: string
    precio: number | string
    id_categoria_producto: number
    categoria: string
    stock: number
}

export interface ResponseGetAllProducts {
    data: Product[]
    current_page: number
    total_pages: number
    total_items: number
}

export interface ResponseGetOneProduct {
    data: Product[]
}

export interface ResponseGetOneCategory {
    data: ProductCategory[]
}

export interface ProductCategory {
    [key: string]: string | number | boolean
    id: number
    categoria_producto: string
}

export interface ResponseGetAllCategories {
    data: ProductCategory[]
}

export interface ResponseGetAllCategoriesPagination {
    data: ProductCategory[]
    current_page: number
    total_pages: number
    total_items: number
}

export interface ProductFormErrors {
    [key: string]: string
}

export interface ProductForm {
    cod_producto: string
    nombre_producto: string
    descripcion: string
    precio: string | number
    stock: string | number
    id_categoria_producto: number
}