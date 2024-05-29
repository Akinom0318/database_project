<script>
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { current_account } from "../store.js";
						

	let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});

	function log_out(){
		$current_account = "";
	};

</script>

<style>
    :global(body){
        margin: 0;
        padding: 0;
    }

	:global(label){
		font-weight: bold;
		font-size: 16px;
	}

	#welcome-message {
		padding-left: 5px;
		padding-right: 13vw;
		font-weight: bold;
		font-size: 17px;
		justify-content: center;
	}

	#home-icon {
		font-size: 18px;
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
			{/if}
				<TabAnchor href="/register" class="text-center">
					<svelte:fragment slot="lead"><span>&#9997;</span> Register</svelte:fragment>
				</TabAnchor>
		</div>
		
		{#if local_current_account}
			<div id="welcome-container" class="flex items-center">
				<a href="/user_UI">
					<p id="welcome-message" class="text-center">
						<span style="color: red;">&#9733;</span> Welcome, {local_current_account}!
					</p>
				</a>
			</div>
			<div id="right-container" class="flex space-x-3 items-center justify-end">
				<div id="light-switch">
					<LightSwitch />
				</div>
				<a href="../login">
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
				<svelte:fragment slot="lead"><span id="home-icon" style="color: cadetblue">&#9752;</span> product list</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/user_UI/admin/userList" class="text-center">
				<svelte:fragment slot="lead"><span style="color:darkslateblue;">&#9738;</span> user list</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/user_UI/admin/transaction" class="text-center">
				<svelte:fragment slot="lead"><span>&#8471;</span> transaction list</svelte:fragment>
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
			<a href="../../login">
				<button on:click={log_out}
					id = "Log_out_button"
					class="btn variant-filled"
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