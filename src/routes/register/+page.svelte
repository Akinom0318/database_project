<script>
    import { fly } from "svelte/transition";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    let email_input = "";
    let account_input = "";
    let password_input = "";
    let address_input = "";
    let phone_number_input = "";
    let birth_date_input = "";
    let mask_password = false;


    let input_valid = false;
    //check whether the input is valid
    function check_valid(){
        if(!email_input){
            return;
        }
        if(!account_input){
            return;
        }
        if(!password_input){
            return;
        }
        if(!address_input){
            return;
        }
        if(!phone_number_input){
            return;
        }
        if(!birth_date_input){
            return;
        }
        input_valid = true;
        if(input_valid){
            console.log(email_input);
            console.log(account_input);
            console.log(password_input);
            console.log(address_input);
            console.log(phone_number_input);
            console.log(birth_date_input);
        }
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

</style>


<label>
    <div>
        <table class ="table-comfortable">
            <tr in:fly={{ y: 20 }}>
                <td ><span>Email</span></td>
                <td><input 
                    bind:value={email_input}
                    class="input"
                    type="text"
                    id = "Email"
                    placeholder="Enter your Email..." />
                </td>
            </tr>
            <tr in:fly={{ y: 20 }} >
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
            <tr in:fly={{ y: 20 }}>
                <td><span>Address</span></td>
                <td><input
                    bind:value={address_input}
                    class="input"
                    type="text"
                    id = "Address"
                    placeholder="Enter your Address..." />
                </td>
            </tr>
            <tr in:fly={{ y: 20 }}>
                <td><span>Phone Number</span></td>
                <td><input 
                    bind:value={phone_number_input}
                    class="input"
                    type="text"
                    id = "Phone_Number"
                    placeholder="Enter your phone number..." />
                </td>
            </tr>
            <tr in:fly={{ y: 20 }}>
                <td><span>Birth Date (ex:2004/03/18)</span></td>
                <td><input
                    bind:value={birth_date_input}
                    class="input"
                    type="text"
                    id = "Birth_Date"
                    placeholder="Enter your birth date..." />
                </td>
            </tr>
        </table>
    </div>
</label>

<div style="display: flex; justify-content: center;" in:fly={{ y: 20 }}>
    <button on:click={check_valid}
        id = "Submit_Button"
        type="button"
        class="btn variant-filled" >Submit
    </button>
</div>
