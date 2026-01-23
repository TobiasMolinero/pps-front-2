<script lang="ts">
    let { children } = $props();
</script>

<div class="auth-layout">
    {@render children()}
</div>

<style>
    .auth-layout {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: var(--text-white);
    }
</style>