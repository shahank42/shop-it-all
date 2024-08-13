<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "";
  export { className as class };
</script>

<div class={cn("text-left", className)}>
  <slot />
</div>
