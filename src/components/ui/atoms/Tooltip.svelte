<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import { listenHideAllTooltips } from "@lib/helpers/tooltipEvents";

  type Position = "top" | "bottom" | "left" | "right";

  const {
    label,
    position = "top",
    children,
  } = $props<{
    label: string;
    position?: Position;
    children: Snippet;
  }>();

  let tooltipVisible = $state(false);
  let actualPosition: Position = $state(position);

  let tooltipEl: HTMLElement;
  let containerEl: HTMLElement;

  async function adjustPosition() {
    await tick();
    if (!tooltipEl || !containerEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    actualPosition = position;

    if (
      actualPosition === "right" &&
      containerRect.right + tooltipRect.width > vw
    ) {
      actualPosition = "left";
    }
    if (
      actualPosition === "left" &&
      containerRect.left - tooltipRect.width < 0
    ) {
      actualPosition = "right";
    }
    if (
      actualPosition === "top" &&
      containerRect.top - tooltipRect.height < 0
    ) {
      actualPosition = "bottom";
    }
    if (
      actualPosition === "bottom" &&
      containerRect.bottom + tooltipRect.height > vh
    ) {
      actualPosition = "top";
    }
  }

  async function showTooltip() {
    tooltipVisible = true;
    await adjustPosition();
  }

  function hideTooltip() {
    tooltipVisible = false;
  }

  $effect(() => {
    const cleanup = listenHideAllTooltips(() => {
      tooltipVisible = false;
    })

    return cleanup;
  })
</script>

<div
  bind:this={containerEl}
  class="tooltip-container"
  onmouseenter={showTooltip}
  onmouseleave={hideTooltip}
  onmousemove={adjustPosition}
>
  {@render children()}

  <div
    bind:this={tooltipEl}
    class="tooltip-box"
    class:visible={tooltipVisible}
    class:top={actualPosition === "top"}
    class:bottom={actualPosition === "bottom"}
    class:left={actualPosition === "left"}
    class:right={actualPosition === "right"}
  >
    {label}
  </div>
</div>

<style>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }

  .tooltip-box {
    position: absolute;
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    pointer-events: none;
    background: var(--color-slate-900);
    color: var(--text-white);
    padding: 0.4rem 0.6rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 50;
  }

  .tooltip-box.visible {
    opacity: 1;
    transform: scale(1);
  }

  .tooltip-box.top {
    bottom: 100%;
    left: 50%;
    transform-origin: bottom center;
    translate: -50% -4px;
  }

  .tooltip-box.bottom {
    top: 100%;
    left: 50%;
    transform-origin: top center;
    translate: -50% 4px;
  }

  .tooltip-box.left {
    right: 100%;
    top: 50%;
    transform-origin: center right;
    translate: -4px -50%;
  }

  .tooltip-box.right {
    left: 100%;
    top: 50%;
    transform-origin: center left;
    translate: 4px -50%;
  }
</style>
