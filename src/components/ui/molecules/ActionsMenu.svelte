<script lang="ts">
  import Icon from "../atoms/Icon.svelte";
  import { ToggleMenu } from "../atoms";
  import type { Action } from "@lib/interfaces/actionsmenu";
  import { addClickOutsideListener } from "@lib/helpers/clickOutside";
  import Tooltip from "../atoms/Tooltip.svelte";
  import { hideAllTooltips } from "@lib/helpers/tooltipEvents";

  interface Props {
    actions: Action[];
  }

  let { actions = [] }: Props = $props();

  let menuElement: HTMLDivElement;
  let open: boolean = $state(false);
  let closing: boolean = $state(false);

  const toggleMenu = () => {
    if (open) {
      closing = true;

      const totalDuration = 200 + (actions.length - 1) * 30;
      setTimeout(() => {
        open = false;
        closing = false;
      }, totalDuration);
    } else {
      open = true;
    }
  };

  const close = () => {
    hideAllTooltips();
    toggleMenu()
  };

  const handleAction = (action: Action) => {
    action.onClick();
    close();
  };

  $effect(() => {
    if (!open) return;

    const cleanup = addClickOutsideListener(menuElement, close)
    return cleanup;
  });
</script>

<div bind:this={menuElement} class="actions-menu">
  <ToggleMenu onclick={toggleMenu} {open} />

  <ul class="menu-list" class:open class:closing>
    {#each actions as action, i (action.label)}
      <li>
        <Tooltip label={action.label} position="left">
          <button
            type="button"
            class="menu-item"
            class:open
            style="--delay: {(actions.length - i) * 30}ms;  --reverse-delay: {i *
              30}ms;"
            onclick={() => handleAction(action)}
          >
            <Icon src={action.icon} />
          </button>
        </Tooltip>
      </li>
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
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    display: flex;
    flex-direction: column;
    row-gap: var(--space-1);
    opacity: 0;
    height: 0;
    list-style-type: none;
    z-index: -1;
    transition:
      opacity 200ms,
      transform 200ms,
      height 200ms;
  }

  /* abierto */
  .menu-list.open {
    opacity: 1;
    height: fit-content;
    transform: translate(-50%, 0);
    z-index: 10;
  }

  /* cuando se está cerrando → mantiene visible hasta terminar animaciones */
  .menu-list.closing {
    opacity: 1;
    height: fit-content;
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
    box-shadow: var(--shadow-sm);
    scale: 0;
    transition: scale 200ms
  }

  /* Ítems del menú */
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
