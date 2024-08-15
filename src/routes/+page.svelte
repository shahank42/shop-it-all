<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProductCard from '$lib/components/product-card/product-card.svelte';
	import { products } from '$lib/db.json';

	const { data } = $props();
</script>

<section class="w-full bg-background py-8 text-foreground md:py-12">
	<MaxWidthWrapper class="flex flex-col gap-12">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold tracking-tight md:text-4xl">Fresh fits just for you!</h1>
			<p class="text-md font-body text-muted-foreground md:text-lg">
				Discover our latest collection of stylish and high-quality products.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</MaxWidthWrapper>
</section>
