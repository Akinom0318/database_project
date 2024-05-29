<script lang="ts">
// @ts-nocheck
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    import MessageModal from '../../lib/MessageModal.svelte';
    import { current_account } from "../../store";

    //! Admin Account: admin
    let isAdmin = false;
    let local_current_account = "";
    let account_input = "";
    let password_input = "";
    let mask_password = false;

    let login = false;
    let pressed_login = false;
    let account_existence = false;

    //! Message Showing
    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    }

    //return all users object
    async function get_all_users(){
        const response = await fetch("login/users");
        let all_users_object = await response.json();
        return all_users_object;
    }


    //if login success will pop up a banner
    function pressed_login_success(){
        login = false;
    }

    //if the account does not exist then a warning will pop up
    function pressed_warning_button(){
        current_account.set("");
        account_input = "";
        password_input = "";
        account_existence = false;
        pressed_login = false;
        isAdmin = false;
    }

    //to check the account existence
    //if existence will return true
    async function check_account_existence(){
        let all_users_object = await get_all_users();
        for(const user of all_users_object){
            //check input user existence or not
            if(user.account === account_input && password_input === user.password){
                $current_account = user.account;
                current_account.subscribe((value) => {
                    local_current_account = value;
                });
                return true;
            }
        }
        return false;
    }


    let input_valid = false;

    //! Check if input has whitespace
    function containsWhiteSpace() {
        const whiteSpaceAccount = account_input.includes(" ");
        if(whiteSpaceAccount) {
            showModal("Account cannot contain whitespace.");
            return false;
        }
        const whiteSpacePassword = password_input.includes(" ");
        if(whiteSpacePassword) {
            showModal("Password cannot contain whitespace.");
            return false;
        }
        return true;
    }

    //check whether the input is valid
    async function check_valid(){
        if(!account_input){ return;}
        if(!password_input){ return;}
        if(!containsWhiteSpace()){ return;}
        
        input_valid = true;
        if(input_valid){
            account_existence = await check_account_existence();
            pressed_login = true;
            if(account_existence){
                //! Check whether the user is Admin or normal user
                if(local_current_account == "admin"){
                    isAdmin = true;
                }else{ isAdmin = false;}
                login = true;
                console.log(login);
            }
        }
    };

</script>

<style>
    .table-comfortable{
        text-align: center;
        font-family: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
        margin: auto;
        border-collapse: separate;
        border-spacing: 5px 20px;
    }

    h1 {
        margin-top: 15px;
    }

    #login-container {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #label-account, #label-pwd {
        padding-right: 20px;
    }

    #login-message {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
    }

</style>

<!-- Message Box -->
<MessageModal bind:visible={modalVisible} bind:message={modalMessage} />

<div id="login-message">
    {#if login}
        <div>
            <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
                <div class="alert-message">
                    <h3 class="h3">Log in successful!</h3>
                </div>
                <div class="alert-actions">
                    {#if !isAdmin}
                        <a href="../">
                            <button on:click={pressed_login_success}
                                id = "login_button"
                                type="button"
                                class="btn variant-filled">OK
                            </button>
                        </a>
                    {:else}
                        <a href="../user_UI">
                            <button on:click={pressed_login_success}
                                id="login_button"
                                type="button"
                                class="btn variant-filled">OK
                            </button>
                        </a>
                    {/if}
                </div>
            </aside>
        </div>
    {:else if !account_existence && pressed_login}
        <div>
            <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
                <div class="alert-message">
                    <h3 class="h3">The account does not exist!</h3>
                    <h4 class="h4">Please check the account and password!</h4>
                </div>
                <div class="alert-actions">
                    <button on:click={pressed_warning_button}
                        id = "warning_button"
                        type="button"
                        class="btn variant-filled">OK
                    </button>
                </div>
            </aside>
        </div>
    {/if}
</div>

<h1 class="h1" style="text-align: center;" in:fly={{ y: 20 }}>
    <span class="gradient-heading">Welcome ! {local_current_account}</span>
</h1>

<form on:submit|preventDefault={check_valid}>
    <div id="login-container">
        <table class ="table-comfortable">
            <tr in:fly={{ y: 20 }}>
                <td><label id="label-account" for="Account">Account<span style="color: red;">*</span></label></td>
                <td><input 
                    bind:value={account_input}
                    class="input"
                    type="text"
                    id = "Account"
                    minlength="1"
                    maxlength="50"
                    placeholder="Enter your account..." required/>
                </td>
            </tr>
            <tr in:fly={{ y: 20 }}>
                <td><label id="label-pwd" for="Password">Password<span style="color: red;">*</span></label></td>
                <td>
                    {#if mask_password === true}
                        <input
                            bind:value={password_input}
                            class="input"
                            type = "text"
                            id = "Password"
                            minlength="4"
                            maxlength="55"
                            placeholder="Enter your Password..." required/>
                    {:else}
                        <input
                            bind:value={password_input}
                            class="input"
                            type = "password"
                            id = "Password"
                            minlength="4"
                            maxlength="55"
                            placeholder="Enter your Password..." required/>
                    {/if}
                </td>
                <td>
                    <SlideToggle name="slider-label" bind:checked={mask_password} size = "sm" background = "bg-surface-300 dark:bg-surface-900" active = "bg-surface-400 dark:bg-surface-700">
                        visibility
                    </SlideToggle>
                </td>
            </tr>
        </table>
    </div>
    <div style="display: flex; justify-content: center; font-weight: bold" in:fly={{ y: 20 }}>
        <input type="submit" value="Login" class="btn variant-filled">
    </div>
</form>
