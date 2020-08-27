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
          icon: 'mdi-shield-key-outline',
          i18n:''
        }
      },
      {
        path: "wallet",
        alias: "/wallet/index",
        name: "wallet.index",
        component: WalletIndex,
        meta:{
          icon: 'mdi-wallet-giftcard',
          i18n: ''
        }
      }
    ]
  },
]
