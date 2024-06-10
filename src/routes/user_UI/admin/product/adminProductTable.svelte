<script lang="ts">
	// import { goto } from '$app/navigation';
	import MessageModal from '$lib/MessageModal.svelte';
	import Pagination from '$lib/product_table/Pagination.svelte';
	import RowCount from '$lib/product_table/RowCount.svelte';
	import RowsPerPage from '$lib/product_table/RowsPerPage.svelte';
	import Search from '$lib/product_table/Search.svelte';
	import ThSort from '$lib/product_table/ThSort.svelte';
	import { popup } from "@skeletonlabs/skeleton";
	import { DataHandler } from '@vincjo/datatables';
	import { fly } from "svelte/transition";
	import ConfirmMessage from "./confirmMessage.svelte";
	import { current_account } from '../../../../store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	})

	export let data: any[];
    //Init data handler - SERVER
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	let rows = handler.getRows();

	let curProductID = 0;
	function setCurProductID(product_ID : number) {
		curProductID = product_ID;
	}
	let insertedProductList = new Object();
	let updatedProductList = new Object();

	//! Message Showing
    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
		formUpdateVisable = false;
		formInsertVisable = false;
    }

	let messageVisible = false;
	let message = "";
	let MovementType = "";
	//! Call delete function
	function setIDAndCallDelete(product_ID : number) {
		messageVisible = true;
		message = "Are you sure you want to delete this product?";
		curProductID = product_ID;
		MovementType = "delete";
	}
	//! Call update function
	function setIDAndCallUpdate(product_ID : number) {
		messageVisible = true;
		message = "Are you sure you want to update this product?";
		MovementType = "update";
		updatedProductList = {
			"product_ID": product_ID,
			"product_name": productName,
			"tags": productTag,
			"original_price": productPrice,
			"discount": productDiscount,
			"selling_price": productSellingPrice,
			"sales": productSales,
			"stock": productStocks,
			"likes": productLikes,
			"avg_score": productAvgScore,
			"num_of_comment": productNumOfComment
		};
	}
	//! Call insert function
	function setIDAndCallInsert() {
		messageVisible = true;
		message = "Are you sure you want to insert this product?";
		MovementType = "insert";
		insertedProductList = {
			"product_ID": -5,
			"product_name": productName,
			"tags": productTag,
			"original_price": productPrice,
			"discount": productDiscount,
			"selling_price": (productPrice * productDiscount),
			"sales": productSales,
			"stock": productStocks,
			"likes": 0,
			"avg_score": 0,
			"num_of_comment": 0
		};
	}

	//! Form modal visibility
	let formInsertVisable = false;
	let formUpdateVisable = false;
	let formType = -1;

	//! For insert
	let productName = "";
	let productTag = "";
	let productPrice : number;
	let productDiscount : number;
	let productSales : number;
	let productStocks : number;
	//! For update
	let productIDForUpdate : number;
	let productSellingPrice : number;
	let productLikes : number;
	let productAvgScore : number;
	let productNumOfComment : number;

	async function getSpecificProduct(){
		const response = await fetch("product");
        let productObject = await response.json();
        return productObject;
	}

	function closeInsertFormProduct() {
		formType = -1;
		formInsertVisable = false;
		productName = "";
		productTag = "";
		productPrice = Number.NaN;
		productDiscount = Number.NaN;
		productSales = Number.NaN;
		productStocks = Number.NaN;
	}
	function closeUpdateFormProduct() {
		formType = -1;
		formUpdateVisable = false;
		productIDForUpdate = Number.NaN;
		productName = "";
		productTag = "";
		productPrice = Number.NaN;
		productDiscount = Number.NaN;
		productSales = Number.NaN;
		productStocks = Number.NaN;
		productSellingPrice = Number.NaN;
		productLikes = Number.NaN;
		productAvgScore = Number.NaN;
		productNumOfComment = Number.NaN;
	}

	function formInsertProductCheck() {
		formInsertVisable = true;
	}
	async function formUpdateProductCheck(product_ID : number) {
		formUpdateVisable = true;
		productIDForUpdate = product_ID;
		const products = await getSpecificProduct();
		for(const product of products){
			if(productIDForUpdate == product.product_ID){
				productName = product.product_name;
				productTag = product.tags;
				productPrice = product.original_price;
				productDiscount = product.discount;
				productSales = product.sales;
				productStocks = product.stock;
				productSellingPrice = product.selling_price;
				productLikes = product.likes;
				productAvgScore = product.avg_score;
				productNumOfComment = product.num_of_comment;
			}
		}
	}
	function containDot(type : number){
		if(productSales.toString().includes(".")){
			showModal("Sales can't be a decimal number !!");
			return false;
		}else if(productStocks.toString().includes(".")){
			showModal("Stocks can't be a decimal number !!");
			return false;
		}else if(productName.includes(".")){
			showModal("Product name can't contain '.' !!");
			return false;
		}else if(productTag.includes(".")){
			showModal("Product tag can't contain '.' !!");
			return false;
		}
		if(type == 1){
			if(productLikes.toString().includes(".")){
				showModal("Likes can't be a decimal number !!");
				return false;
			}
		}
		return true;
	}
	function checkFormat(){
		if(productPrice < 1 || productPrice > 99999999.99){
			showModal("Price isn't in the correct range !!");
			return false;
		}else if(productSales < 0 || productSales > 10000000){
			showModal("Sales isn't in the correct range !!");
			return false;
		}else if(productStocks < 0 || productStocks > 10000000){
			showModal("Stocks isn't in the correct range !!");
			return false;
		}else if(productDiscount < 0.0 || productDiscount > 1.0){
			showModal("Discount isn't in the correct range !!");
			return false;
		}
		if(productName.length < 1 || productName.length > 40){
			showModal("Length of product name isn't in the correct range !!");
			return false;
		}else if(productTag.length < 1 || productTag.length > 40){
			showModal("Length of product tag isn't in the correct range !!");
			return false;
		}
		return true;
	}
	function checkInsertProductFormat(){
		formType = 0;
		if(!checkFormat()){return;}
		if(!containDot(0)){return;}
		formInsertVisable = false;
		//! Call insert function
		setIDAndCallInsert();
		closeInsertFormProduct();
	}
	function checkUpdateProductFormat(){
		formType = 1;
		if(!checkFormat()){return;}
		if(!containDot(1)){return;}
		formUpdateVisable = false;
		if(productSellingPrice < 1 || productSellingPrice > 99999999.99){
			showModal("Price isn't in the correct range !!");
			return;
		}
		if(productLikes < 0 || productLikes > 10000000){
			showModal("Likes isn't in the correct range !!");
			return;
		}
		//! Call update function
		setIDAndCallUpdate(productIDForUpdate);
		closeUpdateFormProduct();
	}

	if(!local_current_account && browser){
		onMount(() => {
			goto('/login');
		});
	};

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
		font-size: 1.0rem;
		text-align: center;
		justify-content: center;
		align-items: center;
		font-weight: bold;
	}

	.table thead tr {
		background-color: #ffffff1c;
	}

	#data-content tr:nth-child(even) {
		background-color: #6a94b628;
	}

	#table-header-info, #table-header-update, #table-header-delete {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
	}

	#info-button {
		/* padding: 10px 20px; */
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		/* margin: 4px 2px; */
		cursor: pointer;
		border-radius: 14px;
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
	}

	#update-btn, #delete-btn {
		font-size: 21px;
		padding: 0.6rem;
		cursor: pointer;
		text-align: center;
		justify-content: center;
	}

	#popup-message {
		padding: 0.35rem;
		font-weight: bold;
		text-align: left;
		font-size: 17px;
	}

	#insert-btn-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#insert-btn {
		font-size: 17px;
		padding-right: 0.9rem;
		padding-left: 0.9rem;
		margin-right: 5px;
		cursor: pointer;
		text-align: center;
		justify-content: center;
	}

	.expandable-btn {
		width: 25%;
		border: none;
		border-radius: 50%;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		transition: width .4s ease, border-radius .4s ease;
		overflow: hidden;
	}
	.expandable-btn .icon {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		transition: left 0.3s ease, translateX 0.3s ease;
	}
	.expandable-btn .btn-text {
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.expandable-btn:hover {
		width: 100%;
		border-radius: 25px;
	}
	.expandable-btn:hover .icon {
		left: 10px;
		transform: translateX(0);
	}
	.expandable-btn:hover .btn-text {
		opacity: 1;
	}

	.hoverPop {
		display: flex;
		position: fixed; /* blur position */
		padding-top: 15px;
		backdrop-filter: blur(5px);
	}

</style>

<ConfirmMessage bind:visible={messageVisible} bind:message={message} bind:product_ID={curProductID} bind:type={MovementType} bind:insertedProductList={insertedProductList} bind:updatedProductList={updatedProductList}/>
<MessageModal bind:visible={modalVisible} bind:message={modalMessage} bind:formInsertVisable={formInsertVisable} bind:formUpdateVisable={formUpdateVisable} bind:formType={formType} />

<!-- For insert Form modal -->
{#if formInsertVisable}
	<div id="defaultModal" tabindex="-1" aria-hidden="true" class="hoverPop overflow-y-hidden overflow-x-fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full mx-auto" in:fly={{ y: 20 }}>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative p-4 bg-slate-400 rounded-lg shadow-xl border-slate-400 dark:bg-gray-800 sm:p-5">
				<!-- Modal header -->
				<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
					<h2 class="text-lg font-bold text-gray-900 dark:text-white">
						<span>&#10065;</span> Add Product
					</h2>
					<button on:click={closeInsertFormProduct} type="button" class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
						<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<form action="#" class="p-1" on:submit|preventDefault={checkInsertProductFormat}>
					<div class="grid gap-4 sm:grid-cols-2 relative z-0 w-full mb-5 group font-semibold">
						<div class="sm:col-span-2">
							<label for="product-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
							<input bind:value={productName} type="text" name="product-name" id="product-name" maxlength="40" minlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required>
						</div>
						<div class="sm:col-span-2">
							<label for="product-tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Tag</label>
							<input bind:value={productTag} type="text" name="product-tag" id="product-tag" maxlength="40" minlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product tag" required>
						</div>
						<div>
							<label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
							<input bind:value={productPrice} type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$1999" required>
						</div>
						<div>
							<label for="discount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount (0-1)</label>
							<input bind:value={productDiscount} type="number" name="discount" id="discount" min="0.0" max="1.0" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.5" required>
						</div>
						<div>
							<label for="sales" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sales</label>
							<input bind:value={productSales} type="number" name="sales" id="sales" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="50" required>
						</div>
						<div>
							<label for="stocks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stocks</label>
							<input bind:value={productStocks} type="number" name="stocks" id="stocks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required>
						</div>
					</div>
					<button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 justify-center">
						<svg class="mr-1.5 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
						Add new product
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- For update form modal -->
{#if formUpdateVisable}
	<div id="defaultModal" tabindex="-1" aria-hidden="true" class="hoverPop overflow-y-hidden overflow-x-fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full mx-auto" in:fly={{ y: 20 }}>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative p-4 bg-slate-400 rounded-lg shadow-xl border-slate-400 dark:bg-gray-800 sm:p-5">
				<!-- Modal header -->
				<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
					<h2 class="text-lg font-bold text-gray-900 dark:text-white">
						<span style="font-size:x-large">&#8593;</span> Update Product
					</h2>
					<button on:click={closeUpdateFormProduct} type="button" class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
						<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<form action="#" class="p-1" on:submit|preventDefault={checkUpdateProductFormat}>
					<div class="grid gap-4 sm:grid-cols-2 relative z-0 w-full mb-5 group font-semibold">
						<div class="sm:col-span-2">
							<label for="product-name" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Product name</label>
							<input bind:value={productName} type="text" name="product-name" id="product-name" maxlength="40" minlength="1" 
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required>
						</div>
						<div class="sm:col-span-2">
							<label for="product-tag" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Product tag</label>
							<input bind:value={productTag} type="text" name="product-tag" id="product-tag" maxlength="40" minlength="1" 
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product tag" required>
						</div>
						<div>
							<label for="price" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Original product price</label>
							<input bind:value={productPrice} type="number" name="price" id="price"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$1999" required>
						</div>
						<div>
							<label for="price-selling" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Selling product price</label>
							<input bind:value={productSellingPrice} type="number" name="price-selling" id="price-selling"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-not-allowed" placeholder="$1888" disabled readonly required>
						</div>
						<div>
							<label for="sales" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Sales</label>
							<input bind:value={productSales} type="number" name="sales" id="sales"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="50" required>
						</div>
						<div>
							<label for="discount" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Discount (0.0 - 1.0)</label>
							<input bind:value={productDiscount} type="number" name="discount" id="discount" min="0.0" max="1.0" step="any"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.5" required>
						</div>
						<div>
							<label for="stocks" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Stocks</label>
							<input bind:value={productStocks} type="number" name="stocks" id="stocks"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required>
						</div>
						<div>
							<label for="likes" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Likes</label>
							<input bind:value={productLikes} type="number" name="likes" id="likes"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required>
						</div>
					</div>
					<button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 justify-center">
						<!-- <svg class="mr-1.5 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> -->
						Update product !!
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- bg-gradient-to-br variant-gradient-primary-tertiary -->
<div class="card p-4 bg-gradient-to-br variant-gradient-tertiary-primary" data-popup="popupClick">
	<div id="popup-message">
		{#each $rows as row}
			{#if row.product_ID == curProductID}
				Product ID: {row.product_ID} <br>
				Product Name: {row.product_name} <br>
				Price: {row.selling_price} <br>
				Discount: {row.discount} <br>
				Tag: {row.tags} <br>
				Stocks: {row.stock} <br>
				Sales: {row.sales} <br>
				Likes: {row.likes} <br>
				Score: {row.avg_score} <br>
			{/if}
		{/each}
	</div>
	<div class="arrow bg-gradient-to-br variant-gradient-tertiary-primary" />
</div>

<div id="product-container" class="overflow-y-auto space-y-4 table-container">
	<header class="flex justify-between">
		<Search {handler} />
		<div id="insert-btn-container">
			<div id="insert-btn">
				<td colspan="1">
					<!-- add new product -->
					<button on:click={formInsertProductCheck} type="button" class="btn variant-filled-surface expandable-btn">
						<span class="icon">&#10010;</span><span class="btn-text">Add New Product</span>
					</button>
				</td>
			</div>
			<div>
				<RowsPerPage {handler} />
			</div>
		</div>
	</header>
	<table id="product-table" class="table table-hover table-compact w-full table-auto bg-slate-200 dark:bg-slate-700">
		<thead>
			<tr>
				<ThSort {handler} orderBy="product_ID">product ID</ThSort>
				<ThSort {handler} orderBy="product_name">Product Name</ThSort>
				<ThSort {handler} orderBy="selling_price">Price</ThSort>
				<th colspan="3">
					<div id="table-header-info">More details</div>
				</th>
				<th colspan="3">
					<div id="table-header-update">update</div>
				</th>
				<th colspan="3">
					<div id="table-header-delete">Delete</div>
				</th>
			</tr>
		</thead>
		<tbody id="data-content" style="text-align: center;">
			{#each $rows as row}
				<tr>
					<td>{row.product_ID}</td>
					<td>{row.product_name}</td>
					<td>
						{#if row.discount !== 1}
							<s>{row.original_price}</s>
							<b>only {row.selling_price}</b>
						{:else}
							{row.selling_price}
						{/if}
					</td>
					<!-- More details -->
					<td colspan="3">
						<button type="button" id="info-button" class="btn btn-sm variant-ghost-surface" on:click={() => {setCurProductID(row.product_ID)}}
							use:popup={{event: "click", target: "popupClick", placement: "top"}}>
							<span>&#9432;</span><span>More Info</span>
						</button>
					</td>
					<!-- update -->
					<td colspan="3">
						<button on:click={() => {formUpdateProductCheck(row.product_ID)}} type="button" id="update-btn" class="btn btn-icon variant-filled-surface">
							&#9998;
						</button>
					</td>
					<!-- delete -->
					<td colspan="3">
						<button on:click={() => {setIDAndCallDelete(row.product_ID)}} type="button" id="delete-btn" class="btn btn-icon variant-filled-surface">
							&#10006;
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<p class="font-bold">
						There are no products to display.
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
