<script lang="ts">
	import type { CartItem } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { Trash2Icon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Card, CardContent } from '../ui/card';
	import { cart } from '$lib/stores/cartStore';
	import Counter from './counter.svelte';
	import CartItemCardCounter from '../cart-item-card-counter.svelte';

	let { item, userId }: { item: CartItem; userId: string | null } = $props();
</script>

<Card class="flex h-44 md:h-48">
	<div
		class="h-full w-auto shrink-0 overflow-hidden rounded-bl-lg rounded-tl-lg border-r border-dotted"
	>
		<img src={item.image} alt={item.title} class="h-full object-cover" />
	</div>

	<CardContent class="flex h-full w-full flex-col justify-between gap-3 px-3 py-6 lg:px-6">
		<div class="flex h-full flex-col justify-between">
			<div class="flex flex-col justify-between">
				<h3 class="lg:text-md line-clamp-2 font-heading text-sm leading-5 md:text-base">
					{item.title}
				</h3>
				<p class="text-sm text-muted-foreground">{item.stock} in stock</p>
			</div>
			<h4 class="text-md font-heading font-semibold md:text-lg">
				{formatPrice(item.price * item.quantity, item.currency)}
			</h4>
		</div>

		<div class="flex w-full items-center justify-between">
			<CartItemCardCounter {item} {userId} />

			<Button
				variant="destructive"
				size="icon"
				on:click={async () => {
					cart.deleteItem(item.id);

					try {
						const response = await fetch('/api/cart/items', {
							method: 'DELETE',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								userId: 'amixf7rgvzslzuxh',
								item: item,
								deleteItem: true
							})
						});
						if (!response.ok) throw new Error('Failed to delete item from cart');
					} catch (error) {
						console.error('Error deleting item from cart:', error);
					} finally {
						console.log('actually updated db');
					}
				}}
			>
				<Trash2Icon />
			</Button>
		</div>
	</CardContent>
</Card>
