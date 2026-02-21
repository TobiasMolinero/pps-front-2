<script lang="ts">
    import Select from "@components/ui/atoms/Select.svelte";
    import { DatePicker, Heading, Input } from "@components/ui";
    import { billTypesOptions, customerConditionA, customerConditionB, documentTypeOptions, paymentMethodsOptions } from "@features/ventas/helpers/sales";
    import Button from "@components/ui/atoms/Button.svelte";
    import SaleDetail from "@features/ventas/components/SaleDetail.svelte";
    import { storeDetailSale, storeSelectedBillType, storeSelectProducts, updateSales } from "@features/ventas/store";
    import { safeApiRequest } from "@lib/api/safeApiRequest";
    import { apiRoutes } from "@lib/api/endpoints";
    import type { FormSaleData, SelectProduct } from "@features/ventas/interfaces/interfaces";
    import { onMount } from "svelte";
    import { addDetailToStore, calculateIva, calculateSubTotal, calculateTotal, createSale, editSale, facturarVenta, getDataOneSale, prepareRequestData } from "@features/ventas/helpers/helpers";
    import { alert_error, loading, loadingTicket, question, success } from "@lib/utils/alerts";
    import { querystring, push, location } from 'svelte-spa-router'
    import { openTicketInNewTab } from "@lib/utils/ticketService";

    let inputDate: string = $state(new Date().toLocaleDateString('en-CA'));
    let selectPaymentMethodInput: string = $state("");
    let inputObservations: string = $state("");
    let inputCustomerCondition: string = $state("consumidor");
    let inputDocumentType: string = $state("CUIL")
    let inputNroDocument: string = $state("");
    let inputName: string = $state("");
    let inputAddress: string = $state("");

    let selectProductInput: number = $state(0);
    let inputQuantity: number = $state(0);
    let isAddButtonDisabled: boolean = $state(true);
    let isCleanButtonShow: boolean = $state(false);

    let errorSelectPaymentMethod: string = $state('');
    let errorInputNroDocument: string = $state('');
    let errorInputName: string = $state('');
    let errorInputAdress: string = $state('');
    let errorDetailSale: boolean = $state(false);

    let total: number = $state(0);
    let subTotal: number = $state(0);
    let iva: number = $state(0);

    function formatearNumeroConPuntos(numero: number) {
        let [entero, decimal] = numero.toFixed(2).toString().split('.')
        entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        return decimal && decimal !== "00" ? `${entero},${decimal}` : entero
    }

    const getProductsOption = async () => {
        const res = await safeApiRequest<SelectProduct[]>('get', apiRoutes.products + '/get/all-products');
        if(!res.ok) return;

        return res.data;
    }

    const handleAddDetailItem = () => {
        addDetailToStore(inputQuantity, selectProductInput);
        selectProductInput = 0;
        inputQuantity = 0;
    }

    const handleSubmit = async () => {
        const formErrors: string[] = validateForm();
        
        if(formErrors.length !== 0) {
            let errorMessage = 'Debe completar los campos obligatorios: '
            formErrors.map((error, index) => {
                if (index === formErrors.length - 1) {
                    errorMessage += (error + '.');
                } else {
                    errorMessage += (error + ', ');
                }
            })
            alert_error.fire({ text: errorMessage })
            return;
        }

        const formSaleData: FormSaleData = {
            id_tipo_factura: $storeSelectedBillType,
            fecha_venta: inputDate,
            metodo_pago: selectPaymentMethodInput,
            observaciones: inputObservations.trim(),
            condicion_iva_cliente: inputCustomerCondition,
            tipo_documento_cliente: inputDocumentType,
            nro_documento_cliente: inputNroDocument.trim().replace(/\D/g, ''),
            nombre_cliente: inputName.trim(),
            domicilio_cliente: inputAddress.trim(),
        }

        loading.fire();

        const requestData = prepareRequestData(formSaleData);
        const res = await createSale(requestData);
        
        if (!res.ok) return alert_error.fire({ text: res.message });

        const saleID = res.data.id_venta;
        await success.fire({ text: 'La venta fue registrada con éxito' });
        resetForm();

        const { isConfirmed } = await question.fire({ text: '¿Facturar venta?' })

        if(isConfirmed) {
            loading.fire();
            const res = await facturarVenta(saleID);
            if(!res.ok) return alert_error.fire({ text: res.message });

            success.fire({ text: 'La venta fue facturada con éxito' });
            
            loadingTicket.fire();
            openTicketInNewTab(saleID);
            success.fire({ text: 'Ticket generado exitosamente' });
        }

        $updateSales = true;
    }

    const validateForm = (): string[] => {
        const errors: string[] = []
        if(selectPaymentMethodInput === '') {
            errorSelectPaymentMethod = 'Debe seleccionar un metodo de pago';
            errors.push('Metodo de pago');
        }

        if(($storeSelectedBillType === 1 && inputNroDocument === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'monotributo' && inputNroDocument === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'exento' && inputNroDocument === '') 
        ) {
            errorInputNroDocument = 'El CUIL/CUIT es obligatorio';
            errors.push('Nro. de documento');
        }

        if(($storeSelectedBillType === 1 && inputName === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'monotributo' && inputName === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'exento' && inputName === '') 
        ) {
            errorInputName = 'El nombre/razón social es obligatorio';
            errors.push('Nombre');
        }

        if(($storeSelectedBillType === 1 && inputAddress === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'monotributo' && inputAddress === '') ||
            ($storeSelectedBillType === 2 && inputCustomerCondition === 'exento' && inputAddress === '') 
        ) {
            errorInputAdress = 'La dirección es obligatoria';
            errors.push('Dirección');
        }

        if($storeDetailSale.length === 0) {
            errorDetailSale = true;
            errors.push('Detalle de venta');
        }

        return errors;
    }

    const handleEdit = async () => {
        const formErrors: string[] = validateForm();

        if(formErrors.length !== 0) {
            let errorMessage = 'Debe completar los campos obligatorios: '
            formErrors.map((error, index) => {
                if (index === formErrors.length - 1) {
                    errorMessage += (error + '.');
                } else {
                    errorMessage += (error + ', ');
                }
            })
            alert_error.fire({ text: errorMessage })
            return;
        }

        loading.fire();

        const id_venta = Number($querystring?.split('=')[1]);
        const formSaleData: FormSaleData = {
            id_tipo_factura: $storeSelectedBillType,
            fecha_venta: inputDate,
            metodo_pago: selectPaymentMethodInput,
            observaciones: inputObservations.trim(),
            condicion_iva_cliente: inputCustomerCondition,
            tipo_documento_cliente: inputDocumentType,
            nro_documento_cliente: inputNroDocument.trim().replace(/\D/g, ''),
            nombre_cliente: inputName.trim(),
            domicilio_cliente: inputAddress.trim(),
        }
        
        const requestData = prepareRequestData(formSaleData);
        const res = await editSale(id_venta, requestData);

        if (!res.ok) return alert_error.fire({ text: res.message });

        await success.fire({ text: 'La venta fue modificada con exito'})
        $updateSales = true
        push('/ventas')
    }

    const resetForm = () => {
        $storeSelectedBillType = 2;
        inputDate = new Date().toLocaleDateString('en-CA');
        selectPaymentMethodInput = '';
        inputObservations = '';
        inputCustomerCondition = 'consumidor';
        inputDocumentType = 'CUIL';
        inputNroDocument = '';
        inputName = '';
        inputAddress = '';
        $storeDetailSale = [];
    }

    $effect(() => {
        isAddButtonDisabled = !(selectProductInput > 0 && inputQuantity > 0);

        if(inputCustomerCondition === 'resp_inscripto' || inputCustomerCondition === 'monotributo') inputDocumentType = 'CUIT';

        if ($storeDetailSale.length > 0) {
            subTotal = calculateSubTotal();
            iva = calculateIva();
            total = calculateTotal();
        } else {
            subTotal = 0
            iva = 0
            total = 0
        }

        if(selectPaymentMethodInput !== '') errorSelectPaymentMethod = '';
        if(inputNroDocument !== '') errorInputNroDocument = '';
        if($storeDetailSale.length !== 0) errorDetailSale = false;
    })

    onMount(async () => {
        console.log(new Date().toLocaleDateString('en-CA'))
        const productsOptions = await getProductsOption();
        if(productsOptions) $storeSelectProducts = productsOptions;

        if($location === '/registrar-venta') {
            $storeDetailSale = [];
        }

        if($querystring) {
            const id = Number($querystring.split('=')[1])
            const res = await getDataOneSale(id);

            if (res.ok) {
                const saleData = res.data.data
                
                $storeSelectedBillType = saleData.id_tipo_factura;
                inputDate = saleData.fecha_venta.substring(0, 10);
                selectPaymentMethodInput = saleData.metodo_pago;
                inputObservations = saleData.observaciones;
                inputCustomerCondition = saleData.condicion_iva_cliente;
                inputName = saleData.tipo_documento_cliente;
                inputNroDocument = saleData.nro_documento_cliente;
                inputName = saleData.nombre_cliente;
                inputAddress = saleData.domicilio_cliente;

                $storeDetailSale = saleData.detalle.map(d => { 
                    let precio_sin_iva = d.precio / 1.21
                    const iva = precio_sin_iva * 0.21
                    return {
                        id_producto: 0,
                        cod_producto: d.cod_producto,
                        nombre_producto: d.nombre_producto,
                        precio: d.precio,
                        cantidad: d.cantidad,
                        precio_sin_iva: precio_sin_iva.toFixed(2),
                        iva: iva.toFixed(2)
                }})
            }
        }
    })
