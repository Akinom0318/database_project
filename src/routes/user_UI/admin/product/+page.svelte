<script lang="ts">
    //TODO test mount reload
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { current_account } from "../../../../store";
    import ProductTable from "./adminProductTable.svelte";

    export let data;

    // onMount(() => {
    //     // 檢查是否是重新整理頁面
    //     const entries = performance.getEntriesByType('navigation');
    //     const isReload = entries.some(entry => (entry as PerformanceNavigationTiming).type === 'reload');

    //     // 如果是重新整理或首次進入應用，重定向到 /login
    //     if (isReload) {
    //         if (!sessionStorage.getItem('visited')) {
    //             goto('/login');
    //         }
    //         sessionStorage.setItem('visited', 'true');
    //         // goto('/').then(() => goto('/login'));
    //     }
    // });

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    });

</script>

<style>
</style>

<div id="ProductTable-container" class="relative">
    <ProductTable data={data.products} />
</div>
