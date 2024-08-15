<script lang="ts">
	import CartCard from '$lib/components/cart-card/cart-card.svelte';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { cart } from '$lib/stores/cartStore';
	import { formatPrice } from '$lib/utils';
	import { ChevronRight } from 'lucide-svelte';
	import CartDetails from './cart-details.svelte';
</script>

<section class="w-full bg-background py-8 text-foreground md:py-12">
	<MaxWidthWrapper class="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
		<div class="flex flex-col gap-6">
			<h1 class="text-3xl font-semibold">My Cart</h1>
			<div class="flex flex-col gap-3">
				{#each $cart.items as item}
					<CartCard {item} />
				{/each}
			</div>
		</div>

		<CartDetails />
	</MaxWidthWrapper>
</section>
