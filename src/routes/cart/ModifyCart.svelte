<script>
    import { fly } from "svelte/transition";
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import { current_account_ID } from "../../store";
    import { goto } from '$app/navigation';

    export let product = Object();
    export let visible = false;


    let each_product_price = product.prices;

    let local_current_account_ID = 0

    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    let slide_value = product.quantity;
    let slide_max = product.quantity;

    if(slide_max > 100){
        slide_max = 100;
    }

    let total_price = 0;

    function close() {
        visible = false;
    }

    function reloadPage() {
        const thisPage = window.location.pathname;

        console.log('goto ' + thisPage);

        goto('/').then(
            () => goto(thisPage)
        );
    }

    async function modify_cart_confirm(){
        visible = false;
        total_price = slide_value * each_product_price;
        let product_ID = product.product_ID
        const response = await fetch("cart/cart_item", {
                method: 'POST',
                body: JSON.stringify({local_current_account_ID, product_ID, slide_value, total_price}),
                headers: {
            'content-type': 'application/json'
            }
        });
        reloadPage();
    }


</script>

<style>
    div.button{
        text-align: center;
    }

    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: rgba(var(--color-primary-800) / 1);
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        text-align: auto;
        color: rgb(255, 254, 254)
    }

    .close {
        color: #000000;
        float: right;
        /* position: absolute; */
        top: 10px;
        right: 10px;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: rgb(218, 182, 182);
        text-decoration: none;
        cursor: pointer;
    }
</style>

{#if visible}
    <div class="modal" in:fly={{ y: 20 }}>
        <div class="modal-content">
            <button class="close" on:click={close}>
                &times;
            </button>
            <h4 class="h4">Item: {product.product_name}</h4>
            <h4 class="h4">Current Price: {product.prices}</h4>
            <RangeSlider name="range-slider" bind:value={slide_value} max={slide_max} step={1} ticked>
                <div class="flex justify-between items-center">
                    <div class="font-bold">Quantity</div>
                    <div class="text-xs">{slide_value} / {slide_max}</div>
                </div>
            </RangeSlider>
            <h4 class="h4">Modified Price: {each_product_price * slide_value}</h4>
            <div class="button">
                <button on:click={modify_cart_confirm} type="button" class="btn btn-sm variant-filled-tertiary">
                    Confirm
                </button>                
            </div>
        </div>
    </div>
{/if}