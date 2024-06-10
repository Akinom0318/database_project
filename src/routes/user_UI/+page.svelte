<script>
    import { current_account } from "../../store";
    import Admin from "./admin/admin.svelte";
    import UserUi from "./users/UserUi.svelte";
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    let local_current_account = "";

    current_account.subscribe((value) => {
        local_current_account = value;
    })

    if(!local_current_account && browser){
        goto('/')
    }
</script>


{#if local_current_account}
    {#if local_current_account == "admin"}
        <Admin />
    {:else}
        <UserUi />
    {/if}
{/if}