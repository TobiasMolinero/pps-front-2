<script lang="ts">
    import { Nav } from "../molecules";
</script>

<aside class="sidenav">
    <Nav />
</aside>

<style>
    .sidenav {
        grid-area: sidenav;
        background-color: var(--color-slate-900);
        width: 220px;
        height: 100%;
    }
</style>