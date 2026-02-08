import Home from '../pages/Home.svelte'
import NewSale from '../pages/NewSale.svelte'
import Sales from '../pages/Sales.svelte'
import Products from '../pages/Products.svelte'
import Admin from '../pages/Admin.svelte'
import SaleDetail from '../pages/SaleDetail.svelte'

export const protectedRoutes = {
  '/dashboard': Home,
  '/registrar-venta': NewSale,
  '/editar-venta': NewSale, 
  '/ventas': Sales,
  '/detalle-venta': SaleDetail,
  '/productos': Products,
  '/admin': Admin
}