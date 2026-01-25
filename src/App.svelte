<script lang="ts">
  import Router, { push } from 'svelte-spa-router'
  import { protectedRoutes } from './routes/protectedRoutes'
  import AppLayout from '@components/layout/AppLayout.svelte';
  import AuthLayout from '@components/layout/AuthLayout.svelte';
  import { publicRoutes } from '@routes/publicRoutes';
  import { onMount } from 'svelte';
  import { checkSession } from '@features/auth/utils/checkSession';
  import { isAuthenticated } from '@lib/utils/auth';

  onMount(async () => {
    await checkSession()

    if(window.location.pathname === '/') {
      $isAuthenticated ? push('/') : push('/login');
    }
  })
</script>


{#if $isAuthenticated}
  <AppLayout>
    <Router pre routes={protectedRoutes} />
  </AppLayout>
{:else}
  <AuthLayout>
    <Router routes={publicRoutes} />
  </AuthLayout>
{/if}