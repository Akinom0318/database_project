<script>
	import '../app.postcss';
    import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
    import {current_account} from "../store.js";

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
	{#if local_current_account}
		<TabAnchor>
			<button on:click={log_out}
				id = "Log_out_button"
				type="button">Log out
			</button>
		</TabAnchor>
	{/if}
	<TabAnchor href="/register">
		<svelte:fragment slot="lead">Register</svelte:fragment>
	</TabAnchor>
</TabGroup>

{#if local_current_account}
	<p>
		{local_current_account}
	</p>
{/if}

<slot />