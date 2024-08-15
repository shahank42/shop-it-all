<script>
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	// import { user } from '$lib/stores/userStore';

	const { data, children } = $props();

	// $user = data.user || null;
</script>

<ModeWatcher />
<main class="relative flex min-h-screen flex-col">
	<Navbar user={data.user} />
	<div class="flex-1 flex-grow">
		{@render children()}
	</div>
</main>
