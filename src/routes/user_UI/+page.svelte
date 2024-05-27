<script>
    import { current_account } from "../../store";
	  import UserUi from "./users/UserUi.svelte";

    let local_current_account = "";

    current_account.subscribe((value) => {
        local_current_account = value;
    })
</script>

<style>
    
</style>

<h1>
    {#if local_current_account === "admin"}
        <p>
            do your admin UI here
        </p>
    {:else if local_current_account}
        <UserUi />
    {:else}
        <h1>
            Login first!
        </h1>
    {/if}
</h1>