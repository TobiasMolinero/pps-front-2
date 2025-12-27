<script lang="ts">
    import Table from "@components/ui/organisms/Table.svelte";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import iconTrash from '@assets/icons/trash-fill.svg';
    import iconPencil from '@assets/icons/pencil-fill.svg';
    import iconStock from '@assets/icons/package-fill.svg'
    import { Button, PlusIcon } from "@components/ui";
    import { colorTextWhite } from "@lib/helpers/constants";
    
    const columns = [
        {key: 'cod_producto', label: 'Cod. Producto'},
        {key: 'nombre', label: 'Nombre'},
        {key: 'categoria', label: 'Categoría'},
        {key: 'descripcion', label: 'Descripción'},
        {key: 'precio', label: 'Precio'},
        {key: 'stock', label: 'Stock'},
    ]

    const data = [
        { 
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
        {
            cod_producto: 'P001',
            nombre: 'Producto 1',
            categoria: 'Categoria 1',
            descripcion: '',
            precio: '5000',
            stock: '10'
        },
    ]
    
    const actions: Action[] = [
        {icon: iconStock, label: 'Ingresar stock', onClick: () => console.log('Modificar stock')},
        {icon: iconPencil, label: 'Editar', onClick: () => console.log('Editar registro')},
        {icon: iconTrash, label: 'Eliminar', onClick: () => console.log('Eliminar registro')},
    ]
</script>

<h1>Productos</h1>
<div class="products-menu">
    <div></div>
    <Button variant="success">
        {#snippet icon()}
            <PlusIcon width={24} height={24} color={colorTextWhite} />  
        {/snippet}
        {#snippet label()}
            Nuevo producto
        {/snippet}
    </Button>
</div>
<Table {columns} {data} {actions} />

<style>
    .products-menu {
        display: flex;
        justify-content: space-between;
        padding: var(--space-4);
    }
</style>