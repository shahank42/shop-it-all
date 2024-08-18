<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
	import { Skeleton } from '../ui/skeleton';
</script>

<Card>
	<CardHeader class="px-0 pt-0">
		<div
			class="h-auto w-full overflow-hidden rounded-none rounded-tl-lg rounded-tr-lg border-b border-dotted"
		>
			<Skeleton class="aspect-[77/100] scale-105" />
		</div>
	</CardHeader>

	<CardContent class="flex flex-1 flex-col gap-2 bg-background px-3 pb-3 text-foreground md:px-6">
		<CardTitle class="lg:text-md line-clamp-3 flex-1 text-sm font-normal sm:line-clamp-2">
			<Skeleton class="h-[20px] w-full" />
			<Skeleton class="my-0.5 h-[20px] w-3/4" />
		</CardTitle>

		<div class="flex flex-col gap-2 items-start justify-between lg:flex-row lg:items-end">
			<div class="font-heading text-lg font-semibold md:text-xl">
				<Skeleton class="h-[28px] w-[100px]" />
			</div>
			<div class="text-sm text-muted-foreground">
				<Skeleton class="h-[20px] w-[64px]" />
			</div>
		</div>
	</CardContent>

	<CardFooter class="px-3 md:px-6">
		<div class="flex w-full justify-center gap-3">
			<Skeleton class="h-[40px] w-full" />
		</div>
	</CardFooter>
</Card>
