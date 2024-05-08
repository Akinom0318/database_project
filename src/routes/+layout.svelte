<script>
	import '../app.postcss';
</script>

<style>
    .breadcrumb {
        display: flex;
        justify-content: right;
        list-style-type: none;
        padding: 0;
        margin: 0 10px; 
        font-family: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"    
    }

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