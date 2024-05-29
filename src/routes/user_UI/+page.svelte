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

{#if local_current_account}
    <UserUi />
{:else}
    <h1>
        Login first!
    </h1>
{/if}