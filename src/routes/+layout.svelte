<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { cart } from '$lib/stores/cartStore';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// import { user } from '$lib/stores/userStore';

	const { data, children } = $props();

	onMount(() => {
		if (data.userCartItems.length !== 0) {
			cart.clear();
			for (const item of data.userCartItems) {
				// const offlineItem = $cart.items.find((iitem) => iitem.id === item.id);
				// if (offlineItem) {
				// 	cart.setQuantityOf(offlineItem.id, offlineItem.quantity);
				// } else {
				cart.addItem(item);
				cart.setQuantityOf(item.id, item.quantity);
				// }
			}
		}
	});
</script>

<ModeWatcher />
<main class="relative flex min-h-screen flex-col">
	<Navbar user={data.user} />
	<div class="flex-1 flex-grow">
		{@render children()}
	</div>
</main>
