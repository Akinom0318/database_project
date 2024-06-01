<script>
	let currencies = [
		{ id: 1, text: "USD" },
		{ id: 2, text: "HKD" },
		{ id: 3, text: "JPY" },
		{ id: 4, text: "CNY" },
		{ id: 5, text: "EUR" },
		{ id: 6, text: "GBP" },
		{ id: 7, text: "CHF" },
	];

	let selected;
	let money=0;
	let ntd;

	function NTD_exchange(cash){     //支援7種貨幣，預設台幣為初始
    switch(selected.text){
        case "USD":     //美金
            money=cash/32.55;
            break;
        case "HKD":     //港幣
            money=cash/4.18;
            break;
        case "JPY":     //日圓
            money=cash/0.209;
            break;
        case "CNY":     //人民幣
            money=cash/4.507;
            break;
        case "EUR":     //歐元
            money=cash/35.54;
            break;
        case "GBP":     //英鎊
            money=cash/42.1;
            break;
        case "CHF":     //法郎
            money=cash/35.77;
						break;
				default:     
            money=0;
						break;
    }
    money=Math.round((money+Number.EPSILON)*100)/100;
	}
</script>

<input type="number" bind:value={ntd} oninput="validity.valid||(value='');"
			 placeholder="NTD to ..." inputmode="numeric" min=0>

<form on:submit|preventDefault={()=>NTD_exchange(ntd)}>
	
	<select bind:value={selected} on:change="{() => (money = 0 , ntd=0)}">
		{#each currencies as currency}
			<option value={currency}>
				{currency.text}
			</option>
		{/each}
	</select>

	<button disabled={!ntd} type=submit>
	exchange
	</button>
	
</form>

<p>Equals {money} {selected ? selected.text : ""}</p>