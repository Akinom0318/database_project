<!-- MessageModal.svelte -->
<script>
    import { fly } from "svelte/transition";
    export let message = '';
    export let visible = false;

    function close() {
        visible = false;
    }
</script>

{#if visible}
    <div class="modal" in:fly={{ y: 20 }}>
        <div class="modal-content">
            <button class="close" on:click={close}>&times;</button>
            <p>{message}</p>
        </div>
    </div>
{/if}

<style>
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #8d8b8b;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        text-align: center;
        color: rgb(255, 254, 254)
    }

    .close {
        color: #000000;
        float: right;
        /* position: absolute; */
        top: 10px;
        right: 10px;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: rgb(218, 182, 182);
        text-decoration: none;
        cursor: pointer;
    }
</style>
