<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { cart } from '$lib/stores/cartStore';
	import { formatPrice } from '$lib/utils';
	import { ChevronRight, X } from 'lucide-svelte';

	let userDiscountCode = $state($cart.discount?.code);
</script>

<Card class="h-fit">
	<CardHeader>
		<CardTitle class="font-heading">Cart Summary</CardTitle>
	</CardHeader>

	<CardContent class="flex flex-col gap-4">
		<div class="flex w-full items-center justify-between">
			<span class="font-heading">Subtotal:</span>
			<span class="font-heading font-bold">{formatPrice($cart.subTotal, 'INR')}</span>
		</div>

		<div class="flex w-full items-center justify-between">
			<span class="font-heading">Discount:</span>
			<span class="font-heading font-bold">
				{formatPrice($cart.discount ? $cart.total - $cart.subTotal : 0, 'INR')}
			</span>
		</div>

		<Separator />

		<div class="flex w-full items-center justify-between">
			<span class="font-heading">Total:</span>
			<span class="font-heading font-bold">{formatPrice($cart.total, 'INR')}</span>
		</div>

		{#if $cart.discount}
			{#key $cart.discount}
				<div role="alert" class="flex border bg-secondary text-secondary-foreground">
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
			class="flex w-full gap-2 font-body transition-all duration-500 ease-in-out hover:gap-3"
			size="lg"
		>
			Proceed to Checkout <ChevronRight />
		</Button>
	</CardFooter>
</Card>
