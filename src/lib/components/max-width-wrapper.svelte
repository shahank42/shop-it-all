<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div class={cn('mx-auto w-full max-w-screen-2xl px-3 md:px-10', className)}>
	<slot />
</div>