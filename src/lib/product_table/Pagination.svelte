<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { current_product_page } from '../../store';
	export let handler: DataHandler;

	let local_current_product_page = 1;

	const pageNumber = handler.getPageNumber();

	pageNumber.subscribe((value) => {
		local_current_product_page = value;
	})

	const pageCount = handler.getPageCount();
	const pages = handler.getPages({ ellipsis: true });
</script>

<!-- Desktop buttons -->
<section class="btn-group variant-ghost-surface [&>*+*]:border-surface-500 h-10 hidden lg:block">
	<button
		type="button"
		class="hover:variant-soft-primary"
		class:disabled={$pageNumber === 1}
		on:click={() => {handler.setPage('previous');
		$current_product_page = local_current_product_page;
		}}
	>
		←
	</button>
	{#each $pages as page}
		<button
			type="button"
			class="hover:variant-soft-primary"
			class:active={$pageNumber === page}
			class:ellipse={page === null}
			on:click={() => {handler.setPage(page);
			$current_product_page = local_current_product_page;
			}}
		>
			{page ?? '...'}
		</button>
	{/each}
	<button
		type="button"
		class="hover:variant-soft-primary"
		class:disabled={$pageNumber === $pageCount}
		on:click={() => {handler.setPage('next');
		$current_product_page = local_current_product_page;
		}}
	>
		→
	</button>
</section>

<!-- Mobile buttons -->
<section class="lg:hidden">
	<button
		type="button"
		class="btn variant-ghost-surface mr-2 mb-2 hover:variant-soft-primary"
		class:disabled={$pageNumber === 1}
		on:click={() => handler.setPage('previous')}
	>
		←
	</button>
	<button
		type="button"
		class="btn variant-ghost-surface mb-2 hover:variant-soft-primary"
		class:disabled={$pageNumber === $pageCount}
		on:click={() => handler.setPage('next')}
	>
		→
	</button>
</section>