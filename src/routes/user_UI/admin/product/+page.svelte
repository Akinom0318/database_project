<script lang="ts">
    import MessageModal from '$lib/MessageModal.svelte';
    import { current_account } from "../../../../store";
    import ProductTable from "./adminProductTable.svelte";

    export let data;

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    });
    //! Message Showing
    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    };

</script>

<style></style>

<div id="ProductTable-container">
    <ProductTable data={data.products} />
</div>

<!-- <p>Hello, product</p> -->