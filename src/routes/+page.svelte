<script>
    import { fly} from "svelte/transition";
    import {current_account} from "../store.js";
    import Datatable from "./Datatable.svelte";

    export let data;

    let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});
</script>


<!-- <p in:fly={{ y: 20 }} >Home page!</p> -->
{#if local_current_account}
    <Datatable data={data.products} />
{/if}
