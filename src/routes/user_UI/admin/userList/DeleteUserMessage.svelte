<script>
    import { fly } from "svelte/transition";
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import { current_account_ID } from "../../../../store";
    export let user = Object();
    export let visible = false;
    import { goto } from '$app/navigation';

    let local_current_account_ID = 0

    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    function close() {
        visible = false;
    }

    function reloadPage() {
        const thisPage = window.location.pathname;

        console.log('goto ' + thisPage);

        goto('/').then(
            () => goto(thisPage)
        );
    }

    async function delete_user_confirm(){
        visible = false;
        let user_ID = user.user_ID
        if(user_ID != -1) {
            const response = await fetch("userList", {
                    method: 'POST',
                    body: JSON.stringify({local_current_account_ID, user_ID}),
                    headers: {
                'content-type': 'application/json'
                }
            });
            if (response.ok) {
                reloadPage();
            } else {
                console.log('Delete Canceling');
            }
        } else {
            console.log('Cannot delete admin');
        }
    }

</script>

<style>
    div.button{
        text-align: center;
    }

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
        background-color: rgba(var(--color-primary-800) / 1);
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        max-width: 450px;
        width: 90%;
        text-align: auto;
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

{#if visible}
    <div class="modal" in:fly={{ y: 20 }}>
        <div class="modal-content">
            <button class="close" on:click={close}>
                &times;
            </button>
            <h4 class="h4">Are you sure you want to delete user {user.account} ?</h4>
            <div class="button">
                <button on:click={delete_user_confirm} type="button" class="btn btn-sm variant-filled-tertiary">
                    Confirm
                </button>
                <button on:click={close} type="button" class="btn btn-sm variant-filled-tertiary">
                    Cancel
                </button>                  
            </div>
        </div>
    </div>
{/if}