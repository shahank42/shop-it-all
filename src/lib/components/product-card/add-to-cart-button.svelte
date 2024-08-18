<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { Button } from '../ui/button';
	import { cart } from '$lib/stores/cartStore';
	import type { Product } from '$lib/types';
	import { ShoppingCartIcon } from 'lucide-svelte';
	import { invalidate, invalidateAll } from '$app/navigation';

	const {
		product,
		userId
	}: {
		product: Product;
		userId: string | null;
	} = $props();

	let hasInteracted = $state($cart.items.some((item) => item.id === product.id));
</script>

{#if hasInteracted}
	<Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} let:motion>
		<Button
			on:click={async () => {
				hasInteracted = !hasInteracted;
				cart.deleteItem(product.id);

				if (userId) {
					try {
						const response = await fetch('/api/cart/items', {
							method: 'DELETE',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								userId,
								item: { ...product, quantity: 1 },
								deleteItem: true
							})
						});
						if (!response.ok) throw new Error('Failed to delete item from cart');
					} catch (error) {
						console.error('Error deleting item from cart:', error);
					} finally {
						console.log('actually updated db');
						invalidateAll();
					}
				}
			}}
			class="hidden w-full overflow-hidden lg:block"
			variant="default"
		>
			<Motion initial={{ y: -50 }} animate={{ y: 0 }} let:motion>
				<span use:motion class="relative block h-full w-full font-body font-semibold">
					<span class="flex w-full items-center justify-center gap-3">
						<ShoppingCartIcon /> Added
					</span>
				</span>
			</Motion>
		</Button>
	</Motion>
{:else}
	<Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} let:motion>
		<Button
			on:click={async () => {
				hasInteracted = !hasInteracted;
				cart.addItem(product);

				if (userId) {
					try {
						const response = await fetch('/api/cart/items', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ userId, item: { ...product, quantity: 1 } })
						});
						if (!response.ok) throw new Error('Failed to add item to cart');
					} catch (error) {
						console.error('Error adding item to cart:', error);
					} finally {
						console.log('actually updated db');
						invalidateAll();
					}
				}
			}}
			class="w-full overflow-hidden"
			variant="secondary"
		>
			<Motion initial={{ x: 0 }} exit={{ x: 50, transition: { duration: 0.1 } }} let:motion>
				<span use:motion class="relative block font-body font-semibold">
					<span class="flex items-center gap-3">Add <ShoppingCartIcon /> </span>
				</span>
			</Motion>
		</Button>
	</Motion>
{/if}
