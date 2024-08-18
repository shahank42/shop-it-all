<script lang="ts">
	import type { CartItem, Product } from '$lib/types';
	import { cart } from '$lib/stores/cartStore';
	import Counter from './cart-card/counter.svelte';
	import { invalidateAll } from '$app/navigation';

	let { item, userId }: { item: CartItem; userId: string | null } = $props();

	let value = $state($cart.items.find((iitem) => iitem.id === item.id)?.quantity);
</script>

<Counter
	min={0}
	max={item.stock}
	value={value || 1}
	counterActions={{
		increment: async () => {
			cart.addItem(item);

			const itemQuantity = $cart.items.filter((iitem) => iitem.id === item.id)[0].quantity;

			if (userId) {
				try {
					const response = await fetch('/api/cart/items', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							userId,
							item: { ...item, quantity: itemQuantity }
						})
					});
					if (!response.ok) throw new Error('Failed to add item to cart');
				} catch (error) {
					console.error('Error adding item to cart:', error);
				} finally {
					console.log('actually updated db');
					invalidateAll();
				}
			}
		},
		decrement: async (value) => {
			if (value !== 0) cart.removeItem(item.id);
			else cart.deleteItem(item.id);

			const itemExists = $cart.items.find((item) => item.id === item.id);

			if (userId) {
				try {
					const response = await fetch('/api/cart/items', {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							userId,
							item: { ...item, quantity: itemExists ? 1 : 0 }
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
		},
		input: async (value) => {
			const oldItemQuantity = $cart.items.filter((item) => item.id === item.id)[0].quantity;

			cart.setQuantityOf(item.id, value);

			const itemQuantity = $cart.items.filter((item) => item.id === item.id)[0].quantity;

			if (userId) {
				try {
					const response = await fetch('/api/cart/items', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							userId,
							item: { ...item, quantity: Math.abs(oldItemQuantity - itemQuantity) }
						})
					});
					if (!response.ok) throw new Error('Failed to add item to cart');
				} catch (error) {
					console.error('Error adding item to cart:', error);
				} finally {
					console.log('actually updated db');
					invalidateAll();
				}
			}
		}
	}}
/>
