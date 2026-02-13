import Home from '../pages/Home.svelte'
import NewSale from '../pages/NewSale.svelte'
import Sales from '../pages/Sales.svelte'
import Products from '../pages/Products.svelte'
import Admin from '../pages/Admin.svelte'
import SaleDetail from '../pages/SaleDetail.svelte'
import PersonalProfile from '../pages/PersonalProfile.svelte'
import Notes from '../pages/Notes.svelte'

export const protectedRoutes = {
  '/dashboard': Home,
  '/registrar-venta': NewSale,
  '/editar-venta': NewSale, 
  '/ventas': Sales,
  '/detalle-venta': SaleDetail,
  '/productos': Products,
  '/notas-credito': Notes,
  '/mi-perfil': PersonalProfile,
  '/admin': Admin
}