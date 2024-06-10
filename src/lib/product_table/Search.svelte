<script lang="ts">
	import { current_keyword } from '../../store';
	import type { DataHandler } from '@vincjo/datatables';
	import { goto } from '$app/navigation';

	function reloadPage() {
		const thisPage = window.location.pathname;

		console.log('goto ' + thisPage);

		goto('/').then(
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
	}}
	/>
	<button type="button" class="btn btn-sm variant-filled-secondary" on:click={() => {
		handler.search(value)
		$current_keyword = value
	}}>
		Search
	</button>
</span>



<datalist id="history">
	{#each history as a_history}
		<option>{a_history.keyword}</option>
	{/each}
</datalist>
					
			