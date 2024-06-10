<!-- MessageModal.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import { fly } from "svelte/transition";
    export let message = "";
    export let visible = false;
    export let product_ID = 0;
    export let insertedProductList = new Object();
    export let updatedProductList = new Object();
    export let type = "";
    let confirmOK = 0;

    function close() {
        visible = false;
    }

    function setConfirm(value : number) {
        confirmOK = value;
        if(confirmOK){
            if(type == "delete"){
                deleteProduct(product_ID);
            }else if(type == "insert"){
                insertProduct(insertedProductList);
            }else if(type == "update"){
                updateProduct(updatedProductList);
            }
        }
        close();
    }

    function reloadPage() {
		let thisPage = window.location.pathname;
        goto('/').then(
            () => goto(thisPage)
        );
    }

    //! delete product function
	async function deleteProduct(product_ID : number) {
		const response = await fetch("product", {
			method: 'POST',
			body: JSON.stringify({product_ID}),
			headers: {
				'content-type': 'application/json'
			}
		})
		if(response.ok){ reloadPage(); }
	}

    async function insertProduct(insertedProductList : Object){
        const response = await fetch("product/[modifyProduct]", {
            method: 'POST',
            body: JSON.stringify(insertedProductList),
            headers: {
                'content-type': 'application/json'
            }
        })
        if(response.ok){ reloadPage(); }
    }

    async function updateProduct(updatedProductList : Object){
        const response = await fetch("product/[modifyProduct]", {
            method: 'POST',
            body: JSON.stringify(updatedProductList),
            headers: {
                'content-type': 'application/json'
            }
        })
        if(response.ok){ reloadPage(); }
    }
    
</script>

<style>
    .popupHover {
        backdrop-filter: blur(5px);
    }

    button {
        cursor: pointer;
        font-size: 1.05rem;
        line-height: 1.3rem;
    }
</style>


{#if visible}
    <div id="confirm-modal" tabindex="-1" class="popupHover overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex" in:fly={{ y: 20 }}>
        <div class="relative p-4 w-full max-w-xl max-h-full">
            <div class="relative bg-white rounded-3xl shadow dark:bg-gray-700">
                <div class="p-4 md:p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h2 class="mb-4 text-xl font-bold text-gray-500 dark:text-gray-400">{message}</h2>
                    <button on:click={() => {setConfirm(1)}} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-xl inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                    </button>
                    <button on:click={() => {setConfirm(0)}} type="button" class="py-2.5 px-5 ms-3 font-bold text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        No, cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- <div class="modal" in:fly={{ y: 20 }}>
    <div class="modal-content">
        <p>{message}</p>
        <div class="btn-container">
            <button on:click={() => {setConfirm(1)}} class="confirm-2 btn btn-icon variant-filled-surface close">&#10004;</button>
            <button on:click={() => {setConfirm(0)}} class="confirm-1 btn btn-icon variant-filled-surface close">&times;</button>
        </div>
    </div>
</div> -->