import Home from '../pages/Home.svelte'
import NewSale from '../pages/NewSale.svelte'
import Sales from '../pages/Sales.svelte'
import Products from '../pages/Products.svelte'
import Admin from '../pages/Admin.svelte'

export const protectedRoutes = {
  '/dashboard': Home,
  '/registrar-venta': NewSale,
  '/ventas': Sales,
  '/productos': Products,
  '/admin': Admin
}