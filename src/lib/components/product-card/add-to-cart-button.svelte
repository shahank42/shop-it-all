<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { Button } from '../ui/button';
	import { cart } from '$lib/stores/cartStore';
	import type { Product } from '$lib/types';
	import { ShoppingCartIcon } from 'lucide-svelte';
	import ProductCardCounter from './product-card-counter.svelte';

	const {
		product
	}: {
		product: Product;
	} = $props();

	let hasInteracted = $state($cart.items.some((item) => item.id === product.id));
</script>

{#if hasInteracted}
	<Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} let:motion>
		<Button
			on:click={() => {
				hasInteracted = !hasInteracted;
				cart.deleteItem(product.id);
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
			on:click={() => {
				hasInteracted = !hasInteracted;
				cart.addItem(product);
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
