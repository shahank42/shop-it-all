<script lang="ts">
	import { ShoppingCartIcon, StoreIcon } from 'lucide-svelte';
	import { cart } from '$lib/stores/cartStore';
	import { cn } from '$lib/utils';
	import { buttonVariants } from './ui/button';
	import ModeToggle from './mode-toggle.svelte';
</script>

<div class="sticky top-0 z-50">
	<header
		class="flex h-14 items-center justify-between border-b border-dotted bg-background px-4 md:px-6"
	>
		<a href="/" class="flex items-center gap-3">
			<StoreIcon class="size-6" />
			<span class="font-heading text-xl font-semibold">ShopItAll</span>
		</a>

		<nav class="flex gap-4 sm:gap-6">
			<ModeToggle />
			<a href="/cart" class={cn(buttonVariants({ variant: 'default' }), 'flex gap-2 font-body')}>
				<ShoppingCartIcon /> <strong>({$cart.items.length})</strong>
			</a>
		</nav>
	</header>
</div>
