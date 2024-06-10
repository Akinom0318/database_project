<script lang="ts">
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import DeleteUserMessage from './DeleteUserMessage.svelte';
	import { current_account } from '../../../../store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	})

	let deleted_user = new Object();
	let deleting_visible = false;

	//@ts-ignore
	function delete_user(user){
		deleted_user = user;
		deleting_visible = true;
		console.log(deleted_user);
	}

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();

	if(!local_current_account && browser){
		onMount(() => {
			goto('/login');
		});
	};

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

<DeleteUserMessage bind:user={deleted_user} bind:visible={deleting_visible}/>


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
				<h3 class="h3" style="text-align: center; padding-top: 12px;">
					Delete the user
				</h3>
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
						<td>
							<button on:click={() => delete_user(row)} type="button" class="btn btn-sm variant-filled-tertiary">
								Delete
							</button>
						</td>
					</tr>
			{/each}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>

