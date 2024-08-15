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
			increment?: (value: number) => void | undefined;
			decrement?: (value: number) => void | undefined;
			input?: (value: number) => void | undefined;
		};
		min?: number;
		max?: number;
	} = $props();

	let count = $state(value);
</script>

<div class="flex">
	<Button
		size="icon"
		class="border"
		on:click={() => {
			if (!min || count > min) count--;
			// onValueChange && onValueChange('decrement', count);
			counterActions && counterActions.decrement && counterActions.decrement(count);
		}}
		disabled={!!min && count <= min}
	>
		<MinusIcon />
	</Button>

	<Input
		type="number"
		id="quantity"
		class="w-14 border-l-0 border-r-0 text-center font-heading [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		bind:value={count}
		on:change={(e) => {
			if (max && count > max) count = max;
			if (min && count < min) count = min;
			// onValueChange && onValueChange('input', count);
			counterActions && counterActions.input && counterActions.input(count);
		}}
	/>

	<Button
		size="icon"
		class="border"
		on:click={() => {
			if (!max || count < max) count++;
			// onValueChange && onValueChange('increment', count);
			counterActions && counterActions.increment && counterActions.increment(count);
		}}
		disabled={!!max && count >= max}
	>
		<PlusIcon />
	</Button>
</div>
