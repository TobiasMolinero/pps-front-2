<script lang="ts">
  import Router, { location } from 'svelte-spa-router'
  import { protectedRoutes } from './routes/protectedRoutes'
  import AppLayout from '@components/layout/AppLayout.svelte';
  import AuthLayout from '@components/layout/AuthLayout.svelte';
  import { publicRoutes } from '@routes/publicRoutes';
  import { onMount } from 'svelte';
  import { checkSession } from '@features/auth/utils/checkSession';
  import { isAuthenticated, user } from '@lib/utils/auth';
  import { handleRoutes } from '@lib/utils/handleRoutes';
  
  let isCheckingSession: boolean = $state(true);
  
  onMount(async () => {
    await checkSession();
    isCheckingSession = false;
  })
  
  $effect(() => {
    if(!isCheckingSession) handleRoutes($location, $isAuthenticated, $user?.rol_usuario);
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