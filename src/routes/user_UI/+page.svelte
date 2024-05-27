<script>
    import { current_account } from "../../store";
    let local_current_account = "";

    current_account.subscribe((value) => {
        local_current_account = value;
    })
</script>

<style>
    
</style>

<h1>
    Here is for user UI!
    {#if local_current_account === "admin"}
        <p>
            do your admin UI here
        </p>
    {:else if local_current_account}
        <p>
            I will do my user UI here
        </p>
    {:else}
        <h1>
            Login first!
        </h1>
    {/if}
</h1>