<script lang="ts">
    interface Props {
        value: string
        minValue?: number
        maxValue?: number
        minLength?: number
        maxLength?: number
        error?: boolean
        onClick?: (value: string) => void
        onInput?: (value: string) => void
    }

    let {
        value = $bindable(),
        minValue = 1,
        maxValue = 999,
        minLength = 1,
        maxLength = 3,
        error = false,
        onClick = () => {},
        onInput = () => {}
    }: Props = $props();

    const decrementValue = () => {
        let numericValue = Number(value)
        value = numericValue === minValue ? String(minValue) : String(numericValue - 1)
        onClick(value)
    }
    
    const incrementValue = () => {
        let numericValue = Number(value)
        value = numericValue === maxValue ? String(maxValue) : String(numericValue + 1)
        onClick(value)
    }

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement
        value = target.value
        onInput(value)
    }
    
    $effect (() => {
        const regex = /^(?!0)\d*$/;
    
        if(value.length === 0){
            error = true
        } else if(value.length === 3) {
            value.slice(0, 3)
        }else if (regex.test(value)) {
            value = value;
            error = false
        } else {
            value = value.replace(/^0/, '');
            value = "1"
            error = false
        }
    })
</script>

<div class="container" class:error={error}>
    {#if error}
        <span>La cantidad no puede quedar vacía</span>
    {/if}
    <button onclick={decrementValue} type="button" class="decrement-button">-</button>
    <input bind:value type="text" minlength={minLength} maxlength={maxLength} class="w-[50px] text-center border-x focus:outline-none" oninput={handleInput}> 
    <button onclick={incrementValue} type="button" class="increment-button">+</button>
</div>

<style>
    .container {
        position: relative;
        width: 100px;
        height: 30px;
        border: 1px solid #e6dfdf;
        border-radius: 5px;
        display: flex;
        justify-content: start;
    }
    .container.error {
        border-color: red;
    }

    .decrement-button, .increment-button {
        width: 25px;
        border: none;
        outline: none;
        background: #e6dfdf;
        cursor: pointer;
    }
    .decrement-button:hover, .increment-button:hover {
        background: grey;
    }
    .decrement-button:active, .increment-button:active {
        background: #e6dfdf;
    }

    .decrement-button {
        border-radius: 3px 0 0 3px;
    }
    .increment-button {
        border-radius: 0 3px 3px 0;
    }

    input {
        width: 50px;
        text-align: center;
        border-left: 1px solid #e6dfdf;
        border-right: 1px solid #e6dfdf;
        border-top: 0;
        border-bottom: 0;
    }
    input:focus {
        outline: none;
    }

    span{
        position: absolute;
        top: -40px;
        left: -80px;
        width: 250px;
        border-radius: 10px;
        text-align: center;
        color: red;
        padding: 5px 0;
        background-color: #e69797de;
        box-shadow: 1px 1px 5px #00000050;
        transition: 0.3s;
        animation: mostrar .3s;
    }
    span::after{
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: rotate(45deg) translateX(-50%);
        background-color: #e69797de;
        z-index: 1;
    }

    @keyframes mostrar{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>