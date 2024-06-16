<script lang="ts">
    import MessageModal from '$lib/MessageModal.svelte';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { fly } from "svelte/transition";
    import { current_account, current_account_ID } from "../../../store";
    import { isValidEmail } from '../../register/checkFormat';
    export let user = Object();

    let email_input = "";
    let password_input = "";
    let address_input = "";
    let birthdate_input = "";

    let modify_warning = false;
    let mask_password = false;
    let modify_success = false;
    let delete_warning = false;
    let input_valid = false

    let modalMessage = '';
    let modalVisible = false;
    function showModal(message: string) {
        modalMessage = message;
        modalVisible = true;
    }
     function containsWhiteSpace() {
        const whiteSpaceEmail = email_input.includes(" ");
        if(whiteSpaceEmail) {
            showModal("Email cannot contain whitespace.");
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
        return true;
    }
     async function check_valid(){
        // console.log("Checking Validity...");
        //! Check if input contains whitespace
        if(!containsWhiteSpace()) { return;}
        if(!email_input){ return; }
        //! Check email format
        const email_format_check = isValidEmail(email_input); 
        if(!email_format_check){ 
            showModal("Email format is invalid.");
            return;
        }


        if(!password_input){ return; }
        else if(password_input.length < 4 || password_input.length > 20) { 
            showModal("Password length needs to between 4 and 20 characters.");
            return;
        }

        //TODO Address validation and correctness
        if(!address_input){ return; }

        input_valid = true;
    }

    //return all users
    async function get_all_users(){
        const response = await fetch("user_UI/users");
        let all_users_object = await response.json();
        return all_users_object;
    }

    //it will make the placeholder in the input to be the original user info
    async function check_user_info(){
        const all_users = await get_all_users();
        for(const user of all_users){
            if(user.account === local_current_account){
                email_input = user.email_address;
                password_input = user.password;
                address_input = user.address;
                birthdate_input = new Date(Date.parse(user.birthdate)).toISOString().split('T')[0]
            }
        }
    }

    check_user_info();

    let local_current_account = "";
    current_account.subscribe((value) => {
        local_current_account = value;
    });

    function modify_confirm(){
        check_valid()
        if(input_valid){
            modify_warning = true;
        }
    }

    function delete_confirm(){
        delete_warning = true;
    }

    async function delete_confirm_yes(){
        delete_warning = false;
        let local_current_account_ID = 0;
        let user_ID = user.user_ID

        current_account_ID.subscribe((value) => {
            local_current_account_ID = value;
        })

        const response = await fetch("user_UI/users/userDelete",{
            method: "POST",
            body: JSON.stringify({local_current_account_ID}),
            headers: {
				    'content-type': 'application/json'
            }
        });

        $current_account = "";
        $current_account_ID = 0;

    }

    function delete_confirm_no(){
        delete_warning = false;
    }

    async function modify_confirm_yes(){
        modify_warning = false;
        let date_birthdate = new Date(birthdate_input);
        let ISO_birthdate = date_birthdate.toISOString();
        const response = await fetch("user_UI/users", {
                    method: 'POST',
			        body: JSON.stringify({local_current_account, password_input, address_input, email_input, ISO_birthdate}),
			        headers: {
				    'content-type': 'application/json'
			    }
		    });
        // console.log("modify success!");
        modify_success = true;
    }

    function modify_confirm_no(){
        modify_warning = false;
    }

    function modify_success_confirm(){
        modify_success = false;
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

    
</style>

{#if modify_warning}
    <aside class="alert variant-ghost-warning" in:fly={{ y: 20 }}>
        <div class="alert-message">
            <h1 class="h1" style="text-align: left; padding-top: 0px;" >
                ⚠️Warning!
            </h1>
            <h2 class="h2">Are you sure you want to modify?</h2>
        </div>
        <div class="alert-actions">
            <button on:click={modify_confirm_yes} class="btn variant-filled">
                Yes
            </button>
            <button on:click={modify_confirm_no} class="btn variant-filled">
                No
            </button>
        </div>
    </aside>
{/if}

<MessageModal bind:visible={modalVisible} bind:message={modalMessage} />

{#if modify_success}
    <aside class="alert variant-ghost-success" in:fly={{ y: 20 }}>
        <div class="alert-message">
            <h1 class="h1" style="text-align: left; padding-top: 0px;" >
                Modify Success✅
            </h1>
        </div>
        <div class="alert-actions">
            <button on:click={modify_success_confirm} class="btn variant-filled">
                OK
            </button>
        </div>
    </aside>
{/if}

{#if delete_warning}
    <aside class="alert variant-ghost-warning" in:fly={{ y: 20 }}>
        <div class="alert-message">
            <h1 class="h1" style="text-align: left; padding-top: 0px;" >
                ⚠️Warning!
            </h1>
            <h2 class="h2">Are you sure you want to <b>DELETE THE ACCOUNT</b>?</h2>
        </div>
        <div class="alert-actions">
            <a href="../">
                <button on:click={delete_confirm_yes} class="btn variant-filled">
                    Yes
                </button>                
            </a>
            <button on:click={delete_confirm_no} class="btn variant-filled">
                No
            </button>
        </div>
    </aside>
{/if}

<h1 class="h1" in:fly={{ y: 20 }}>
	<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
        Modify your account information!
    </span>
</h1>

<form>
    <table class ="table-comfortable" >
        <tr in:fly={{ y: 20 }}>
            <td ><label id="label-Email" for="Email">Email</label></td>
            <td><input 
                bind:value={email_input}
                class="input"
                type="text"
                id = "Email"
                placeholder="Enter your Email..."/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-pwd" for="Password">Password</td>
            <td>
                {#if mask_password === true}
                <input
                    bind:value={password_input}
                    class="input"
                    type = "text"
                    minlength="4"
                    maxlength="20"
                    id = "Password"
                    placeholder="Enter your Password..."/>
                {:else}
                    <input
                        bind:value={password_input}
                        class="input"
                        type = "password"
                        id = "Password"
                        minlength="4"
                        maxlength="20"
                        placeholder="Enter your Password..."/>
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
                placeholder="Enter your Address..."/>
            </td>
        </tr>
        <tr in:fly={{ y: 20 }}>
            <td><label id="label-BD" for="Birth_Date">Birth Date (ex:2004/03/18)</label></td>
            <td><input
                bind:value={birthdate_input}
                class="input"
                type="date"
                id = "Birth_Date"
                min="1904-01-01"
                max="2024-06-12"
                placeholder="Enter your birth date..."/>
            </td>
        </tr>
    </table>

    <div class="button">
        <button on:click={modify_confirm} type="button" id="modify_button" class="btn variant-filled">
            Modify
        </button>

        <button on:click={delete_confirm} type="button" id="delete_button" class="btn variant-filled-error">
            DELETE
        </button>
    </div>
</form>
