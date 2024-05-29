<script>
    import { current_account } from "../../store";
    import Admin from "./admin/admin.svelte";
    import UserUi from "./users/UserUi.svelte";

    let local_current_account = "";

    current_account.subscribe((value) => {
        local_current_account = value;
    })
</script>

<style>
    
</style>

{#if local_current_account}
    {#if local_current_account == "admin"}
        <Admin />
    {:else}
        <UserUi />
    {/if}
{:else}
    <h1>
        Login first!
    </h1>
{/if}