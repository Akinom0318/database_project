<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DataHandler } from '@vincjo/datatables';
	import { current_keyword } from '../../store';

	function reloadPage() {
		const thisPage = window.location.pathname;

		// console.log('goto ' + thisPage);

		goto('/transition_page').then(
			() => goto(thisPage)
		);
	}
	export let handler: DataHandler;
	export let history = new Array();

	let value: string;
</script>

<span>
	<input
		class="input sm:w-64 w-36"
		type="search"
		placeholder="Search..."
		bind:value={value}
		list="history"
		on:input={() => {if(value === ""){ handler.search(value)
						reloadPage();}
		}}/>
	<button type="button" class="btn btn-icon ml-4 text-2xl border-slate-500 border-2 bg-slate-300" on:click={() => {
		handler.search(value)
		$current_keyword = value
	}}>
		&#128269;
	</button>
</span>



<datalist id="history">
	{#each history as a_history}
		<option>{a_history.keyword}</option>
	{/each}
</datalist>
					
			