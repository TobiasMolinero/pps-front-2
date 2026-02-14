<script lang="ts">
  import Router, { location } from 'svelte-spa-router'
  import { protectedRoutes } from './routes/protectedRoutes'
  import AppLayout from '@components/layout/AppLayout.svelte';
  import AuthLayout from '@components/layout/AuthLayout.svelte';
  import { publicRoutes } from '@routes/publicRoutes';
  import { isAuthenticated } from '@lib/utils/auth';
  import { onMount } from 'svelte';
  import { checkSession } from '@features/auth/utils/checkSession';

  const routesWithoutCheckSession = [
    '/reset-password',
    '/forgot-password',
  ]

  onMount(async() => {
    if(routesWithoutCheckSession.includes($location)) return;

    await checkSession();
  })
</script>

{#if $isAuthenticated}
  <AppLayout>
    <Router routes={protectedRoutes} />
  </AppLayout>
{:else}
  <AuthLayout>
    <Router routes={publicRoutes} />
  </AuthLayout>
{/if}