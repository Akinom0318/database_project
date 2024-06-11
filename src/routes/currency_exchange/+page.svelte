<script>
    import CurrencyExchange from "./CurrencyExchange.svelte";
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { current_account_ID } from "../../store";

    let local_current_account_ID = 0;
    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    })

    if(!local_current_account_ID && browser){
        goto('/');
    }
</script>

<CurrencyExchange/>