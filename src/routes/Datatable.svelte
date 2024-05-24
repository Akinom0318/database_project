<script lang="ts">
	import ThSort from '$lib/product_table/ThSort.svelte';
	import ThFilter from '$lib/product_table/ThFilter.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import Pagination from '$lib/product_table/Pagination.svelte';

    import { DataHandler } from '@vincjo/datatables';

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();

</script>


<div class="overflow-y-auto space-y-4">
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr >
				<ThSort {handler} orderBy="product_name">Product Name</ThSort>
				<ThSort {handler} orderBy="price">Price</ThSort>
				<ThSort {handler} orderBy="sales">Sales</ThSort>
				<ThSort {handler} orderBy="likes">Likes</ThSort>
				<ThSort {handler} orderBy="avg_score">Average Score</ThSort>
				<ThSort {handler} orderBy="tags">Tags</ThSort>
				<ThSort {handler} orderBy="stock">In Stock</ThSort>

			</tr>
			<tr>
				<ThFilter {handler} filterBy="product_name" />
				<ThFilter {handler} filterBy="price" />
				<ThFilter {handler} filterBy="sales" />
				<ThFilter {handler} filterBy="likes" />
				<ThFilter {handler} filterBy="avg_score" />
				<ThFilter {handler} filterBy="tags" />
				<ThFilter {handler} filterBy="stock" />
			</tr>
		</thead>
		<tbody style="text-align: center;">
			<!-- display each product as following order: -->
			<!-- currently the price and discount attribute is not compatible-->
			<!-- in the above feature will result in some display error-->
			{#each $rows as row}
				<tr>
					<td>{row.product_name}</td>
					<td>
						{#if row.discount !== 1}
							<s>
								{row.price}
							</s>
							<b>
								only
								{row.price * (1 - row.discount)} now !
							</b>
						{:else}
							{row.price}
						{/if}
					</td>
					<td>{row.sales}</td>
					<td>{row.likes}</td>
					<td>{row.avg_score}</td>
					<td>{row.tags}</td>
					<td>{row.stock}</td>
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