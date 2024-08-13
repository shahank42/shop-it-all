<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';
</script>

<main class="relative flex min-h-screen flex-col">
	<Navbar />
	<div class="flex-1 flex-grow">
		<slot />
	</div>
</main>
