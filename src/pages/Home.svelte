<script lang="ts">
    import { Input } from "@components/ui";

    let inputValue: string = $state('')

    $effect(() => {
        console.log(inputValue)
    })
</script>

<h1>Inicio</h1>

<Input type="text" label="Input tipo texto por defecto" />
<br>
<Input type="text" label="Input tipo texto con formato DNI" format="dni" maxLength={10} />
<br>
<Input type="text" label="Input tipo texto con formato MONEDA" format="money" maxLength={15} />
<br>
<Input type="number" label="Input tipo number" />
<br>
<Input type="email" label="Input tipo email" />
<br>
<Input type="password" label="Input tipo password" showToggle={true} />
