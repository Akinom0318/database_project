<script lang="ts">
	//@ts-nocheck
	import type { DataHandler } from '@vincjo/datatables';
	import {current_product_page } from '../../store';
	export let handler: DataHandler;
	const rowsPerPage = handler.getRowsPerPage();

	const options = [5, 10, 20, 50, 100];
</script>

<aside class="flex place-items-center">
	Show
	<select class="select ml-2" bind:value={$rowsPerPage} on:change={() => {
		$current_product_page = 1;
	}}>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</aside>