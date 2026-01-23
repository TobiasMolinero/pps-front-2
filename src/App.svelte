<script lang="ts">
  import Router from 'svelte-spa-router'
  import { protectedRoutes } from './routes/protectedRoutes'
  import AppLayout from '@components/layout/AppLayout.svelte';
  import AuthLayout from '@components/layout/AuthLayout.svelte';
  import { publicRoutes } from '@routes/publicRoutes';

  let login = false;
</script>

{#if login}
  <AppLayout>
    <Router routes={protectedRoutes} />
  </AppLayout>
{:else}
  <AuthLayout>
    <Router routes={publicRoutes} />
  </AuthLayout>
{/if}