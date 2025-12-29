<script lang="ts">
  import type { Snippet } from "svelte";
  import type { TextAlign } from "@lib/interfaces/modal";
  
  interface Props {
    level: 1 | 2 | 3 | 4 | 5 | 6
    textAlign: TextAlign
    children: Snippet
  }
  
  let {
    level,
    children,
    textAlign = 'text-start'
  }: Props = $props();
</script>

{#if level === 1}
  <h1 class={textAlign}>{@render children()}</h1>
{:else if level === 2}
  <h2 class={textAlign}>{@render children()}</h2>
{:else if level === 3}
  <h3 class={textAlign}>{@render children()}</h3>
{:else if level === 4}
  <h4 class={textAlign}>{@render children()}</h4>
{:else if level === 5}
  <h5 class={textAlign}>{@render children()}</h5>
{:else}
  <h6 class={textAlign}>{@render children()}</h6>
{/if}

<style>
  .text-start {
    text-align: start;
  }

  .text-center {
    text-align: center;
  }
  
  .text-end {
    text-align: end;
  }
</style>