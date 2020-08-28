import MainLayout from '@app/views/layouts/AppMainLayout.vue'
import { commroutes } from '@/commrouter'
import { routes2navs } from '@/commrouter/util'

const appRoutes = [
  ...commroutes
]

export const appnavs = routes2navs(appRoutes)



export default appRoutes
