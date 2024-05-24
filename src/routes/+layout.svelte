<script>
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import '../app.postcss';

  	import {current_account} from "../store.js";
	import { LightSwitch } from '@skeletonlabs/skeleton';
						

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

    /* :global(div) {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
    } */

</style>

<TabGroup 
	justify="justify-left"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=10px
	border=10px
	class="bg-surface-100-800-token w-full">
	<TabAnchor href="/">
		<svelte:fragment slot="lead">Home</svelte:fragment>
	</TabAnchor>
	{#if !local_current_account}
		<TabAnchor href="/login">
			<svelte:fragment slot="lead">Login</svelte:fragment>
		</TabAnchor>
	{/if}
	<TabAnchor href="/register">
		<svelte:fragment slot="lead">Register</svelte:fragment>
	</TabAnchor>
	<TabAnchor>
		<LightSwitch />
	</TabAnchor>
	<!-- TODO: help me justify the log out ,Light Switch and "Welcome, user" -->
	<!-- And maybe make the welcome message without TabAnchor-->
	{#if local_current_account}
	<TabAnchor justify="justify-right">
		<button on:click={log_out}
			id = "Log_out_button"
			type="button">Log out
		</button>
	</TabAnchor>
	<TabAnchor justify="justify-right">
		<p>
			Welcome, {local_current_account}!
		</p>
	</TabAnchor>
	{/if}
</TabGroup>

{#if local_current_account}
	<p id="User-account">
		User: {local_current_account}
	</p>
{/if}


<slot />