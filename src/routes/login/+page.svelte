<script>
// @ts-nocheck

    import { fly } from "svelte/transition";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import {current_account} from "../../store";

    let local_current_account = "";
    let account_input = "";
    let password_input = "";
    let mask_password = false;

    let login = false;
    let pressed_login = false;
    let account_existence = false;

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

    //check whether the input is valid
    async function check_valid(){
        if(!account_input){
            return;
        }
        if(!password_input){
            return;
        }
        input_valid = true;
        if(input_valid){
            account_existence = await check_account_existence();
            pressed_login = true;
            if(account_existence){
                login = true;
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

</style>

<h1 class="h1" style="text-align: center;" in:fly={{ y: 20 }}>
    <span class="gradient-heading">Welcome! {local_current_account}</span>
</h1>

<div>
    {#if login}
        <div>
            <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
                <div class="alert-message">
                    <h3 class="h3">Log in successful!</h3>
                </div>
                <div class="alert-actions">
                    <a href="../">
                        <button on:click={pressed_login_success}
                            id = "login_button"
                            type="button"
                            class="btn variant-filled">OK
                        </button>
                    </a>
                </div>
            </aside>
        </div>
    {:else if !account_existence && pressed_login}
    <div>
        <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
            <div class="alert-message">
                <h2 class="h2">The account does not exist!</h2>
                <h4 class="h4">Please check the account and password!</h4>
            </div>
            <div class="alert-actions">
                <button on:click={pressed_warning_button}
                    id = "warning_button"
                    type="button"
                    class="btn variant-filled" >OK
                </button>
            </div>
        </aside>
    </div>
    {/if}
</div>

<label>
    <div>
        <table class ="table-comfortable">
            <tr in:fly={{ y: 20 }}>
                <td><span>Account</span></td>
                <td><input 
                    bind:value={account_input}
                    class="input"
                    type="text"
                    id = "Account"
                    placeholder="Enter your account..." />
                </td>
            </tr>
            <tr in:fly={{ y: 20 }}>
                <td><span>Password</span></td>
                <td>
                    {#if mask_password === true}
                        <input
                        bind:value={password_input}
                        class="input"
                        type = "text"
                        id = "Password"
                        placeholder="Enter your Password..." />
                    {:else}
                        <input
                        bind:value={password_input}
                        class="input"
                        type = "password"
                        id = "Password"
                        placeholder="Enter your Password..." />
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
</label>

<div style="display: flex; justify-content: center;" in:fly={{ y: 20 }}>
    <button on:click={check_valid}
        id = "Login_Button"
        type="button"
        class="btn variant-filled" >Login
    </button>
</div>