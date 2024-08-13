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
	<div class="h-full w-auto overflow-hidden shrink-0">
		<img src={item.image} alt={item.title} class="object-cover h-full" />
	</div>

	<CardContent class="flex h-full w-full flex-col justify-between py-6">
		<div class="flex flex-col">
			<h3 class="line-clamp-2 font-heading text-lg leading-5">{item.title}</h3>
			<h4 class="font-heading text-lg font-semibold">
				{formatPrice(item.price, item.currency)}
			</h4>
		</div>

		<div class="flex w-full items-center justify-between">
			<Counter
				min={1}
				max={5}
				value={item.quantity}
				onValueChange={(action, count) => {
					switch (action) {
						case 'increment':
							cart.addItem(item);
							break;
						case 'decrement':
							cart.removeItem(item.id);
							break;
						case 'input':
							cart.setQuantityOf(item.id, count);
							break;
					}
				}}
			/>

			<Button
				variant="destructive"
				size="icon"
				on:click={() => {
					cart.deleteItem(item.id);
				}}
				><Trash2Icon />
			</Button>
		</div>
	</CardContent>
</Card>
