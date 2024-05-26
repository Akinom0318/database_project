<script>
    import { fly } from "svelte/transition";
    import { current_account } from "../store.js";
    import Datatable from "./Datatable.svelte";

    export let data;

    let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});
</script>

<style>
    #datatable-container {
        padding-top: 15px;
    }
</style>

<!-- <p in:fly={{ y: 20 }} >Home page!</p> -->
{#if local_current_account}
    <div id="datatable-container">
        <Datatable data={data.products} />
    </div>
{/if}
