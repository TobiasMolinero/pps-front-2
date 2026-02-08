<script lang="ts">
    import { formatMoney } from "@lib/formatters";
    import { storeDetailSale, storeSelectedBillType, storeSelectProducts } from "../store";
    import Counter from "@components/ui/molecules/Counter.svelte";
    import deleteIcon from '@assets/icons/trash-fill.svg';
    import { Tooltip } from "@components/ui";
    import { safeApiRequest } from "@lib/api/safeApiRequest";
    import { apiRoutes } from "@lib/api/endpoints";
    import { onMount } from "svelte";
    import type { SelectProduct } from "../interfaces/interfaces";
    import { deleteProductFromDetail, modifyQantProduct } from "../helpers/helpers";

    let counterValue: string = $state("1");
</script>

<table>
    <thead>
        <tr>
            <th style="width: 60px;"></th>
            <th style="width: 140px;">Cod. Producto</th>
            <th style="width: 30%;">Nombre</th>
            {#if $storeSelectedBillType === 3}
                <th>Precio x ud.</th>
            {:else}
                <th>Precio x ud.</th>
                <th>IVA 21%</th>
            {/if}
            <th>Cantidad</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {#if $storeDetailSale.length}
            {#each $storeDetailSale as detail (detail.id_producto)}                
                <tr>        
                    <td style="width: 30px;">
                        <Tooltip label="Remover producto" position="right">
                            {#snippet children()}
                                <button type="button" class="delete-button" onclick={() => deleteProductFromDetail(detail.id_producto)}>
                                    <img src={deleteIcon} alt="Boton eliminar">
                                </button>
                            {/snippet}
                        </Tooltip>
                    </td>
                    <td style="width: 140px;">{detail.cod_producto}</td>
                    <td style="width: 30%;">{detail.nombre_producto}</td>
                    {#if $storeSelectedBillType === 3}
                        <td>$ {detail.precio}</td>
                    {:else}
                        <td>$ {detail.precio_sin_iva}</td>
                        <td>$ {detail.iva}</td>
                    {/if}   
                    <td>
                        <Counter 
                            value={detail.cantidad === 0 ? "" : detail.cantidad.toString()}
                            onClick={(value: string) => modifyQantProduct(detail.id_producto, Number(value))}
                            onInput={(value: string) => modifyQantProduct(detail.id_producto, Number(value))}
                        />
                    </td>
                    <td>$ {detail.precio * detail.cantidad}</td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>

<style>
    table {
        background: white;
        width: 100%;
        position: relative;
        border-collapse: collapse;
    }

    thead {
        position: sticky;
        top: 0;
        background: white;
        box-shadow: -4px 1px 1px 1px #0f172a;
    }

    tr th, tr td {
        padding: 10px;
        text-align: start;
    }

    .delete-button {
        position: relative;
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: none;
        display: grid;
        place-items: center;
        box-shadow: 1px 1px 3px #00000050;
        border-radius: 5px;
        background: rgb(200, 0, 0);
    }
    .delete-button:hover {
        background: rgb(228, 0, 0);
    }
    .delete-button:active {
        background: rgb(200, 0, 0);
    }

    .delete-button img {
        width: 16px;
    }
</style>