<script lang="ts">
    import { Header, Sidebar } from "@components/ui";
    let { children } = $props() 

</script>

<div class="app-layout">
    <Header />
    <Sidebar />
    <main>
        {@render children()}
    </main>
</div>

<style>
    .app-layout {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 220px 1fr;
        grid-template-areas:
            "header header"
            "sidenav main";
        height: 100vh; /* para ocupar toda la altura de la pantalla */
    }

    main {
        grid-area: main;
    }
</style>