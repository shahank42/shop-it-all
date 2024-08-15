<script lang="ts">
	import ProductCardCounter from './product-card-counter.svelte';

	import type { Product } from '$lib/types';
	import SquareCard from '../ui/fancy-card/SquareCard.svelte';
	import AddToCartButton from './add-to-cart-button.svelte';
	import { cn, formatPrice } from '$lib/utils';
	import { cart } from '$lib/stores/cartStore';
	import Counter from '../cart-card/counter.svelte';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

	let { product }: { product: Product } = $props();
	let inCart = $state(false);
	$effect(() => {
		inCart = $cart.items.some((item) => item.id === product.id);
	});
</script>

<Card class="flex flex-col">
	<CardHeader class="px-0 pt-0">
		<div class="h-auto w-full overflow-hidden rounded-tl-lg rounded-tr-lg border-b border-dotted">
			<img
				src={product.image}
				alt={product.title}
				class="scale-100 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
			/>
		</div>
	</CardHeader>

	<CardContent class="flex flex-1 flex-col gap-2 bg-background px-3 pb-3 text-foreground md:px-6">
		<CardTitle class="lg:text-md line-clamp-3 flex-1 text-sm font-normal sm:line-clamp-2">
			{product.title}
		</CardTitle>

		<div class="flex flex-col items-start justify-between lg:flex-row lg:items-end">
			<h4 class="font-heading text-lg font-semibold md:text-xl">
				{formatPrice(product.price, product.currency)}
			</h4>
			<p class="text-sm text-muted-foreground">{product.stock} in stock</p>
		</div>
	</CardContent>

	{#key inCart}
		<CardFooter class="px-3 md:px-6">
			<div class="flex w-full justify-center gap-3">
				{#if inCart}
					<ProductCardCounter {product} />
				{/if}

				<div
					class={cn({
						'w-full': !inCart,
						'sm:w-full': inCart
					})}
				>
					<AddToCartButton {product} />
				</div>
			</div>
		</CardFooter>
	{/key}
</Card>
