<script lang="ts">
    //TODO test mount reload
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import ProductTable from "./adminProductTable.svelte";

    export let data;


</script>

<style>
</style>

<div id="ProductTable-container" class="relative">
    <ProductTable data={data.products} />
</div>
