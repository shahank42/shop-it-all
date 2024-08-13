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
</script>

<section class="w-full bg-background py-12 text-foreground">
	<MaxWidthWrapper class="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
		<div class="flex flex-col gap-3">
			{#each $cart.items as item}
				<CartCard {item} />
			{/each}
		</div>

		<Card class="h-fit">
			<CardHeader>
				<CardTitle class="font-heading">Cart Summary</CardTitle>
			</CardHeader>

			<CardContent class="flex flex-col gap-4">
				<div class="flex w-full items-center justify-between">
					<span class="font-heading">Subtotal:</span>
					<span class="font-heading font-bold">{formatPrice($cart.total, 'INR')}</span>
				</div>

				<div class="flex w-full items-center justify-between">
					<span class="font-heading">Discount:</span>
					<span class="font-heading font-bold">{formatPrice(0, 'INR')}</span>
				</div>

				<Separator />

				<div class="flex w-full items-center justify-between">
					<span class="font-heading">Total:</span>
					<span class="font-heading font-bold">{formatPrice($cart.total, 'INR')}</span>
				</div>

				<div class="flex flex-col gap-2">
					<Label for="discount-code" class="font-heading">Discount Code</Label>
					<Input
						type="text"
						id="discount-code"
						placeholder="Enter discount code"
						class="font-body"
					/>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					class="flex w-full gap-2 font-body transition-all duration-500 ease-in-out hover:gap-3"
				>
					Proceed to Checkout <ChevronRight />
				</Button>
			</CardFooter>
		</Card>
	</MaxWidthWrapper>
</section>
