import Home from '../pages/Home.svelte'
import NewSale from '../pages/NewSale.svelte'
import Sales from '../pages/Sales.svelte'
import Products from '../pages/Products.svelte'

export const protectedRoutes = {
  '/': Home,
  '/registrar-venta': NewSale,
  '/ventas': Sales,
  '/productos': Products,
}