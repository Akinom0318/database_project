<script lang="ts">
    //@ts-nocheck
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { current_account } from '../../store';
    import ProductTable from './ProductTable.svelte';
    export let data;

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    })

    if(!local_current_account && browser){
        goto('/')
    }

</script>

{#if local_current_account}
    <ProductTable bind:data={data.products} />
{/if}