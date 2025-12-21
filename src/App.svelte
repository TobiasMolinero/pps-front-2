<script lang="ts">
  import Router from 'svelte-spa-router'
  import { protectedRoutes } from './routes/protectedRoutes'
  import AppLayout from '@components/layout/AppLayout.svelte';
</script>

<AppLayout>
  <Router routes={protectedRoutes} />
</AppLayout>