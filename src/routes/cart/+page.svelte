<script>
    import CartTable from "./CartTable.svelte";
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { current_account } from "../../store";

    let local_current_account = "";

    current_account.subscribe((value) => {
        local_current_account = value;
    })

    if(!local_current_account && browser){
        goto('/')
    }
</script>


<CartTable/>