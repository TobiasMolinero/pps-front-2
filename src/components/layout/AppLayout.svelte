<script lang="ts">
    import { Header, Sidebar } from "@components/ui";

    let { children } = $props() 
</script>

<div class="app-layout">
    <Header />
    <div class="body-app">
        <Sidebar />
        <main>
            {@render children()}
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