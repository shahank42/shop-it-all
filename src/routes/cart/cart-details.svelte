<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cart } from '$lib/stores/cartStore';
	import type { Cart, CartItem, Discount } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { ChevronRight, X } from 'lucide-svelte';

	let userDiscountCode = $state($cart.discount?.code);
	// $cart.items.forEach((item) => console.table(item));
	console.log($cart);

	const getCartSubtotal = (items: CartItem[]) => {
		let subTotal = 0;
		for (const item of items) subTotal += item.price * item.quantity;
		return subTotal;
	};

	const applyCartDiscount = (subTotal: number, discount: Discount) => {
		if (discount) {
			switch (discount.type) {
				case 'flat':
					return Math.max(0, subTotal - discount.value);
				case 'percentage':
					return subTotal - (subTotal * discount.value) / 100;
			}
		} else {
			return subTotal;
		}
	};

	let subTotal = $state(getCartSubtotal($cart.items));
	let total = $derived(subTotal);
</script>

<Card class="h-fit">
	<CardHeader>
		<CardTitle class="font-heading text-xl">Summary</CardTitle>
	</CardHeader>

	<CardContent class="flex flex-col gap-6">
		<div class="flex flex-col gap-1">
			<div class="flex w-full items-center justify-between">
				<span class="text-md font-heading">Subtotal:</span>
				<span class="text-md font-heading font-bold">{formatPrice($cart.subTotal, 'INR')}</span>
			</div>

			<div class="flex w-full items-center justify-between">
				<span class="text-md font-heading">Discount:</span>
				<span class="text-md font-heading font-bold">
					{formatPrice($cart.discount ? $cart.total - $cart.subTotal : 0, 'INR')}
				</span>
			</div>
		</div>

		<div class="flex w-full items-center justify-between">
			<span class="text-md font-heading">Total:</span>
			<span class="text-md font-heading font-bold">{formatPrice($cart.total, 'INR')}</span>
		</div>

		{#if $cart.discount}
			{#key $cart.discount}
				<div role="alert" class="flex rounded-md border bg-secondary text-secondary-foreground">
					<div class="flex-1 p-4">
						<strong class="block font-body font-semibold">{$cart.discount?.code}</strong>
						<p class="mt-1 font-body text-sm">{$cart.discount?.description}</p>
					</div>

					<div class="p-2">
						<Button
							class="size-fit p-1"
							size="icon"
							variant="ghost"
							on:click={() => {
								cart.removeDiscount();
								// total = subTotal;
								userDiscountCode = '';
							}}
						>
							<span class="sr-only">Remove Discount</span>
							<X class="size-4" />
						</Button>
					</div>
				</div>
			{/key}
		{:else}
			<!-- TODO: turn this into a proper form -->
			<div class="flex flex-col gap-2">
				<Label for="discount-code" class="font-heading">Discount Code</Label>
				<div class="flex gap-2">
					<Input
						type="text"
						id="discount-code"
						placeholder="Enter discount code"
						class="font-body"
						bind:value={userDiscountCode}
					/>
					<Button
						class="font-body"
						on:click={() => {
							cart.setDiscount(userDiscountCode || '');
						}}
					>
						Apply
					</Button>
				</div>
			</div>
		{/if}
	</CardContent>

	<CardFooter>
		<Button
			class="flex w-full gap-2 rounded-md font-body transition-all duration-500 ease-in-out hover:gap-3"
			size="lg"
		>
			Proceed to Checkout <ChevronRight />
		</Button>
	</CardFooter>
</Card>
