<script lang="ts">
    import { current_account } from "../../../store";

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    });

</script>

<style>

</style>

<p>This is the admin page</p>

<!-- Try to add some pictures -->

<div></div>

