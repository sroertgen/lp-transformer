<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
<div class="mx-auto w-3/4">
{@render children()}
  </div>
