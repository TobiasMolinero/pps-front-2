<script lang="ts">
    import { Header, Sidebar } from "@components/ui";
    import { user } from "@lib/utils/auth";
    import { handleRoutes } from "@lib/utils/handleRoutes";
    import { location } from 'svelte-spa-router';

    let { children } = $props();

    let loadingScreen = $state(false);

    const handleLoadingScreen = async () => {
        loadingScreen = true;
        await handleRoutes($location, $user?.rol_usuario)
        loadingScreen = false;
    }

    $effect(() => {
        if ($location) {
            handleLoadingScreen();
        };
    });
</script>

<div class="app-layout">
    <Header />
    <div class="body-app">
        <Sidebar />
        <main>
            {#if !loadingScreen}
                {@render children()}
            {/if}
        </main>
    </div>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }

    .body-app {
        display: flex;
        flex: 1;
        min-height: 0;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
    }
</style>
