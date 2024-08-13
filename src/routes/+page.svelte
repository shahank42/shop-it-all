<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProductCard from '$lib/components/product-card/product-card.svelte';
	import products from '$lib/db.json'
</script>

<section class="w-full py-8 md:py-12 bg-background text-foreground">
	<MaxWidthWrapper class="flex flex-col gap-12">
		<div class="flex flex-col">
			<h1 class="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h1>
			<p class="font-body text-md md:text-lg text-muted-foreground">
				Discover our latest collection of stylish and high-quality products.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</MaxWidthWrapper>
</section>
