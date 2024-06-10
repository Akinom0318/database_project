<script>
    import { fly } from "svelte/transition";
    import { current_account } from "../store.js";

    let local_current_account = "";
	current_account.subscribe((value) => {
		local_current_account = value;
	});
</script>

<style>

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
    <section class="card w-full">
        <div class="p-4 space-y-4">
            <div class="placeholder" />
            <div class="grid grid-cols-3 gap-8">
                <div class="placeholder" />
                <div class="placeholder" />
                <div class="placeholder" />
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div class="placeholder" />
                <div class="placeholder" />
                <div class="placeholder" />
                <div class="placeholder" />
            </div>
        </div>
    </section>
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