</script>

<div class="global-container">
    <div class="title-container">
        <Heading level={2} textAlign="text-start">
            {#snippet children()}
                {$querystring ? 'Editar venta' : 'Registrar nueva venta'}
            {/snippet}
        </Heading>
    </div>
    <div class="bill-data-container">
        <Select
            label="Tipo de factura *"
            options={billTypesOptions}
            valueKey="id"
            displayKey="tipo_factura"
            bind:value={$storeSelectedBillType}
        />
        <DatePicker label="Fecha de venta" value={inputDate} disabled={true} />
        <Select
            label="Metodo de pago *"
            options={paymentMethodsOptions}
            valueKey="value"
            displayKey="label"
            error={errorSelectPaymentMethod}
            bind:value={selectPaymentMethodInput}
        />
        <Input
            label="Observaciones"
            type="text"
            bind:value={inputObservations}
        />
    </div>
    <div class="client-data-container">
        <Heading level={3} textAlign="text-start">
            {#snippet children()}
                Datos del cliente
            {/snippet}
        </Heading>
        <div>
            <div style="display: flex; column-gap: 10px">
                <div style="width: 200px">
                    <Select options={$storeSelectedBillType === 1 ? customerConditionA : customerConditionB} valueKey="value" displayKey="label" label="Condicion frente al IVA" bind:value={inputCustomerCondition} />
                </div>
                {#if inputCustomerCondition === 'exento'}                        
                    <div style="width: 200px">
                        <Select options={documentTypeOptions} valueKey="value" displayKey="label" label="Tipo de documento" bind:value={inputDocumentType} />
                    </div>
                {/if}
            </div>
            {#if $storeSelectedBillType === 1 || 
                ($storeSelectedBillType === 2 && inputCustomerCondition === 'monotributo') ||
                ($storeSelectedBillType === 2 && inputCustomerCondition === 'exento')
            }
                <div class="client-data-inputs">
                    <Input
                        label={inputDocumentType === 'CUIL' ? 'CUIL *' : 'CUIT *'}
                        type="text"
                        format={inputDocumentType === 'DNI' ? 'dni' : 'cuil'}
                        maxLength={inputDocumentType === 'DNI' ? 10 : 13}
                        error={errorInputNroDocument}
                        bind:value={inputNroDocument}
                    />
                    <Input
                        label="Razón Social *"
                        type="text"
                        error={errorInputName}
                        bind:value={inputName}
                    />
                    <Input label="Domicilio *" type="text" error={errorInputAdress} bind:value={inputAddress} />
                </div>
            {/if}
        </div>
    </div>
    <div class="bill-detail-container">
        <Heading level={3} textAlign="text-start">
            {#snippet children()}
                Detalle de la venta
            {/snippet}
        </Heading>
        <div class="detail-form">
            <div class="detail-form-inputs">
                <Select
                    label="Producto"
                    options={$storeSelectProducts}
                    valueKey="id"
                    displayKey="nombre_producto"
                    bind:value={selectProductInput}
                />
                <Input
                    label="Cantidad"
                    type="number"
                    bind:value={inputQuantity}
                />
            </div>
            <div class="detail-form-buttons">
                <Button
                    variant="primary"
                    type="button"
                    disabled={isAddButtonDisabled}
                    onclick={handleAddDetailItem}
                >
                    {#snippet label()}
                        Agregar
                    {/snippet}
                </Button>
                {#if isCleanButtonShow}
                    <Button variant="secondary" type="button">
                        {#snippet label()}
                            Borrar todo
                        {/snippet}
                    </Button>
                {/if}
            </div>
        </div>
        <div class="sale-detail-container">
            <SaleDetail />
        </div>
    </div>
    <div class="footer-form">
        {#if $storeSelectedBillType === 1}
            <div>
                <span class="text-slate-800 font-[700]">Sub Total:</span>
                <span class="w-[150px] text-end text-[18px] font-[700]"
                    >$ {formatearNumeroConPuntos(subTotal)}</span
                >
            </div>
            <div>
                <span class="text-slate-800 font-[700]">IVA 21%:</span>
                <span class="w-[150px] text-end text-[18px] font-[700]"
                    >$ {formatearNumeroConPuntos(iva)}</span
                >
            </div>
        {/if}
        <div>
            <span class="text-slate-800 font-[700]">Monto total:</span>
            <span class="w-[150px] text-end text-[18px] font-[700]"
                >$ {formatearNumeroConPuntos(total)}</span
            >
        </div>
    </div>
    <div class="button-container">
        {#if errorDetailSale}
            <p class="error-detail">Debe generar un detalle para la venta</p>
        {/if}
        <div class="w-[200px]">
            <Button variant="primary" type="button" onclick={$querystring ? handleEdit : handleSubmit}>
                {#snippet label()}
                    {$querystring ? 'Editar venta' : 'Registrar venta'}
                {/snippet}
            </Button>
        </div>
    </div>
</div>

<style>
    .global-container {
        overflow-y: auto;
        padding-bottom: 20px;
    }

    .title-container {
        padding: 0 var(--space-2);
    }

    .bill-data-container {
        display: flex;
        justify-content: start;
        gap: var(--space-4);
        padding: var(--space-4);
    }

    .client-data-container {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-2);
        padding: var(--space-4);
    }

    .client-data-inputs {
        margin-top: 10px;
        display: flex;
        justify-content: start;
        gap: var(--space-4);
    }

    .bill-detail-container {
        padding: var(--space-4);
    }

    .detail-form {
        display: flex;
        justify-content: start;
        align-items: end;
        gap: var(--space-4);
    }

    .detail-form-inputs {
        display: flex;
        justify-content: start;
        gap: var(--space-2);
    }

    .sale-detail-container {
        overflow: hidden;
        background-color: var(--text-white);
        margin: var(--space-2) 0;
        border: 1px solid #00000050;
        border-radius: 10px;
    }

    .footer-form {
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
    }
    .footer-form div {
        display: flex;
        justify-content: end;
        align-items: end;
        column-gap: 40px;
        padding-top: 10px;
    }
    /* *:pt-[10px] *:flex *:justify-end *:items-end *:gap-x-[40px] */

    .button-container {
        padding: 0 var(--space-4);
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
    }

    .error-detail {
        color: red;
        font-weight: 600;
    }
</style>
