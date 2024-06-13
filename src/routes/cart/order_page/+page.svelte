<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    import { current_account_ID, current_account } from '../../../store';
    import { onMount } from "svelte"
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import MessageModal from '$lib/MessageModal.svelte';

    let bank_account_input = "";
    let address_input = "";
    let bank_number_input = "";
    let local_current_account = "";
    let local_current_account_ID = 0;

    let order_success = false;
    let mask_bank_account = false;


    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    }

    function containsWhiteSpace() {
        const whiteSpaceAccount = bank_account_input.includes(" ");
        if(whiteSpaceAccount) {
            showModal("Bank account cannot contain whitespace.");
            return false;
        }
        const whiteSpacePassword = bank_number_input.includes(" ");
        if(whiteSpacePassword) {
            showModal("Bank number cannot contain whitespace.");
            return false;
        }
        const whiteSpaceAddress = address_input.includes(" ");
        if(whiteSpaceAddress) {
            showModal("Address cannot contain whitespace.");
            return false;
        }
        return true;
    }

    //return all users
    async function get_all_users(){
        const response = await fetch("order_page/paying_info");
        let all_users_object = await response.json();
        return all_users_object;
    }

    //it will make the placeholder in the input to be the original user info
    async function check_user_info(){
        const all_users = await get_all_users();
        for(const user of all_users){
            if(user.account === local_current_account){
                address_input = user.address;
            }
        }
    }

    onMount(() => {
        check_user_info();
    })


    current_account_ID.subscribe((value) => {
        local_current_account_ID = value;
    });

    current_account.subscribe((value) => {
        local_current_account = value;
    });

    if(!local_current_account_ID && browser){
        goto('/');
    }

    async function order_placed(){
        console.log("Checking Validity...");
        //! Check if input contains whitespace
        if(!containsWhiteSpace()) { return;}
        if(!address_input){ return; }
        if(!bank_number_input){ return; }
        if(!bank_account_input){ return; }
        else if(bank_number_input.length != 3) { 
            showModal("Bank number should be 3 digits.");
            return;
        }
        else if(bank_account_input.length != 16){
            showModal("Bank account should be 16 digits");
            return;
        }

        const response = await fetch("order_page/paying_info", {
                method: 'POST',
                body: JSON.stringify({local_current_account_ID, bank_account_input, bank_number_input, address_input}),
                headers: {
            'content-type': 'application/json'
        }
        });

        if(response.ok){
            order_success = true;
        }
    }

    function order_success_confirm(){
        order_success = false;
    }


</script>

<style>
    .table-comfortable{
        text-align: center;
        font-family: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
        margin: auto;
        border-collapse: separate;
        border-spacing: 5px 20px;
    }

    div.button{
        display: flex;
        justify-content: center;
        gap: 5%;
    }

    h1{
        padding-top: 15px;
        text-align: center;
    }

    .table-comfortable tr td{
        padding-left: 15px;
    }
    
</style>

<MessageModal bind:visible={modalVisible} bind:message={modalMessage} />


{#if order_success}
    <aside class="alert variant-ghost-success" in:fly={{ y: 20 }}>
        <div class="alert-message">
            <h1 class="h1" style="text-align: center; padding-top: 0px;" >
                Order Success✅
            </h1>
        </div>
        <a href="/cart/order_page/feed_back">
            <div class="alert-actions">
                <button on:click={order_success_confirm} class="btn variant-filled">
                    OK
                </button>
            </div>
        </a>
    </aside>
{/if}

<h1 class="h1" in:fly={{ y: 20 }}>
	<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
        Please fill in following information!
    </span>
</h1>

<form>
    <table class ="table-comfortable" >
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-bank_number" for="bank_number">Bank Number<span style="color: red;">*</span></label></td>
            <td><input
                bind:value={bank_number_input}
                class="input"
                type="text"
                id = "bank_number"
                minlength="3"
                maxlength="3"
                placeholder="Enter bank number..."/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-pwd" for="Password">Bank Account<span style="color: red;">*</span></td>
            <td>
                {#if mask_bank_account === true}
                <input
                    bind:value={bank_account_input}
                    class="input"
                    type = "text"
                    minlength="16"
                    maxlength="16"
                    id = "Password"
                    placeholder="Enter your bank account..."/>
                {:else}
                    <input
                        bind:value={bank_account_input}
                        class="input"
                        type = "password"
                        id = "Password"
                        minlength="16"
                        maxlength="16"
                        placeholder="Enter your bank account..."/>
                {/if}
            </td>
            <td class="toggle-vis">
                <SlideToggle name="slider-label" bind:checked={mask_bank_account} size = "sm" background = "bg-surface-300 dark:bg-surface-900" active = "bg-surface-400 dark:bg-surface-700">
                    visibility
                </SlideToggle>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-address" for="Address">Deliver Address<span style="color: red;">*</span></label></td>
            <td><input
                bind:value={address_input}
                class="input"
                type="text"
                id = "Address"
                placeholder="Enter your Address..."/>
            </td>
        </tr>
    </table>

    <div class="button">
        <button on:click={order_placed} type="button" id="order_button" class="btn variant-filled">
            Place Order
        </button>
    </div>
</form>