<script>
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    let email_input = "";
    let account_input = "";
    let password_input = "";
    let address_input = "";
    let phone_number_input = "";
    let birthdate_input = "";
    let mask_password = false;

    let input_valid = false;
    let warning_visible = false;
    let register_success = false;


    //action after pressed warning button
    //will reset input and disable the warning
    function pressed_warning_button(){
        email_input = "";
        account_input = "";
        password_input = "";
        address_input = "";
        phone_number_input = "";
        birthdate_input = "";
        warning_visible = false;
    }

    //action after pressed success button
    //will reset input and disable the success warning
    function pressed_register_success_button(){
        email_input = "";
        account_input = "";
        password_input = "";
        address_input = "";
        phone_number_input = "";
        birthdate_input = "";
        register_success = false;
    }

    //return all users object
    async function get_all_users(){
        const response = await fetch("register/users");
        let all_users_object = await response.json();
        return all_users_object;
    }

    //to check the account existence
    //if existence will return true
    async function check_account_existence(){
        let all_users_object = await get_all_users();
        for(const user of all_users_object){
            if(user.account == account_input){
                warning_visible = true;
                return true;
            }
        }
        return false;
    }


    //check whether the input is valid
    //if valid then will register
    async function check_valid(){
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
        if(!birthdate_input){
            return;
        }
        input_valid = true;
        if(input_valid){
            //check_result contain the result of check_account_existence
            let check_result = await check_account_existence()
            if(!check_result){
                let date_birthdate = new Date(birthdate_input);
                let ISO_birthdate = date_birthdate.toISOString();
                const response = await fetch("register/users", {
                    method: 'POST',
			        body: JSON.stringify({account_input, password_input, address_input, email_input, ISO_birthdate}),
			        headers: {
				'content-type': 'application/json'
			    }
		    });
                console.log("Register Success!");
                register_success = true;
            }
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

    /* .toggle-vis {
        display: flex;
        justify-content:flex-start;
    } */

</style>

<h1 class="h1" style="text-align: center;" in:fly={{ y: 20 }}>
    <span class="gradient-heading">Register Your First Account!</span>
</h1>


<!-- this part is warning that will show if the account is existed. -->
<div>
    {#if warning_visible}
        <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
            <div class="alert-message">
                <h3 class="h3">WARNING!</h3>
                <p>Account has been registered!</p>
            </div>
            <div class="alert-actions">
                <button on:click={pressed_warning_button}
                    id = "warning_button"
                    type="button"
                    class="btn variant-filled" >OK
                </button>
            </div>
        </aside>
    {:else if register_success}
        <aside class="alert variant-ghost" in:fly={{ y: 20 }}>
            <div class="alert-message">
                <h3 class="h3">Congradulation!</h3>
                <p>Account has been registered successfully!</p>
            </div>
            <div class="alert-actions">
                <button on:click={pressed_register_success_button}
                    id = "register_success_button"
                    type="button"
                    class="btn variant-filled" >YEAH!
                </button>
            </div>
        </aside>
    {/if}
</div>


<div>
    <table class ="table-comfortable">
        <tr in:fly={{ y: 20 }}>
            <td ><label id="label-Email" for="Email">Email</label></td>
            <td><input 
                bind:value={email_input}
                class="input"
                type="text"
                id = "Email"
                placeholder="Enter your Email..." />
            </td>
        </tr>
        <tr in:fly={{ y: 20 }} >
            <td><label id="label-acc" for="Account">Account</label></td>
            <td><input 
                bind:value={account_input}
                class="input"
                type="text"
                id = "Account"
                placeholder="Enter your account..." />
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-pwd" for="Password">Password</label></td>
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
            <td class="toggle-vis">
                    <SlideToggle name="slider-label" bind:checked={mask_password} size = "sm" background = "bg-surface-300 dark:bg-surface-900" active = "bg-surface-400 dark:bg-surface-700">
                        visibility
                    </SlideToggle>

            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-address" for="Address">Address</label></td>
            <td><input
                bind:value={address_input}
                class="input"
                type="text"
                id = "Address"
                placeholder="Enter your Address..." />
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-phoneNumber" for="Phone_Number">Phone Number</label></td>
            <td><input 
                bind:value={phone_number_input}
                class="input"
                type="text"
                id = "Phone_Number"
                placeholder="Enter your phone number..." />
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-BD" for="Birth_Date">Birth Date (ex:2004/03/18)</label></td>
            <td><input
                bind:value={birthdate_input}
                class="input"
                type="date"
                id = "Birth_Date"
                placeholder="Enter your birth date..." />
            </td>
        </tr>
    </table>
</div>

<div style="display: flex; justify-content: center;" in:fly={{ y: 20 }}>
    <button on:click={check_valid}
        id = "Submit_Button"
        type="button"
        class="btn variant-filled" >Submit
    </button>
</div>

