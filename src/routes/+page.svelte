<script>
    import { fly } from "svelte/transition";
    import { current_account } from "../store.js";
    import ProductTable from "./ProductTable.svelte";

    export let data;

    let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});
</script>

<style>
    #ProductTable-container {
        padding-top: 15px;
    }

    .login-detection{
        text-align: center;
        margin: 50px;
    }
    
    #rickroll{
        display: block;
        margin-left: auto;
        margin-right: auto;

    }

</style>

<!-- <p in:fly={{ y: 20 }} >Home page!</p> -->
{#if local_current_account}
    {#if local_current_account != "admin"}
        <div id="ProductTable-container">
            <ProductTable data={data.products} />
        </div>
    {/if}
{:else}
    <div class="login-detection">
        <aside class="alert variant-ghost-tertiary" in:fly={{ y: 20 }}>
            <div class="alert-message">
                <h2 class="h2">
                    Oh no! It seems you haven't log in!
                </h2>
                <img src="src\lib\images\rickroll.png" id="rickroll" alt="Get RickRoll!" width="30%" height="30%">
            </div>
        </aside>
    </div>
{/if}
