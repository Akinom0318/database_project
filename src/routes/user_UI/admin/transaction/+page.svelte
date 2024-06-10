<script lang="ts">
    // import MessageModal from '$lib/MessageModal.svelte';
    import { Avatar, ProgressRadial } from '@skeletonlabs/skeleton';
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    // import { current_account } from "../../../../store";

    let curOrderIDToShow = -1;
    let detailedVisible = false;
    function showDetailedInfo(order_ID : number){
        curOrderIDToShow = order_ID;
        detailedVisible = true;
    }

    function hideDetailedInfo(){
        curOrderIDToShow = -1;
        detailedVisible = false;
    }

    function changeTimeSlotFormat(time_slot: any) {
        const date = new Date(Date.parse(time_slot));
        
        const month = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${month[monthIndex]} ${year}`;
        // return new Date(Date.parse(time_slot)).toISOString().split('T')[0];
    }

    let allData : any = [];
    let isLoaded = false;

    async function getAllTransactionData(){
        const response = await fetch("transaction");
        let allTransactionData = await response.json();

        isLoaded = true;
        allData = allTransactionData; // A big object with some attributes and arrays
    }

    onMount(() => {
        getAllTransactionData();
    });

</script>

<style>
    /* section {
        overflow: scroll;
        -ms-overflow-style: none;  
        scrollbar-width: none;  
    } */

    /* section::-webkit-scrollbar {
        display: none;
    } */

    .hoverPop {
		display: flex;
		position: fixed; /* blur position */
		padding-top: 15px;
		backdrop-filter: blur(1.5px);
	}

</style>

{#if detailedVisible}
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="hoverPop overflow-y-hidden overflow-x-fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full mx-auto" in:fly={{ y: 20 }}>
        <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
            <!-- Modal content -->
            {#each allData as detail}
                {#if detail.order_ID === curOrderIDToShow}
                    <div class="relative font-bold p-4 bg-slate-400 rounded-lg shadow-xl border-slate-400 dark:bg-gray-800 sm:p-5">
                        <!-- Modal header -->
                        <div class="flex justify-between items-center pb-2 mb-4 rounded-t border-b-2 sm:mb-5 text-2xl dark:border-gray-600">
                            Order # {detail.order_ID}
                        </div>
                        <button on:click={hideDetailedInfo} type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <!-- Modal body -->
                        <div class="pl-3 pr-3 text-xl text-gray-900 dark:text-gray-100">
                            <div class="border-b-2 border-gray-300 pb-2">
                                Total Prices： <span class="text-cyan-800 dark:text-cyan-300">{detail.total_price}</span>
                            </div>
                            <div class="border-b-2 border-gray-300 pt-1 pb-2">
                                Bank Account： <span class="text-yellow-800 dark:text-yellow-200">{detail.bank_num}</span>
                            </div>
                            <div class="border-b-2 border-gray-300 pt-1 pb-2">
                                Delivering Address： <span class="text-green-800 dark:text-green-200">{detail.delivering_address}</span>
                            </div>
                            <div class="border-b-2 border-gray-300 pt-1">
                                <div class="pt-1">
                                    Product List：
                                </div>
                                <div class="text-base">
                                    {#each detail.order_items as detailItem}
                                        <div class="pl-8 pb-1 border-b-2 border-gray-300 pt-1">
                                            Product id： #<span class="text-purple-700 dark:text-purple-400">{detailItem.product_ID}</span> <br>
                                            Product name： <span class="underline text-red-800 dark:text-red-400">{detailItem.product_name}</span> <br>
                                            Single product total price： <span class="text-cyan-800 dark:text-cyan-300">{detailItem.prices * detailItem.quantity}</span> <br>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}


<section class=" bg-slate-300 py-8 antialiased dark:bg-gray-900 md:py-8">
    <div class="mx-auto max-w-screen-xl px-4 xl:px-0">
      <div class="mx-auto max-w-8xl">
        <div class="gap-4 lg:flex lg:items-center lg:justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl pb-4">🤝 Transaction List</h2>
        </div>
        <hr class="!border-t-4" />
        {#if isLoaded}
            {#each allData as transactionData}
                <div class="mt-6 flow-root sm:mt-8">
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                        <div class="relative grid grid-cols-2 gap-4 py-6 sm:grid-cols-4 lg:grid-cols-5">
                            <div class="col-span-1 content-center sm:col-span-2 lg:col-span-1">
                                <p class="text-xl font-semibold text-gray-900 hover:italic dark:text-white cursor-pointer">🛒 Order #{transactionData.order_ID} &#10078;</p>
                            </div>
            
                            <div class="content-center">
                                <div class="flex items-center gap-2">
                                    <svg class="h-4 w-4 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                    </svg>
                                    <p class=" text-base font-bold text-gray-800 dark:text-gray-400">{changeTimeSlotFormat(transactionData.time_slot)}</p>
                                </div>
                            </div>
            
                            <div class="content-center">
                                <div class="flex items-center justify-end gap-2 sm:justify-start">
                                    <Avatar initials="{transactionData.user_account.charAt(0).concat(transactionData.user_account.charAt(transactionData.user_account.length - 1))}" background="bg-primary-500" width="w-8" class="p-0 font-bold"/>
                                    <p class="text-lg font-bold text-balck dark:text-white">{transactionData.user_account}</p>
                                </div>
                            </div>

                            <div class="absolute right-0 top-7 content-center sm:relative sm:right-auto sm:top-auto">
                                {#if transactionData.status === 1}
                                    <span class="inline-flex items-center rounded bg-green-300 px-2.5 py-0.5 text-sm font-medium text-black dark:bg-green-800 dark:text-primary-100">
                                        &#10004; Completed!!
                                    </span>
                                {:else}
                                    <span class="inline-flex items-center rounded bg-red-300 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-red-800 dark:text-primary-300">
                                        <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                        </svg>
                                            Delivering
                                    </span>
                                {/if}
                            </div>
            
                            <div class="col-span-2 content-center sm:col-span-1 sm:justify-self-end">
                                <button on:click={() => showDetailedInfo(transactionData.order_ID)} type="button" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">View details</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            {/each}
        {:else}
            <center>
                <ProgressRadial width="w-10"/>
            </center>
        {/if}
      </div>
    </div>
</section>
