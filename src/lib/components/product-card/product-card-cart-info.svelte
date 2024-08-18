<script lang="ts">
	import ProductCardCounter from '../cart-item-card-counter.svelte';

	import type { CartItem, Product } from '$lib/types';
	import SquareCard from '../ui/fancy-card/SquareCard.svelte';
	import AddToCartButton from './add-to-cart-button.svelte';
	import { cn, formatPrice } from '$lib/utils';
	import { cart } from '$lib/stores/cartStore';
	import Counter from '../cart-card/counter.svelte';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
	import CartItemCardCounter from '../cart-item-card-counter.svelte';
	import { onMount } from 'svelte';

	let {
		product,
		cartItem,
		userId
	}: { product: Product; cartItem: CartItem | undefined; userId: string | null } = $props();
	// let inCart = $state(false);
	// let cartItem: CartItem | undefined = $state(undefined);
	// $effect(() => {
	// 	cartItem = $cart.items.find((item) => item.id === product.id);
	// 	// inCart = $cart.items.some((item) => item.id === product.id);
	// });
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
