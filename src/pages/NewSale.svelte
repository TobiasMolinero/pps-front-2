<script lang="ts">
    import { ActionsMenu } from "@components/ui";
    import type { Action } from "@lib/interfaces/actionsmenu";
    import iconTrash from '@assets/icons/trash-fill.svg';
    import iconPencil from '@assets/icons/pencil-fill.svg';
    import iconStock from '@assets/icons/package-fill.svg'
    import iconFacturar from '@assets/icons/file-text-fill.svg'
    import iconVer from '@assets/icons/eye-fill.svg'


    const actions: Action[] = [
        {icon: iconPencil, label: 'Editar', onClick: () => console.log('Editar registro')},
        {icon: iconTrash, label: 'Eliminar', onClick: () => console.log('Eliminar registro')},
        {icon: iconStock, label: 'Gestionar stock', onClick: () => console.log('Gestionar stock')},
        {icon: iconFacturar, label: 'Facturar', onClick: () => console.log('Facturar')},
        {icon: iconVer, label: 'Visualizar', onClick: () => console.log('Visualizar')},
    ]

</script>

<h1>Registrar venta</h1>
<br>
<br>
<br>
<br>
<br>
<div style="padding-left: 40px">

    <ActionsMenu {actions} />
</div>
