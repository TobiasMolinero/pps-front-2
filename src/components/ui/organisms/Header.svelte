<script lang="ts">
    import logo from '@assets/images/herramientas.webp';
</script>

<header>
    <div class="logo-container">
        <img src={logo} alt="Logo ToolsManagement">
        <p>ToolsManagement</p>
    </div>
</header>

<style>
    header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-slate-800);
        height: 60px;
        width: 100%;
        padding: 0 var(--space-md)
    }

    .logo-container {
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
    }
    .logo-container > img {
        width: 40px;
        height: 40px;
    }
    .logo-container > p {
        color: var(--text-white);
        font-weight: var(--font-weight-semibold);
    }
</style>