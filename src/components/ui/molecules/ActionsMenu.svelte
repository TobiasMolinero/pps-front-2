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
  
  /* ===============================
     ESTADO BASE (cerrado)
     =============================== */
  .menu-list {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    display: flex;
    flex-direction: column;
    row-gap: var(--space-1);
    opacity: 0;
    pointer-events: none; /* 👈 evita interacción y remueve del flujo */
    list-style-type: none;
    margin: 0;
    padding: 0;
    z-index: 50;
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }
  
  /* ===============================
     ESTADO ABIERTO
     =============================== */
  .menu-list.open {
    opacity: 1;
    pointer-events: auto; /* 👈 vuelve interactivo */
    transform: translate(-50%, 0);
    z-index: 100;
  }
  
  /* ===============================
     ESTADO CERRANDO (mantiene visible
     solo para permitir la animación)
     =============================== */
  .menu-list.closing {
    opacity: 1;
    pointer-events: none;
    transform: translate(-50%, 0);
    overflow: hidden;
  }
  
  /* ===============================
     ÍTEMS DEL MENÚ
     =============================== */
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
  
  /* Ítems visibles cuando el menú está abierto */
  .menu-item.open {
    scale: 1;
    transition-delay: var(--delay);
  }
  
  .menu-item.open:hover {
    background: var(--color-slate-950);
  }
  
  /* Ítems durante la animación de cierre */
  .menu-list.closing .menu-item {
    scale: 0;
    transition-delay: var(--reverse-delay);
  }
</style>
