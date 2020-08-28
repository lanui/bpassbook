import MainLayout from '@app/views/layouts/AppMainLayout.vue'
import AppIndex from '@app/views/Home/Index.vue'
import WalletIndex from '@app/views/Wallet/Index.vue'

export const commroutes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "index",
        alias: "/",
        name: "passbook.index",
        component: AppIndex,
        meta:{
          sort: 0,
          icon: 'mdi-shield-key-outline',
          i18n:'passbook.index',
          text:'密码本'
        },
        // children:[
        //   {
        //     path:"sdsf",
        //     name:"sdf",
        //     meta:{
        //       icon: "oodosd"
        //     }
        //   }
        // ]
      },
      {
        path: "wallet",
        alias: "/wallet/index",
        name: "wallet.index",
        component: WalletIndex,
        meta:{
          sort: 1,
          icon: 'mdi-wallet-giftcard',
          i18n: 'wallet.index',
          text: '钱包'
        }
      }
    ],
    meta:{
      i18n:'home',
      text:'首页',
      icon:''
    }
  },
]
