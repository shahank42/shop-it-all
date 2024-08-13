<script lang="ts">
	import { ShoppingCartIcon, StoreIcon } from 'lucide-svelte';
	import { cart } from '$lib/stores/cartStore';
	import { cn } from '$lib/utils';
	import { buttonVariants } from './ui/button';
</script>

<div class="sticky top-0 z-50">
	<header class="flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
		<a href="/" class="flex items-center gap-3">
			<StoreIcon class="size-6" />
			<span class="font-heading text-xl font-semibold">ShopIt</span>
		</a>

		<nav class="flex gap-4 sm:gap-6">
			<a href="/cart" class={cn(buttonVariants({ variant: 'default' }), 'flex gap-2 font-body')}>
				<ShoppingCartIcon /> ({$cart.items.length})
			</a>
		</nav>
	</header>
</div>
