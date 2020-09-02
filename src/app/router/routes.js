import { commroutes } from '@/commrouter'
import { routes2navs } from '@/commrouter/util'

import NullLayout from '@/widgets/NullLayout'
import CreateLayout from '@app/views/Accounts/CreateLayout.vue'
import CreateAccIndex from '@app/views/Accounts/CreateIndex.vue'
import Welcome from '@app/views/Welcome.vue'
import AppPrivacyPolicy from '@app/views/Accounts/PrivacyPolicy.vue'

const appRoutes = [
  {
    path: "/init",
    component: NullLayout,
    navhide: true,
    children:[
      {
        path: 'welcome',
        alias:'/initialize',
        component: Welcome,
        meta:{
        }
      },
      {
        path:'privacy',
        component: AppPrivacyPolicy,
        meta: {
        }
      }
    ],
    meta: {
    }
  },
  {
    path:"/creator",
    component: CreateLayout,
    navhide:true,
    children:[
      {
        path:"index",
        component: CreateAccIndex,
      }
    ],
    meta:{
    }
  },
  ...commroutes
]

export const appnavs = routes2navs(appRoutes)



export default appRoutes
