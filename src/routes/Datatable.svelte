<script lang="ts">
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables';

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

<div id="product-container" class="overflow-y-auto space-y-4">
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table id="product-table" class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="product_name">Product Name</ThSort>
				<ThSort {handler} orderBy="selling_price">Price</ThSort>
				<ThSort {handler} orderBy="sales">Sales</ThSort>
				<ThSort {handler} orderBy="likes">Likes</ThSort>
				<ThSort {handler} orderBy="avg_score">Average Score</ThSort>
				<ThSort {handler} orderBy="tags">Tags</ThSort>
			</tr>
		</thead>
		<tbody id="content" style="text-align: center;">
			<!-- display each product as following order: -->
			<!-- currently the price and discount attribute is not compatible-->
			<!-- in the above feature will result in some display error-->
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
					<td>{row.sales}</td>
					<td>{row.likes}</td>
					<td>
						<Ratings value = {row.avg_score} max = {5}>
							<svelte:fragment slot="empty"><span><img src="src\lib\images\empty_star.png" alt="empty_star"></span></svelte:fragment>
							<svelte:fragment slot="half"><span><img src="src\lib\images\half_star.png" alt="half_star"></span></svelte:fragment>
							<svelte:fragment slot="full"><span><img src="src\lib\images\full_star.png" alt="full_stars"></span></svelte:fragment>
						</Ratings>
					</td>
					<td>{row.tags}</td>
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