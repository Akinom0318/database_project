<script>
    import { fly } from "svelte/transition";
    import { current_account_ID } from '../../../../store';
    import MessageModal from "$lib/MessageModal.svelte";
    import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";

    let have_cart_item = new Array();
    let message_message = "Please take some time to give feed backs!"
    let message_visable = true;
    let local_current_account_ID = 0;
    let loading = false;
	let gratitude = false;

    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    })

    if(!local_current_account_ID && browser){
        goto('/')
    }
    async function get_user_item(){
        const response = await fetch("/cart/order_page/feed_back/feed_back_info")

        const cart_items = await response.json();

        for(const item of cart_items){
            if(item.cart_ID === local_current_account_ID)
            {
                have_cart_item.push(item);
            }
        }
        await fetch("feed_back/feed_back_info",{
            method: "DELETE",
            body: JSON.stringify({local_current_account_ID}),
        });
        loading = true;
    } 

	async function submit_review(){
		const response = await fetch("feed_back/feed_back_info", {
                    method: 'POST',
			        body: JSON.stringify({have_cart_item}),
			        headers: {
				    'content-type': 'application/json'
			    }
		    });
		gratitude = true;
	}

	function after_review_warning(){
		gratitude = false;
	}

	onMount(() => {
		get_user_item();
	})

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

{#if gratitude}
	<aside class="alert variant-soft-success" in:fly={{ y: 20 }}>
		<div class="alert-message">
			<h1 class="h1" style="text-align: left; padding-top: 0px;" >
				Thank you for your review!
			</h1>
		</div>
		<a href="/">
			<div class="alert-actions">
				<button on:click={after_review_warning} class="btn variant-filled">
					OK
				</button>
			</div>
		</a>
	</aside>
{/if}

{#if have_cart_item}
	<MessageModal bind:visible={message_visable} bind:message={message_message} />

	<div id="product-container" class="overflow-y-auto space-y-4" in:fly={{ y: 20 }}>
		<table id="cart-table" class="table table-hover table-compact w-full table-auto variant-glass-primary">
			<thead>
				<tr>
					<td>
						Product Name
					</td>
					<td>
						Review
					</td>
				</tr>
			</thead>

			<tbody id="content" style="text-align: center;">
				{#if loading}
					{#if have_cart_item.length === 0}
						<h3 class="h3">No Item Yet!</h3>
					{/if}
					{#each have_cart_item as item}
						<div class="row-product">
							<tr>
								<td style="margin-top: 5px;">
									{item.product_name}
								</td>
								<td>
									<Ratings value = {item.score} max = {5}>
										<svelte:fragment slot="empty"><span><img src="../../src/lib/images/empty_star.png" alt="empty_star"></span></svelte:fragment>
										<svelte:fragment slot="half"><span><img src="../../src\lib\images\half_star.png" alt="half_star"></span></svelte:fragment>
										<svelte:fragment slot="full"><span><img src="../../src\lib\images\full_star.png" alt="full_stars"></span></svelte:fragment>
									</Ratings>
									<RangeSlider name="range-slider" bind:value={item.score} max={5} step={0.5} ticked></RangeSlider>
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
		<footer>
			<center>
				<button on:click={submit_review} type="button" class="btn variant-filled-tertiary">
					Submit
				</button>
			</center>
		</footer>
	</div>
{/if}