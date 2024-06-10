<script>
	//@ts-nocheck
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import MessageModal from "$lib/MessageModal.svelte";
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    import { current_account_ID } from "../../store";
    import ModifyCart from "./ModifyCart.svelte";

	let loading = false;
	let total_price = 0;
	let total_quantity = 0;
    let local_current_account_ID = 0;
	let local_current_account_cart_item = new Array;
	let current_product = new Object;
	let modify_visible = false;
	let out_of_stock_warning = false;
	let order_button_pressed = false;
	let out_of_stock_message = "Sorry,\n";


    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    if(!local_current_account_ID && browser){
        goto('/');
    }

    async function get_all_items(){
        const response = await fetch("cart/cart_item");
        const all_cart_items_object = await response.json();
		total_price = 0;
		total_quantity = 0;
		for(const item of all_cart_items_object){
			if(item.cart_ID === local_current_account_ID){
				total_price += Number(item.prices) * item.quantity;
				total_quantity += item.quantity;
				local_current_account_cart_item.push(item)
			}
		}
		loading = true;
    }

	async function modify_cart_item(item){
		current_product = item;
		modify_visible = true;
	}

	function check_order_valid(){
		let out_of_stock = false;
		out_of_stock_message = "Sorry,\n";
		for(const item of local_current_account_cart_item){
			if(item.quantity > item.stock){
				out_of_stock = true;
				out_of_stock_message = out_of_stock_message + item.product_name + "is only " + item.stock + " left\n";
			}
		}
		if(out_of_stock){
			out_of_stock_warning = true;
		}else{
			order_button_pressed = true;
		}
	}

	//TODO
	//need to prevent from 0 cart items
	function after_order_button_pressed(){
		order_button_pressed = false;
	}

	get_all_items();
	
</script>

<style>
	#cart-table{
		border-collapse: collapse;
		width: 100%;
		font-family: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
	}


	.table thead tr{
		display: flex;
		align-content: center;
		text-align: center;
		margin-top: 25px;
		margin-bottom: 25px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.table thead tr td{
		height: 50%;
		width: 50%;
		font-size: 40px;
	}

	.table tbody tr{
		display: flex;
		align-content: center;
	}

	.table tbody tr td{
		height: 50%;
		width: 50%;
		font-size: 30px;
	}

	footer{
		margin-left: 15px;
		margin-right: 15px;
	}
</style>

<!--
	In the .svlete file like ModifyCart
	MAKE SURE IT BE IN IF STATEMEMT!
	because without if, it will only display the page before modify
	However, what we want is it will display every item when item is modified!
-->
{#if modify_visible}
	<ModifyCart bind:product={current_product} bind:visible={modify_visible}/>
{/if}

<!--Out of stock message-->
{#if out_of_stock_message}
	<MessageModal bind:visible={out_of_stock_warning} bind:message={out_of_stock_message} />
{/if}

{#if order_button_pressed}
    <aside class="alert variant-ghost-warning" in:fly={{ y: 20 }}>
        <div class="alert-message">
            <h1 class="h1" style="text-align: left; padding-top: 0px;" >
                ⚠️You are leaving cart to order page
            </h1>
            <h2 class="h2">Are you sure you done checking what you want?</h2>
        </div>
        <div class="alert-actions">
			<a href="/cart/order_page">
				<button on:click={after_order_button_pressed} class="btn variant-filled">
					Yes
				</button>
			</a>
            <button on:click={after_order_button_pressed} class="btn variant-filled">
                No
            </button>
        </div>
    </aside>
{/if}

<div id="product-container" class="overflow-y-auto space-y-4" in:fly={{ y: 20 }}>
	<table id="cart-table" class="table table-hover table-compact w-full table-auto variant-ghost-primary">
		<thead>
			<tr>
				<td>
					Product Name
				</td>
				<td>
					Quantity
				</td>
				<td>
					Product Price
				</td>
				<td>
					Modify
				</td>
			</tr>
		</thead>
		<tbody id="content" style="text-align: center;">
			{#if loading}
				{#if local_current_account_cart_item.length == 0}
					<h3 class="h3">No Item Yet!</h3>
				{/if}
				{#each local_current_account_cart_item as item}
					<div class="row-product">
						<tr>
							<td style="margin-top: 5px;">
								{item.product_name}
							</td>
							<td style="margin-top: 5px;">
								{item.quantity}
							</td>
							<td style="margin-top: 5px;">
								{item.prices}
							</td>
							<td style="margin-right: 20px;">
								<button on:click={() => {modify_cart_item(item)}} type="button" class="btn btn-sm variant-filled-secondary">
									Modify
								</button>
							</td>
						</tr>
					</div>
				{/each}
			{:else}
				<center>
					<ProgressRadial width="w-10"/>
				</center>
			{/if}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<h3 class="h3">
			Total Price: {total_price}
		</h3>
		<button on:click={check_order_valid} type="button" class="btn variant-filled-secondary">
			Order
		</button>
		<h3 class="h3">
			Total Quantity: {total_quantity}
		</h3>
	</footer>
</div>