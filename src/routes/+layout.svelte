<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	const { data, children } = $props();
</script>

<ModeWatcher />
<main class="relative flex min-h-screen flex-col">
	<Navbar user={data.user} />
	<div class="flex-1 flex-grow">
		{@render children()}
	</div>
</main>
