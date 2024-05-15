<script>
    import { fly, slide } from "svelte/transition";

    export let data;
</script>

<h1>Get the data on Database Team5DBFinal</h1>
<p>Below is the data we have</p>
<!-- {#each data.data as item}
    <p>Test for one data {item}</p>
{/each} -->
{#each data.data as Fuck}
    <p>User {Fuck.fuck} is a great person</p>
{/each}

<p in:fly={{ y: 20 }} out:slide>Home page!</p>