<script>
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	let currencies = [
		{ id: 0, text: "NTD", rate: 1 },
		{ id: 1, text: "USD", rate: 32.55 },
		{ id: 2, text: "HKD", rate: 4.18 },
		{ id: 3, text: "JPY", rate: 0.209 },
		{ id: 4, text: "CNY", rate: 4.507 },
		{ id: 5, text: "EUR", rate: 35.54 },
		{ id: 6, text: "GBP", rate: 42.1 },
		{ id: 7, text: "CHF", rate: 35.77 },
	];

    let passive_currency = 0;
    let active_currency = 0;
    let passive_value = 0;
    let active_value = 0;

    function exchanger_on_change_passive(){
        let passive_rate = currencies[passive_currency].rate;
        let active_rate = currencies[active_currency].rate;

        active_value = Math.round( passive_value * passive_rate / active_rate * 100) / 100;
    }

    function exchanger_on_change_active(){
        let passive_rate = currencies[passive_currency].rate;
        let active_rate = currencies[active_currency].rate;

        passive_value = Math.round( active_value * active_rate / passive_rate * 100) / 100;
    }

</script>

<style>

.exchanger {
            display: flex; 
            justify-content: center;      
            align-items: center;          
            gap: 10px;                     
            margin: 0 auto;                
            padding: 20px;                 
            max-width: 100%;              
        }

        .passive_input, .passive_select, .active_input, .active_select {
            display: flex;
            flex-direction: column;     
            align-items: center;      
        }

        .input {
            width: 100%;           
            max-width: 100%;            
            padding: 8px;       
            box-sizing: border-box;        
        }

        .select {
            width: 100%;                  
            max-width: 100%;               
            padding: 15px;
            padding-right: 35px;      
            box-sizing: border-box;        
        }

        .label {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;  
        }


</style>

<div class="exchanger">
    <div class="passive_input">
        <input
        class="input sm:w-64 w-36"
        type="number"
        placeholder="..."
        bind:value={passive_value}
        on:change={exchanger_on_change_passive}
        />
    </div>
    <div class="passive_select">
        <label class="label">
            <select class="select" bind:value={passive_currency} on:change={exchanger_on_change_passive}>
            {#each currencies as currency}
                <option value={currency.id}>{currency.text}</option>
            {/each}
            </select>
        </label>  
    </div>
    <div class="active_input">
        <input
        class="input sm:w-64 w-36"
        type="number"
        placeholder="..."
        bind:value={active_value}
        on:change={exchanger_on_change_active}
        />
    </div>
    <div class="active_select">
        <label class="label">
            <select class="select" bind:value={active_currency} on:change={exchanger_on_change_active}>
                {#each currencies as currency}
                <option value={currency.id}>{currency.text}</option>
            {/each}
            </select>
        </label>  
    </div>
</div>
    
<!-- <span>
    <input
        class="input sm:w-64 w-36"
        type="active_currency"
        placeholder="..."
        bind:value={active_value}
    />
    <ListBox>
        {#each currencies as currency}
            <ListBoxItem bind:group={active_currency} name="medium" value={currency.rate}>{currency.text}</ListBoxItem>
        {/each}
    </ListBox>
                
</span> -->