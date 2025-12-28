<script lang="ts">
  import type { Action } from "@lib/interfaces/actionsmenu";
  import { TableHeader, TableBody, PaginationControls } from "../molecules";
  import type { Column, } from "@lib/interfaces/table";

  interface Props<T = Record<string, any>> {
    columns: Column[]
    data: T[]
    actions: Action[]
    totalPages: number
    currentPage: number
  };
  
  let { columns, data, actions, totalPages, currentPage}: Props = $props(); 
</script>

<div class="component-container">
  <div class="table-container">
    <table>
      <TableHeader {columns} />
      <TableBody {columns} {data} {actions} />
    </table>
  </div>
  <PaginationControls {totalPages} {currentPage} />
</div>

<style>
  .component-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
    overflow: hidden;
  }

  .table-container {
    flex: 1;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: var(--color-slate-800) transparent;
    scroll-behavior: smooth;
    border-top: 2px solid var(--color-slate-800);
  }

  table {
    width: 100%;
    height: auto;
    border-collapse: collapse;
    text-align: center;
    margin: 0;
    padding: 0;
    position: relative;
  }
</style>


<!-- Excelente 👏 — esa es justo la clase de caso donde tu diseño modular (con `Table`, `TableBody`, `columns`, etc.) empieza a **mostrar su poder real** 💪

Vamos a resolverlo paso a paso, porque tu necesidad tiene dos partes distintas pero relacionadas:

---

## 🎯 Lo que querés lograr

1. Tener una **última columna de acciones** (por ejemplo un menú de tres puntos o un botón con opciones).
2. Que las **acciones varíen según el tipo de tabla** (por ejemplo: “Facturar” solo en la tabla de ventas, no en la de productos).

---

## 🧱 1️⃣ Estructura base recomendada

Tu componente `Table` **no debería recibir las acciones dentro de `data`**, porque las acciones **no son datos de negocio**, sino **parte del comportamiento de la UI**.

La mejor práctica es pasarlas como **prop independiente**, algo así:

```ts
interface TableAction {
  label: string;
  icon?: string;
  onClick: (row: any) => void;
}

interface Props<T extends Record<string, any>> {
  columns: Column[];
  data: T[];
  actions?: TableAction[];
}
```

Así `Table` sigue recibiendo `data` y `columns`, pero además recibe un array de acciones opcionales.

---

## 🧩 2️⃣ En `Table.svelte`

```svelte
<script lang="ts">
  import TableHeader from './TableHeader.svelte';
  import TableBody from './TableBody.svelte';

  interface Column {
    key: string;
    label: string;
  }

  interface TableAction {
    label: string;
    icon?: string;
    onClick: (row: Record<string, any>) => void;
  }

  interface Props<T extends Record<string, any>> {
    columns: Column[];
    data: T[];
    actions?: TableAction[];
  }

  let { columns, data, actions = [] }: Props<Record<string, any>> = $props();
</script>

<table>
  <TableHeader {columns} hasActions={actions.length > 0} />
  <TableBody {data} {columns} {actions} />
</table>
```

---

## 🧩 3️⃣ En `TableHeader.svelte`

Agregás la columna de encabezado para las acciones solo si existen:

```svelte
<script lang="ts">
  interface Column {
    key: string;
    label: string;
  }

  export let columns: Column[];
  export let hasActions: boolean = false;
</script>

<thead>
  <tr>
    {#each columns as column (column.key)}
      <th>{column.label}</th>
    {/each}

    {#if hasActions}
      <th>Acciones</th>
    {/if}
  </tr>
</thead>
```

---

## 🧩 4️⃣ En `TableBody.svelte`

Renderizás la última celda solo si hay acciones, y le pasás la fila actual.

```svelte
<script lang="ts">
  interface Column {
    key: string;
    label: string;
  }

  interface TableAction {
    label: string;
    icon?: string;
    onClick: (row: Record<string, any>) => void;
  }

  export let columns: Column[];
  export let data: Record<string, any>[];
  export let actions: TableAction[] = [];
</script>

<tbody>
  {#each data as row, i (row.id ?? i)}
    <tr>
      {#each columns as column (column.key)}
        <td>{row[column.key]}</td>
      {/each}

      {#if actions.length > 0}
        <td>
          <div class="actions">
            {#each actions as action}
              <button
                type="button"
                title={action.label}
                on:click={() => action.onClick(row)}
              >
                {#if action.icon}
                  <Icon name={action.icon} />
                {/if}
                {action.label}
              </button>
            {/each}
          </div>
        </td>
      {/if}
    </tr>
  {/each}
</tbody>
```

---

## 💡 5️⃣ Cómo usarlo en distintas tablas

Ahora cada tabla define **sus propias columnas y acciones**.

### 🧾 Tabla de ventas

```svelte
<script lang="ts">
  import Table from '@/components/ui/molecules/Table.svelte';

  const columns = [
    { key: 'nro_venta', label: 'N° Venta' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'total', label: 'Total ($)' }
  ];

  const data = [
    { nro_venta: 'V001', cliente: 'Juan Pérez', total: 5400 },
    { nro_venta: 'V002', cliente: 'Ana Gómez', total: 3200 }
  ];

  const actions = [
    {
      label: 'Facturar',
      icon: 'file-text',
      onClick: (row) => console.log('Facturar', row)
    },
    {
      label: 'Ver detalle',
      icon: 'eye',
      onClick: (row) => console.log('Ver detalle', row)
    }
  ];
</script>

<Table {columns} {data} {actions} />
```

---

### 🔩 Tabla de productos

```svelte
<script lang="ts">
  import Table from '@/components/ui/molecules/Table.svelte';

  const columns = [
    { key: 'nombre', label: 'Producto' },
    { key: 'precio', label: 'Precio ($)' },
    { key: 'stock', label: 'Stock' }
  ];

  const data = [
    { nombre: 'Clavo', precio: 50, stock: 200 },
    { nombre: 'Tornillo', precio: 100, stock: 20 }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: 'edit',
      onClick: (row) => console.log('Editar producto', row)
    },
    {
      label: 'Eliminar',
      icon: 'trash',
      onClick: (row) => console.log('Eliminar producto', row)
    }
  ];
</script>

<Table {columns} {data} {actions} />
```

---

## ✨ Ventajas de este enfoque

| Ventaja          | Descripción                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| 🔁 Reutilizable  | El componente `Table` no necesita saber qué acciones hay, solo las renderiza. |
| 🧩 Componible    | Cada tipo de tabla define sus propias columnas y acciones.                    |
| 🔐 Tipado fuerte | Podés tipar `actions` según el tipo de `row`.                                 |
| 🧠 Semántico     | Las acciones no “ensucian” los datos, son parte de la UI.                     |

---

## 🔧 Opcional: menú desplegable

Si querés un comportamiento más elegante, podés reemplazar los botones directos por un componente `ActionsMenu.svelte` (molécula) con un icono de tres puntos y un menú flotante.
El `TableBody` seguiría pasándole `{row, actions}` a ese componente.

---

¿Querés que te muestre cómo quedaría ese **componente `ActionsMenu.svelte`**, tipo menú de tres puntos (⋯), que se puede usar en la última columna de cualquier tabla? -->
