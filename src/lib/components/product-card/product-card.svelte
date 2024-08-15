<script lang="ts">
	import type { Product } from '$lib/types';
	import CardBody from '../ui/fancy-card/CardBody.svelte';
	import SquareCard from '../ui/fancy-card/SquareCard.svelte';
	import AddToCartButton from './add-to-cart-button.svelte';
	import { cn, formatPrice } from '$lib/utils';
	import { cart } from '$lib/stores/cartStore';
	import Counter from '../cart-card/counter.svelte';

	let { product }: { product: Product } = $props();
	let inCart = $state(false);
	$effect(() => {
		inCart = $cart.items.some((item) => item.id === product.id);
	});
</script>

<SquareCard>
	<div class="h-auto w-full overflow-hidden">
		<img
			src={product.image}
			alt={product.title}
			class="scale-100 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
		/>
	</div>
	<CardBody class="flex flex-col gap-3 bg-background p-4 text-foreground">
		<div class="flex flex-col gap-2">
			<h3 class="text-md line-clamp-2 font-heading md:text-lg">{product.title}</h3>

			<div class="flex items-center justify-between">
				<h4 class="font-heading text-xl font-semibold md:text-2xl">
					{formatPrice(product.price, product.currency)}
				</h4>
				<p class="text-sm font-bold">{product.stock} in stock</p>
			</div>
		</div>

		<div
			class={cn('flex', {
				'justify-end': !inCart,
				'justify-between': inCart
			})}
		>
			{#if inCart}
				<Counter
					min={1}
					max={product.stock}
					value={$cart.items.filter((item) => item.id === product.id)[0].quantity}
					counterActions={{
						increment: () => cart.addItem(product),
						decrement: () => cart.removeItem(product.id),
						input: (value) => cart.setQuantityOf(product.id, value)
					}}
				/>
			{/if}

			<AddToCartButton {product} />
		</div>
	</CardBody>
</SquareCard>
