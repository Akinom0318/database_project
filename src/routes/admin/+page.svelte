<script lang="ts">
    import MessageModal from '../MessageModal.svelte';
    //! Message Showing
    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    }
</script>

<style>

</style>

<!-- Message Box -->
<MessageModal bind:visible={modalVisible} bind:message={modalMessage} />

<div></div>

