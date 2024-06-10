<script lang="ts">
    //@ts-nocheck
    import ProductTable from './ProductTable.svelte';
    import { current_account } from '../../store';
	import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
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