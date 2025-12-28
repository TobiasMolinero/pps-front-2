export interface Product {
    id_producto: number
    cod_producto: string
    nombre_producto: string
    descripcion: string
    precio: number
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