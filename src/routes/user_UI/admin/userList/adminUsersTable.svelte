<script lang="ts">
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { DataHandler } from '@vincjo/datatables';

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();

</script>

<style>
	#user-container {
		padding: 0.8rem;
		font-size: 1.05rem;
	}

	#user-table {
		border-collapse: collapse;
		width: 100%;
	}

	.table tbody td {
		font-size: 0.97rem;
	}

</style>


<div id="user-container" class="overflow-y-auto space-y-4">
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table id="user-table" class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="user_ID">User ID</ThSort>
				<ThSort {handler} orderBy="account">Account</ThSort>
				<ThSort {handler} orderBy="password">Password</ThSort>
				<ThSort {handler} orderBy="enrollment_date">Enrollment Date</ThSort>
				<ThSort {handler} orderBy="address">Address</ThSort>
				<ThSort {handler} orderBy="email_address">Email Address</ThSort>
				<ThSort {handler} orderBy="birthdate">Birthdate</ThSort>
				<ThSort {handler} orderBy="age">age</ThSort>
			</tr>
		</thead>
		<tbody id="content" style="text-align: center;">
			<!-- display each product as following order: -->
			<!-- currently the price and discount attribute is not compatible-->
			<!-- in the above feature will result in some display error-->
			{#each $rows as row}
				<tr>
					<td>{row.user_ID}</td>
					<td>{row.account}</td>
					<td>{row.password}</td>
					<td>{row.enrollment_date}</td>
					<td>{row.address}</td>
					<td>{row.email_address}</td>
					<td>{row.birthdate}</td>
					<td>{row.age}</td>
				</tr>
			{:else}
				<tr>
					<p>
						Users not found!
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
