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
	let local_current_account_like_item= new Array;

    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    if(!local_current_account_ID && browser){
        goto('/');
    }

    async function get_all_likings(){
        const response = await fetch("liking_list/liking_item");
        const all_cart_items_object = await response.json();
        for(const like_item of all_cart_items_object){
            if(like_item.user_ID === local_current_account_ID){
                local_current_account_like_item.push(like_item);
            }
        }
		loading = true;
        return local_current_account_like_item;
    }
	
    onMount(() => {
        get_all_likings();
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
					Product Name
				</td>
				<td>
					Product Price
				</td>
                <td>
					Tags
				</td>
                <td>
					Likes
				</td>
			</tr>
		</thead>

		<tbody id="content" style="text-align: center;">
			{#if loading}
				{#if local_current_account_like_item.length === 0}
					<h3 class="h3">No Item Yet!</h3>
				{/if}
				{#each local_current_account_like_item as item}
					<div class="row-product">
						<tr>
							<td style="margin-top: 5px;">
								{item.name}
							</td>
							<td style="margin-top: 5px;">
								{item.price}
							</td>
                            <td style="margin-top: 5px;">
								{item.tags}
							</td>
                            <td style="margin-top: 5px;">
								{item.likes}
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
	</footer>
</div>