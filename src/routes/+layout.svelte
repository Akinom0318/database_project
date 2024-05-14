<script>
	import '../app.postcss';
    import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

</script>

<style>


</style>

<TabGroup 
	justify="justify-left"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=10px
	border=10px
	class="bg-surface-100-800-token w-full">
	<TabAnchor href="/">
		<svelte:fragment slot="lead">Home</svelte:fragment>
	</TabAnchor>
	<TabAnchor href="/login">
		<svelte:fragment slot="lead">Login</svelte:fragment>
	</TabAnchor>
	<TabAnchor href="/register">
		<svelte:fragment slot="lead">register</svelte:fragment>
	</TabAnchor>
	<TabAnchor href="/test">
		<svelte:fragment slot="lead">test</svelte:fragment>
	</TabAnchor>
</TabGroup>


<slot />