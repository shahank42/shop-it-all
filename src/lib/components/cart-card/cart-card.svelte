<script lang="ts">
	import type { CartItem } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { Trash2Icon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Card, CardContent } from '../ui/card';
	import { cart } from '$lib/stores/cartStore';
	import Counter from './counter.svelte';

	let { item }: { item: CartItem } = $props();
</script>

<Card class="flex h-44 md:h-48">
	<div class="h-full w-auto shrink-0 overflow-hidden">
		<img src={item.image} alt={item.title} class="h-full object-cover" />
	</div>

	<CardContent class="flex h-full w-full flex-col justify-between py-6">
		<div class="flex flex-col">
			<h3 class="text-md line-clamp-2 font-heading leading-5 md:text-lg">{item.title}</h3>
			<div class="flex items-center justify-between">
				<h4 class="text-md font-heading font-semibold md:text-lg">
					{formatPrice(item.price * item.quantity, item.currency)}
				</h4>
				<p class="text-sm font-bold">{item.stock} in stock</p>
			</div>
		</div>

		<div class="flex w-full items-center justify-between">
			<Counter
				min={1}
				max={item.stock}
				value={item.quantity}
				counterActions={{
					increment: () => cart.addItem(item),
					decrement: () => cart.removeItem(item.id),
					input: (value) => cart.setQuantityOf(item.id, value)
				}}
			/>

			<Button
				variant="destructive"
				size="icon"
				on:click={() => {
					cart.deleteItem(item.id);
				}}
			>
				<Trash2Icon />
			</Button>
		</div>
	</CardContent>
</Card>
