import MainLayout from '@app/views/layouts/AppMainLayout.vue'
import { commroutes } from '@/commrouter'

const appRoutes = [
  ...commroutes
]

export const appnavs = commroutes.map(route => {
  let nav = Object.assign({}, route)
  delete nav.component
  return nav
})

export default appRoutes
