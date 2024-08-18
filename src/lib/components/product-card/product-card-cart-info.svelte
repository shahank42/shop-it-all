<script lang="ts">
	import type { CartItem, Product } from '$lib/types';
	import AddToCartButton from './add-to-cart-button.svelte';
	import { cn } from '$lib/utils';
	import { CardFooter } from '../ui/card';
	import CartItemCardCounter from '../cart-item-card-counter.svelte';

	let {
		product,
		cartItem,
		userId
	}: { product: Product; cartItem: CartItem | undefined; userId: string | null } = $props();
</script>

{#key cartItem}
	<CardFooter class="px-3 md:px-6">
		<div class="flex w-full justify-center gap-3">
			{#if cartItem !== undefined}
				<CartItemCardCounter item={cartItem} {userId} />
			{/if}

			<div
				class={cn({
					'w-full': !(cartItem !== undefined),
					'sm:w-full': cartItem !== undefined
				})}
			>
				<AddToCartButton {product} {userId} />
			</div>
		</div>
	</CardFooter>
{/key}
