<script lang="ts">
	import { Github, ShoppingCartIcon, StoreIcon } from 'lucide-svelte';
	import { cart } from '$lib/stores/cartStore';
	import { cn } from '$lib/utils';
	import { Button, buttonVariants } from './ui/button';
	import ModeToggle from './mode-toggle.svelte';
	import type { User } from 'lucia';
	import { enhance } from '$app/forms';

	const {
		user
	}: {
		user: User | null;
	} = $props();
</script>

<div class="sticky top-0 z-50">
	<header
		class="flex h-14 items-center justify-between border-b border-dotted bg-background px-2 md:px-6"
	>
		<a href="/" class="flex items-center gap-3">
			<StoreIcon class="size-6" />
			<span class="font-heading text-xl font-semibold">ShopItAll</span>
		</a>

		<nav class="flex justify-between gap-3">
			<ModeToggle />

			<a href="/cart" class={cn(buttonVariants({ variant: 'default' }), 'flex gap-2 font-body')}>
				<ShoppingCartIcon /> <strong>({$cart.items ? $cart.items.length : 0})</strong>
			</a>

			{#if user}
				<form method="post" action="/?/logout" use:enhance>
					<Button type="submit" variant="outline">Logout</Button>
				</form>
			{:else}
				<a
					href="/login/github"
					class={cn(buttonVariants({ variant: 'outline' }), 'flex gap-2 font-body')}
				>
					<Github /> Login
				</a>
			{/if}
		</nav>
	</header>
</div>
