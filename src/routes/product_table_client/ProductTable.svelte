<script lang="ts">
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables';
	import AddToCart from './AddToCart.svelte';
    import { fly } from "svelte/transition";

	let current_product = new Object();
	let add_to_cart_visible = false;

	//@ts-ignore
	function add_to_cart(product){
		current_product = product;
		add_to_cart_visible = true;
	}

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();

</script>

<style>
	#product-container {
		padding: 0.8rem;
		font-size: 1.05rem;
	}

	#product-table {
		border-collapse: collapse;
		width: 100%;
	}

	.table tbody td {
		font-size: 0.97rem;
	}

</style>

{#if add_to_cart_visible}
	<AddToCart bind:product={current_product} bind:visible={add_to_cart_visible}/>
{/if}

<div id="product-container" class="overflow-y-auto space-y-4" in:fly={{ y: 20 }}>
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table id="product-table" class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="product_name">Product Name</ThSort>
				<ThSort {handler} orderBy="selling_price">Price</ThSort>
				<ThSort {handler} orderBy="likes">Likes</ThSort>
				<ThSort {handler} orderBy="avg_score">Average Score</ThSort>
				<ThSort {handler} orderBy="tags">Tags</ThSort>
				<h3 class="h3" style="text-align: center; padding-top: 12px;">
					Buy it now!
				</h3>
			</tr>
		</thead>
		<tbody id="content" style="text-align: center;">
			{#each $rows as row}
				<tr>
					<td>{row.product_name}</td>
					<td>
						{#if row.discount !== 1}
							<s>
								{row.original_price}
							</s>
							<b>
								only
								{row.selling_price}
							</b>
						{:else}
							{row.selling_price}
						{/if}
					</td>
					<td>{row.likes}</td>
					<td>
						<Ratings value = {row.avg_score} max = {5}>
							<svelte:fragment slot="empty"><span><img src="src\lib\images\empty_star.png" alt="empty_star"></span></svelte:fragment>
							<svelte:fragment slot="half"><span><img src="src\lib\images\half_star.png" alt="half_star"></span></svelte:fragment>
							<svelte:fragment slot="full"><span><img src="src\lib\images\full_star.png" alt="full_stars"></span></svelte:fragment>
						</Ratings>
					</td>
					<td>{row.tags}</td>
					<td>
						<button on:click={() => {add_to_cart(row)}} type="button" class="btn btn-sm variant-filled-tertiary">
							Add to cart
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<p>
						Products not found!
					</p>
				</tr>
			{/each}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>