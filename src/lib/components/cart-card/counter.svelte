<script context="module">
	export type CounterAction = 'increment' | 'decrement' | 'input';
</script>

<script lang="ts">
	import { MinusIcon, PlusIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';

	let {
		value,
		counterActions,
		min,
		max
	}: {
		value: number;
		counterActions?: {
			increment?: (value: number) => void | undefined | Promise<void | undefined>;
			decrement?: (value: number) => void | undefined | Promise<void | undefined>;
			input?: (value: number) => void | undefined | Promise<void | undefined>;
		};
		min?: number;
		max?: number;
	} = $props();

	let count = $state(value);
</script>

<div class="flex items-center gap-1">
	<Button
		size="icon"
		on:click={async () => {
			if (min !== undefined && count > min) count--;
			counterActions && counterActions.decrement && (await counterActions.decrement(count));
		}}
		disabled={!!min && count <= min}
	>
		<MinusIcon class="size-5" />
	</Button>

	<Input
		type="number"
		id="quantity"
		class="w-10 text-center font-heading [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		bind:value={count}
		on:change={async (e) => {
			if (max !== undefined && count > max) count = max;
			if (min !== undefined && count < min) count = min;
			counterActions && counterActions.input && (await counterActions.input(count));
		}}
	/>

	<Button
		size="icon"
		on:click={async () => {
			if (max !== undefined && count < max) count++;
			counterActions && counterActions.increment && (await counterActions.increment(count));
		}}
		disabled={!!max && count >= max}
	>
		<PlusIcon class="size-5" />
	</Button>
</div>
