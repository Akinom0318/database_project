<script>
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import '../app.postcss';
//! To redirect to login page
	import { goto } from '$app/navigation';
	//! For popup hover button
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Avatar, LightSwitch, storePopup } from '@skeletonlabs/skeleton';
	import { current_account, current_account_ID, current_product_page } from "../store.js";
						
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});

	function log_out(){
		$current_account = "";
		$current_account_ID = 0;
		$current_product_page = 1;
		goto ('/login');
	};

</script>

<style>
    :global(body){
        margin: 0;
        padding: 0;
		/* overflow: auto; */
    }

	/* :global(body::-webkit-scrollbar) {
    	display: none;
	} */

	:global(label){
		font-weight: bold;
		font-size: 16px;
	}

	.user-container {
		gap: 15px;
		align-items:center;
		margin-right: 5px;
		padding-right: 5px;
		padding-left: 5px;
		font-weight: bold;
		font-size: 17px;
		display: flex;
	}

	#home-icon {
		font-size: 20px;
	}

	#left-container {
		padding-left: 10px;
	}

	#light-switch {
		padding-right: 8px;
	}

	#Log_out_button {
		padding: 10px 13px;
		border-radius: 18px;
		margin-right: 5px;
		font-weight: bold;
		cursor: pointer;
	}

	#welcome-container {
		padding-right: 18%;
	}

	#welcome-container-user {
		padding-right: 10px;
	}

    /* :global(div) {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
    } */

</style>

<!-- hover="hover:variant-soft-primary" -->
{#if local_current_account != "admin"}
	<TabGroup 
		active="variant-filled-primary"
		rounded=10px
		border=10px
		flex="flex-1 lg:flex-none"
		class="bg-surface-100-800-token w-full items-center justify-between font-bold">
		<div id="left-container" class="flex flex-1 space-x-3 items-center justify-start">
			<TabAnchor href="/" class="text-center">
				<svelte:fragment slot="lead"><span id="home-icon" style="color: cadetblue">&#9750;</span> Home</svelte:fragment>
			</TabAnchor>
			{#if !local_current_account}
				<TabAnchor href="/login" class="text-center">
					<svelte:fragment slot="lead"><span>&#10070;</span> Login</svelte:fragment>
				</TabAnchor>
				<TabAnchor href="/register" class="text-center">
					<svelte:fragment slot="lead"><span>&#9997;</span> Register</svelte:fragment>
				</TabAnchor>
			{:else}
				<TabAnchor href="/product_table" class="text-center">
					<svelte:fragment slot="lead"><span>🛍️</span> Shopping</svelte:fragment>
				</TabAnchor>
				<TabAnchor href="/cart" class="text-center">
					<svelte:fragment slot="lead"><span>🛒</span> Cart</svelte:fragment>
				</TabAnchor>
				<TabAnchor href="/liking_list" class="text-center">
					<svelte:fragment slot="lead"><span>❤️
					</span> Likes</svelte:fragment>
				</TabAnchor>
				<TabAnchor href="/transaction" class="text-center">
					<svelte:fragment slot="lead"><span>🤝</span> Transaction</svelte:fragment>
				</TabAnchor>
			{/if}
		</div>
		
		{#if local_current_account}
			<div id="welcome-container-user" class="flex items-center">
				<TabAnchor href="/user_UI">
					<div class="user-container">
							<Avatar background="bg-cyan" width="w-6">
								<svg class="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
							  	</svg>
							</Avatar>
							{local_current_account}
					</div>
				</TabAnchor>
			</div>
			<div id="right-container" class="flex space-x-3 items-center justify-end">
				<div id="light-switch">
					<LightSwitch />
				</div>
				<a href="/">
					<button on:click={log_out}
						id = "Log_out_button"
						class="btn variant-filled"
						type="button">Log out
					</button>
				</a>
			</div>
		{/if}
	</TabGroup>
{:else}
	<TabGroup 
		active="variant-filled-primary"
		rounded=10px
		border=10px
		flex="flex-1 lg:flex-none"
		class="bg-surface-100-800-token w-full items-center justify-between font-bold">
		<div id="left-container" class="flex flex-1 space-x-3 items-center justify-start">
			<TabAnchor href="/user_UI/admin/product" class="text-center">
				<svelte:fragment slot="lead"><span id="home-icon" style="color: cadetblue" class="pt-1">&#9752;</span> product list</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/user_UI/admin/userList" class="text-center">
				<svelte:fragment slot="lead"><span style="color:burlywood;" class="text-xl pt-1">&#9823;</span> user list</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/user_UI/admin/transaction" class="text-center">
				<svelte:fragment slot="lead"><span class="text-xl pt-1">&#8471;</span> transaction list</svelte:fragment>
			</TabAnchor>
		</div>

		<div id="welcome-container" class="flex items-center">
			<p id="welcome-message" class="text-center">
				Hello <span style="color: red;">&#10084;</span> , {local_current_account}!
			</p>
		</div>
		<div id="right-container" class="flex space-x-3 items-center justify-end">
			<div id="light-switch">
				<LightSwitch />
			</div>
			<a href="/">
				<button on:click={log_out}
					id = "Log_out_button"
					class="btn btn-sm variant-filled"
					type="button">Log out
				</button>
			</a>
		</div>
	</TabGroup>
{/if}

<!--TODO I don't know what to do, so i comment it. -->
<!-- {#if local_current_account}
	<p id="User-account">
		User: {local_current_account}
	</p>
{/if} -->

<slot />