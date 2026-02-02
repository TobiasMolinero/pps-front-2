<script lang="ts">
    import Select from "@components/ui/atoms/Select.svelte";
    import { DatePicker, Heading, Input } from "@components/ui";
    import { billTypesOptions, paymentMethodsOptions } from "@features/ventas/helpers/sales";
    import Button from "@components/ui/atoms/Button.svelte";

    let selectTypeBillInput: number = $state(0);
    let selectPaymentMethodInput: string = $state("");
    
    let selectProductInput: number = $state(0);
    let inputQuantity: number = $state(0); 
    let isAddButtonDisabled: boolean = $state(true);
    
    $effect(() => {
        if(inputQuantity) console.log(inputQuantity)
        isAddButtonDisabled = !(selectProductInput > 0 && inputQuantity > 0);
    })
</script>

<div class="title-container">
    <Heading level={2} textAlign="text-start">
        {#snippet children()}
            Registrar nueva venta
        {/snippet}
    </Heading>
</div>
<div class="bill-data-container">
    <Select
        label="Tipo de factura"
        options={billTypesOptions}
        valueKey="id"
        displayKey="tipo_factura"
        bind:value={selectTypeBillInput} 
    />
    <DatePicker 
        label="Fecha de venta"
        value={new Date().toISOString().split('T')[0]}
        disabled={true}
    />
    <Select
        label="Metodo de pago"
        options={paymentMethodsOptions}
        valueKey="value"
        displayKey="label"
        bind:value={selectPaymentMethodInput} 
    />
    <Input 
        label="Observaciones"
        type="text"
    />
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
                options={[]}
            />
            <Input 
                label="Cantidad"
                type="number"
                bind:value={inputQuantity}
            />
        </div>
        <div class="detail-form-buttons">
            <Button variant="primary" disabled={isAddButtonDisabled}>
                {#snippet label()}
                    Agregar
                {/snippet}
            </Button>
        </div>
    </div> 
</div>

<style>
    .title-container {
        padding: 0 var(--space-2);
    }

    .bill-data-container {
        display: flex;
        justify-content: start;
        gap: var(--space-4);
        padding: var(--space-4);
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
</style>