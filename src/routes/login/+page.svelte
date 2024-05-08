<script>
// @ts-nocheck

    import { fly } from "svelte/transition";
    import { SlideToggle } from '@skeletonlabs/skeleton';

    let account_input = "";
    let password_input = "";
    let mask_password = false;

    let input_valid = false;
    //check whether the input is valid
    function check_valid(){
        if(!account_input){
            return;
        }
        if(!password_input){
            return;
        }
        input_valid = true;
        if(input_valid){
            console.log(account_input);
            console.log(password_input);
            console.log(value);
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
    <span class="gradient-heading">Welcome!</span>
</h1>

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
                    <SlideToggle name="slider-label" bind:checked={mask_password} size = "sm">visibility</SlideToggle>
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