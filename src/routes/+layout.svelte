<script>
	import '../app.postcss';
</script>

<style>
    :global(body){
        margin: 0;
        padding: 0;
    }
    .breadcrumb {
        display: flex;
        justify-content: right;
        list-style-type: none;
        padding: 0;
        margin: 0 10px; 
        font-family: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"    
    }

    /* :global(div) {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
    } */

</style>


<ol class="breadcrumb">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li class="crumb"><a class="anchor" href="/login">Login</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li class="crumb"><a class="anchor" href="/register">Register</a></li>
	<li class="crumb-separator" aria-hidden></li>
</ol>

<slot />