<script lang="ts">
  import Icon from "../atoms/Icon.svelte";
  import { ToggleMenu } from "../atoms";
  import type { Action } from "@lib/interfaces/actionsmenu";
  import { addClickOutsideListener } from "@lib/utils/clickOutside";
  import Tooltip from "../atoms/Tooltip.svelte";
  import { hideAllTooltips } from "@lib/utils/tooltipEvents";
  import { findScrollableParent } from "@lib/utils/findScrollableParent";

  interface Props {
    actions: Action[];
  }

  let { actions = [] }: Props = $props();

  let menuElement: HTMLDivElement;
  let open: boolean = $state(false);
  let closing: boolean = $state(false);
  let direction: "up" | "down" = $state("up");

  const toggleMenu = () => {
    if (open) {
      closing = true;

      const totalDuration = 200 + (actions.length - 1) * 30;
      setTimeout(() => {
        open = false;
        closing = false;
      }, totalDuration);
    } else {
      checkMenuDirection();
      open = true;
    }
  };

  const close = () => {
    hideAllTooltips();
    toggleMenu();
  };

  const checkMenuDirection = () => {
    if (!menuElement) return;

    const parent = findScrollableParent(menuElement);
    if (!parent) return;

    const elementOffsetTop = menuElement.offsetTop;
    const parentScroll = parent.scrollTop;
    const parentVisibleHeight = parent.clientHeight;

    const relativeTop = elementOffsetTop - parentScroll;
    const spaceAbove = relativeTop;
    const spaceBelow =
      parentVisibleHeight - (relativeTop + menuElement.offsetHeight);

    const estimatedMenuHeight = actions.length * 50 + 10;

    direction =
      spaceAbove < estimatedMenuHeight && spaceBelow > spaceAbove
        ? "down"
        : "up";
  };

  const handleAction = (action: Action) => {
    action.onClick();
    close();
  };

  $effect(() => {
    if (!open) return;

    const cleanup = addClickOutsideListener(menuElement, close);
    return cleanup;
  });
</script>

<div bind:this={menuElement} class="actions-menu" data-direction={direction}>
  <ToggleMenu onclick={toggleMenu} {open} />

  <ul class="menu-list" class:open class:closing>
    {#each actions as action, i (action.label)}
      {#if action.show}
        <li>
          <Tooltip label={action.label} position="left">
            <button
              type="button"
              class="menu-item"
              class:open
              style="--delay: {(actions.length - i) *
                30}ms;  --reverse-delay: {i * 30}ms;"
              onclick={() => handleAction(action)}
            >
              <Icon src={action.icon} />
            </button>
          </Tooltip>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .actions-menu {
    position: relative;
    display: inline-block;
  }

  .menu-list {
    position: absolute;
    left: 50%;
    display: flex;
    flex-direction: column;
    row-gap: var(--space-1);
    pointer-events: none; /* 👈 evita interacción y remueve del flujo */
    list-style-type: none;
    margin: 0;
    padding: 0;
    z-index: 9999;
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  /* dirección hacia arriba (por defecto) */
  .actions-menu[data-direction="up"] .menu-list {
    bottom: 100%;
    transform: translate(-50%, 0px);
  }

  /* dirección hacia abajo */
  .actions-menu[data-direction="down"] .menu-list {
    top: 100%;
    transform: translateX(-50%) translateY(0px);
    flex-direction: column-reverse; /* cambia el orden */
  }

  /* Estado abierto */
  .actions-menu[data-direction="up"] .menu-list.open {
    pointer-events: auto;
    transform: translate(-50%, 0);
  }

  .menu-list.open {
    pointer-events: auto; /* vuelve interactivo */
    transform: translate(-50%, 0);
  }

  .menu-list.closing {
    pointer-events: none;
    transform: translate(-50%, 0);
  }

  .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    width: 45px;
    height: 45px;
    background: var(--color-slate-800);
    border: none;
    border-radius: var(--radius-xl);
    cursor: pointer;
    box-shadow: 0.5px 1.5px 3px 1px #00000088;
    scale: 0;
    transition: scale 200ms;
  }

  .menu-item.open {
    scale: 1;
    transition-delay: var(--delay);
  }

  .menu-item.open:hover {
    background: var(--color-slate-950);
  }

  .menu-list.closing .menu-item {
    scale: 0;
    transition-delay: var(--reverse-delay);
  }
</style>
