<script>
	//@ts-nocheck
    import { fly } from "svelte/transition";
    import { current_account_ID } from "../../store";
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { onMount } from "svelte";

	let loading = false;
    let local_current_account_ID = 0;
	let local_transaction= new Array;

    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    if(!local_current_account_ID && browser){
        goto('/');
    }

    async function get_all_transactions(){
        const response = await fetch("transaction/user_transaction");
        const all_transactions = await response.json();
        for(const transaction of all_transactions){
            if(transaction.user_ID === local_current_account_ID){
                transaction.time_slot = new Date(Date.parse(transaction.time_slot)).toISOString().split('T')[0]
                if(transaction.status ===1){
                    transaction.status = "Delivered";
                }else{
                    transaction.status = "Delivering";
                }
                local_transaction.push(transaction);
            }
        }
		loading = true;
        return local_transaction;
    }

    onMount(() => {
        get_all_transactions();
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


<div id="product-container" class="overflow-y-auto space-y-4" in:fly={{ y: 20 }}>
	<table id="cart-table" class="table table-hover table-compact w-full table-auto variant-ghost-primary">
		<thead>
			<tr>
				<td>
					Date
				</td>
				<td>
					Total Price
				</td>
                <td>
					Deliver Address
				</td>
                <td>
					Status
				</td>
			</tr>
		</thead>

		<tbody id="content" style="text-align: center;">
			{#if loading}
				{#if local_transaction.length === 0}
					<h3 class="h3">No Transaction Yet!</h3>
				{/if}
				{#each local_transaction as item}
					<div class="row-product">
						<tr>
							<td style="margin-top: 5px;">
								{item.time_slot}
							</td>
							<td style="margin-top: 5px;">
								{item.total_price}
							</td>
                            <td style="margin-top: 5px; font-size: 15px;">
								{item.delivering_address}
							</td>
                            {#if item.status === "Delivered"}
                                <td style="margin-top: 5px; color: greenyellow;">
                                    {item.status}
                                </td>
                            {:else}
                                <td style="margin-top: 5px; color: red;">
                                    {item.status}
                                </td>
                            {/if}
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
	</footer>
</div>