<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    import MessageModal from '../../lib/MessageModal.svelte';
    import { isValidEmail, isValidPhoneNumber } from "./checkFormat";
    
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

    //! Message Showing
    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    }

    //! Check if input has whitespace
     function containsWhiteSpace() {
        const whiteSpaceEmail = email_input.includes(" ");
        if(whiteSpaceEmail) {
            showModal("Email cannot contain whitespace.");
            return false;
        }
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
        const whiteSpaceAddress = address_input.includes(" ");
        if(whiteSpaceAddress) {
            showModal("Address cannot contain whitespace.");
            return false;
        }
        const whiteSpacePhoneNumber = phone_number_input.includes(" ");
        if(whiteSpacePhoneNumber) {
            showModal("Phone Number cannot contain whitespace.");
            return false;
        }
        //! PhoneNumber First two char is zero
        if(phone_number_input.charAt(0) == "0" && phone_number_input.charAt(1) == "0"){
            showModal("Phone Number cannot start with 00.");
            return false;
        }
        return true;
    }

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
        console.log("Checking Validity...");
        //! Check if input contains whitespace
        if(!containsWhiteSpace()) { return;}
        if(!email_input){ return; }
        //! Check email format
        const email_format_check = isValidEmail(email_input);
        if(!email_format_check){ 
            showModal("Email format is invalid.");
            return;
        }

        if(!account_input){ return; }
        else if(account_input.length < 1 || account_input.length > 30){
            showModal("Account length needs to between 1 and 50 characters.");
            return;
        }

        if(!password_input){ return; }
        else if(password_input.length < 4 || password_input.length > 35) { 
            showModal("Password length needs to between 4 and 55 characters.");
            return;
        }

        //TODO Address validation and correctness
        if(!address_input){ return; }

        if(!phone_number_input){ return; }
        const phone_number_format_check = isValidPhoneNumber(phone_number_input);
        if(!phone_number_format_check){ console.log("Phone number format is invalid."); showModal("Format of Phone Number is invalid!"); return; }
        
        if(!birthdate_input){ return; }

        input_valid = true;
        if(input_valid){
            console.log("Input is valid!");
            //check_result contain the result of check_account_existence
            let check_result = await check_account_existence()
            if(!check_result){
                let date_birthdate = new Date(birthdate_input);
                let ISO_birthdate = date_birthdate.toISOString();
                const response = await fetch("register/users", {
                    method: 'POST',
			        body: JSON.stringify({account_input, password_input, address_input, email_input, ISO_birthdate, phone_number_input}),
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
    
    input:invalid {
        border-color: rgb(244, 160, 255);
    }
    
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin-top: 15px;
        margin-bottom: 10px;
    }

    #success-warning-message {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
    }

    .hoverPop {
		display: flex;
		position: fixed; /* blur position */
		padding-top: 15px;
        margin-top: 40%;
		backdrop-filter: blur(15px);
	}
    
</style>

<!-- Message Box -->
<MessageModal bind:visible={modalVisible} bind:message={modalMessage} />

<!-- this part is warning that will show if the account is existed. -->
<div id="success-warning-message">
    {#if warning_visible}
        <aside class="alert variant-ghost hoverPop" in:fly={{ y: 20 }}>
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
        <aside class="alert variant-ghost hoverPop" in:fly={{ y: 20 }}>
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

<h1 class="h1" style="text-align: center;" in:fly={{ y: 20 }}>
    <span class="gradient-heading">Register Your First Account!</span>
</h1>

<form on:submit|preventDefault={check_valid}>
    <table class ="table-comfortable">
        <tr in:fly={{ y: 20 }}>
            <td ><label id="label-Email" for="Email">Email<span style="color: red;">*</span></label></td>
            <td><input 
                bind:value={email_input}
                class="input"
                type="text"
                id = "Email"
                placeholder="Enter your Email..." required/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }} >
            <td><label id="label-acc" for="Account">Account<span style="color: red;">*</span></label></td>
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
                    minlength="4"
                    maxlength="55"
                    id = "Password"
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
            <td class="toggle-vis">
                <SlideToggle name="slider-label" bind:checked={mask_password} size = "sm" background = "bg-surface-300 dark:bg-surface-900" active = "bg-surface-400 dark:bg-surface-700">
                    visibility
                </SlideToggle>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-address" for="Address">Address<span style="color: red;">*</span></label></td>
            <td><input
                bind:value={address_input}
                class="input"
                type="text"
                id = "Address"
                placeholder="Enter your Address..." required/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-phoneNumber" for="Phone_Number">Phone Number<span style="color: red;">*</span></label></td>
            <td><input 
                bind:value={phone_number_input}
                class="input"
                type="text"
                id = "Phone_Number"
                placeholder="Enter your phone number..." required/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-BD" for="Birth_Date">Birth Date<span style="color: red;">*</span> (ex:2004/03/18)</label></td>
            <td><input
                bind:value={birthdate_input}
                class="input"
                type="date"
                id = "Birth_Date"
                placeholder="Enter your birth date..." required/>
            </td>
        </tr>
    </table>
    <div style="display: flex; justify-content: center; font-weight: bold;" in:fly={{ y: 20 }}>
        <input type="submit" value="Submit" class="btn variant-filled">
    </div>
</form>



