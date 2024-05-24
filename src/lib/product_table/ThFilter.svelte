<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	export let filterBy: string;
	let value: string | number;
</script>

<th>
	<input
		class="input text-sm w-full"
		type="text"
		placeholder="Filter"
		bind:value
		on:input={() => {
			if (filterBy && typeof(value) !== typeof(3)) handler.filter(value, filterBy);
			else if(filterBy){
				handler.filter(value, filterBy)
			}
		}}
	/>
</th>