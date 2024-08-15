<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/stores/cartStore';
	import Counter from '../cart-card/counter.svelte';

	let { product }: { product: Product; } = $props();

	let value = $state($cart.items.filter((item) => item.id === product.id)[0].quantity);
</script>

<Counter
	min={0}
	max={product.stock}
	{value}
	counterActions={{
		increment: () => cart.addItem(product),
		decrement: (value) => {
			if (value !== 0) cart.removeItem(product.id);
			else cart.deleteItem(product.id);
		},
		input: (value) => cart.setQuantityOf(product.id, value)
	}}
/>
