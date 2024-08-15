<script lang="ts">
	import CartCard from '$lib/components/cart-card/cart-card.svelte';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import { cart } from '$lib/stores/cartStore';
	import { cn } from '$lib/utils';
	import CartDetails from './cart-details.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<section class="w-full bg-background py-8 text-foreground md:py-12">
	<MaxWidthWrapper class="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
		<div class="flex flex-col gap-6">
			<div class="flex flex-col">
				<h1 class="text-3xl font-semibold">My Cart</h1>
				<p class="">
					Your cart is empty! Looks like it's time to go <a
						href="/"
						class={cn(buttonVariants({ variant: 'link' }), 'px-0')}
					>
						shopping!
					</a>
				</p>
			</div>
			<div class="flex flex-col gap-3">
				{#each $cart.items as item}
					<CartCard {item} />
				{/each}
			</div>
		</div>

		<CartDetails />
	</MaxWidthWrapper>
</section>
