<script>
	import CardBody from './CardBody.svelte';
	import CardIcon from './CardIcon.svelte';
</script>

<div class="h-full">
	<div class="group relative h-full border border-dashed border-zinc-400 dark:border-zinc-700">
		<CardIcon class="-left-3 -top-3" />
		<CardIcon class="-right-3 -top-3" />
		<CardIcon class="-bottom-3 -left-3" />
		<CardIcon class="-bottom-3 -right-3" />
		<div class="flex h-full flex-col justify-between">
			<slot />
		</div>
	</div>
</div>
