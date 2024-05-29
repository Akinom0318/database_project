<script lang="ts">
    import MessageModal from '$lib/MessageModal.svelte';
    import { current_account } from "../../../../store";

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
    }

</script>

<p>This is a userlist</p>