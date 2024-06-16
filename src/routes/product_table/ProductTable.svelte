<script lang="ts">
	//@ts-nocheck
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables';
	import AddToCart from './AddToCart.svelte';
	import { fly } from "svelte/transition";
	import { current_account_ID, current_product_page,current_keyword } from '../../store';
    import { goto } from '$app/navigation';

	let current_product = new Object();
	let add_to_cart_visible = false;
	let local_current_account_ID = 0;
	let local_current_product_page = 1;
	let local_keyword = "";
	let user_search_history = [];

	current_account_ID.subscribe((value) => {
		local_current_account_ID = value;
	})

	if(local_current_account_ID != -1){
			current_keyword.subscribe((value) => {
			local_keyword = value;
			if(local_keyword != ""){
				add_new_keyword();
			}
		})
	}

	async function add_new_keyword(){
		const response = await fetch("product_table/keyword",{
            method: "POST",
            body: JSON.stringify({local_current_account_ID, local_keyword}),
			headers: {
            'content-type': 'application/json'
            }
		});
	}

	async function get_search_history(){
		const response = await fetch("product_table/keyword");
        let all_search_history = await response.json();
		for(const history of all_search_history){
			if(history.user_ID === local_current_account_ID){
				user_search_history.push(history);
				if(user_search_history.length > 5){
					return;
				}
			}
		}
        return user_search_history;
	}

	async function list_keyword(){
		await get_search_history();

		return true;
	}


	function add_to_cart(product){
		current_product = product;
		add_to_cart_visible = true;
	}

	function reloadPage() {
        const thisPage = window.location.pathname;

        goto('/transition_page').then(
			() => goto(thisPage)
        );
    }

	async function get_all_likings(){
        const response = await fetch("product_table/liking_product");
        let all_likings = await response.json();
        return all_likings;
    }


	async function add_to_like(item){
        const response = await fetch("product_table/liking_product",{
            method: "POST",
            body: JSON.stringify({item, local_current_account_ID}),
			headers: {
            'content-type': 'application/json'
            }
        });
		reloadPage();
	}



	//for table display user like items
	async function check_liking(item){
		const all_likings = await get_all_likings();
		for(const like of all_likings){
			if(like.user_ID === local_current_account_ID && like.product_ID === item.product_ID){
				return true
			}
		}
		return false;
	}

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();
	
	current_product_page.subscribe((value) => {
		local_current_product_page = value;
		handler.setPage(local_current_product_page);
	})

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

	#like_button{
		margin-top: 15px;
	}

	#dislike_button{
		margin-top: 15px;
	}

</style>

{#if add_to_cart_visible}
	<AddToCart bind:product={current_product} bind:visible={add_to_cart_visible}/>
{/if}

<div id="product-container" class="overflow-y-auto space-y-4" in:fly={{ y: 20 }}>
	<header class="flex justify-between">
		{#await list_keyword()}
			<p>...</p>
		{:then}
			<Search {handler}  bind:history={user_search_history}/>		
		{/await}
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
					{#await check_liking(row)}
						<p>...</p>
					{:then value}
						{#if value}
							<button class="chip variant-soft hover:variant-filled" on:click={() =>{
								add_to_like(row)
							}} id="dislike_button">
							<span>{row.likes}❤️</span>
							</button>
						{:else}
							<button class="chip variant-soft hover:variant-filled" on:click={() =>{
								add_to_like(row)
							}} id="like_button">
							<span>{row.likes}🖤</span>
							</button>
						{/if}
					{/await}
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