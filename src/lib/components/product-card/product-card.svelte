<script lang="ts">
	import type { Product } from '$lib/types';
	import CardBody from '../ui/fancy-card/CardBody.svelte';
	import SquareCard from '../ui/fancy-card/SquareCard.svelte';
	import AddToCartButton from './add-to-cart-button.svelte';
	import { formatPrice } from '$lib/utils';
	import { cart } from '$lib/stores/cartStore';

	let { product }: { product: Product } = $props();

</script>

<SquareCard>
	<div class="h-auto w-full overflow-hidden">
		<img
			src={product.image}
			alt={product.title}
			class="scale-100 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
		/>
	</div>
	<CardBody class="bg-background p-4 text-foreground">
		<div class="flex flex-col gap-3">
			<h3 class="line-clamp-2 font-heading text-md md:text-lg leading-5">{product.title}</h3>

			<div class="flex items-end justify-between">
				<h4 class="font-heading text-xl md:text-2xl font-semibold">
					{formatPrice(product.price, product.currency)}
				</h4>
				<AddToCartButton
					{product}
					interacted={$cart.items.filter((item) => item.id === product.id).length > 0}
				/>
			</div>
		</div>
	</CardBody>
</SquareCard>
