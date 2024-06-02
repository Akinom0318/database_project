<script lang="ts">
    import MessageModal from '$lib/MessageModal.svelte';
    import { current_account } from "../../../../store";
    import UsersTable from "./adminUsersTable.svelte";

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
    }

</script>

<style></style>

<div id="UsersTable-container">
    <UsersTable data={data.users} />
</div>

<!-- <p>This is a userlist</p> -->