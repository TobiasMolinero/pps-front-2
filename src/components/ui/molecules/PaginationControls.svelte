<script lang="ts">
    import { Button, Tooltip } from "../atoms";
    import iconCaretLineRight from "@assets/icons/caret-line-right-bold.svg";
    import iconCaretLineLeft from "@assets/icons/caret-line-left-bold.svg";
    import iconCaretRight from "@assets/icons/caret-right-bold.svg";
    import iconCaretLeft from "@assets/icons/caret-left-bold.svg";

    interface Props {
        currentPage: number;
        totalPages: number;
        onClick: (page: number) => void;
    }

    let { totalPages = 10, currentPage, onClick }: Props = $props();
    let visiblePages: (number | string)[] = $state([]);

    let actualPage: number = $derived(currentPage);

    const prevPage = () => {
        if (actualPage > 1) actualPage--;
        onClick(actualPage);
    };

    const nextPage = () => {
        if (actualPage < totalPages) actualPage++;
        onClick(actualPage);
    };

    const firstPage = () => {
        actualPage = 1;
        onClick(actualPage);
    };

    const lastPage = () => {
        actualPage = totalPages;
        onClick(actualPage);
    };

    const selectPage = (selectedPage: number) => {
        actualPage = selectedPage;
        onClick(actualPage);
    };


    $effect(() => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Menos de 7 páginas: mostrar todas
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Siempre mostrar primera y última
            pages.push(1);

            if (actualPage <= 4) {
                // Estamos al inicio
                pages.push(2,3,4,5);
                pages.push('...');
            } else if (actualPage >= totalPages - 3) {
                // Estamos al final
                pages.push('...');
                pages.push(totalPages-4, totalPages-3, totalPages-2, totalPages-1);
            } else {
                // Página central
                pages.push('...');
                pages.push(actualPage-1, actualPage, actualPage+1);
                pages.push('...');
            }

            pages.push(totalPages);
        }

        visiblePages = pages;
    });
</script>

<div class="paginator">
    <Tooltip position="top" label="Ir a primera página">
        <button class="caret-button" onclick={firstPage} disabled={actualPage === 1}>
            <img src={iconCaretLineLeft} alt="Ir a primera página" />
        </button>
    </Tooltip>
    <Tooltip position="top" label="Página anterior">
        <button class="caret-button" onclick={prevPage} disabled={actualPage === 1}>
            <img src={iconCaretLeft} alt="Página anterior" />
        </button>
    </Tooltip>

    <div class="pages">
        {#each visiblePages as page}
                <Button
                    variant={page === actualPage ? "primary" : "secondary"}
                    disabled={page === '...' || page === actualPage}
                    onclick={() => selectPage(page as number)}
                >
                    {#snippet label()}
                        {page}
                    {/snippet}
                </Button>
        {/each}
    </div>

    <Tooltip position="top" label="Página siguiente">
        <button class="caret-button" onclick={nextPage} disabled={actualPage === totalPages}>
            <img src={iconCaretRight} alt="Página siguiente" />
        </button>
    </Tooltip>
    <Tooltip position="top" label="Ir a última página">
        <button class="caret-button" onclick={lastPage} disabled={actualPage === totalPages}>
            <img src={iconCaretLineRight} alt="Ir a última página" />
        </button>
    </Tooltip>
</div>

<style>
    .paginator {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--space-2);
        padding: var(--space-2);
        background-color: white;
        border-top: 1px solid var(--color-slate-800);
    }

    .caret-button {
        display: grid;
        place-items: center;
        border: none;
        background: none;
        cursor: pointer;
    }
    .caret-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .caret-button img {
        width: 20px;
        height: 20px;
        opacity: 0.9;
    }

    .pages {
        display: flex;
        justify-content: center;
        column-gap: 0.25rem;
        min-width: 17.5rem;
    }
</style>
