<script lang="ts">
    import Table from "@components/ui/organisms/Table.svelte";
    import type { Action } from "@lib/interfaces/actionsmenu";
        import iconTrash from '@assets/icons/trash-fill.svg';
    import iconPencil from '@assets/icons/pencil-fill.svg';
    import iconStock from '@assets/icons/package-fill.svg'
    import iconFacturar from '@assets/icons/file-text-fill.svg'
    import iconVer from '@assets/icons/eye-fill.svg'
    
    const columns = [
        {key: 'cod_producto', label: 'Cod. Producto'},
        {key: 'nombre', label: 'Nombre'},
        {key: 'categoria', label: 'Categoría'},
        {key: 'descripcion', label: 'Descripción'},
        {key: 'precio', label: 'Precio'},
        {key: 'stock', label: 'Stock'},
        {key: 'acciones', label: ''}
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
    ]
    
    const actions: Action[] = [
        {icon: iconPencil, label: 'Editar', onClick: () => console.log('Editar registro')},
        {icon: iconTrash, label: 'Eliminar', onClick: () => console.log('Eliminar registro')},
    ]

</script>

<h1>Inicio</h1>

<Table {columns} {data} {actions} />