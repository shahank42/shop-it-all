<script>
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<ModeWatcher />
<main class="relative flex min-h-screen flex-col">
	<Navbar />
	<div class="flex-1 flex-grow">
		<slot />
	</div>
</main>
