import MainLayout from '@app/views/layouts/AppMainLayout.vue'
import AppIndex from '@app/views/Home/Index.vue'
import PassbookIndex from '@app/views/Passbook/Index.vue'
import WalletIndex from '@app/views/Wallet/Index.vue'
import OptionsIndex from '@app/views/Options/Index.vue'

export const commroutes = [
  {
    path: "/",
    component: MainLayout,
    children:[
      {
        path: "index",
        alias: "/",
        name: "home.index",
        component: AppIndex,
        meta: {
          auth:true,
          sort: 1,
          icon: 'mdi-shield-key-outline',
          i18n: 'home',
          text: '密码本'
        },
      }
    ]
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "passbook",
        alias: "/passbook/index",
        name: "passbook.index",
        component: PassbookIndex,
        meta:{
          auth: true,
          sort: 1,
          icon: 'mdi-shield-key-outline',
          i18n:'passbook.index',
          text:'密码本'
        },
      },
      {
        path: "wallet",
        alias: "/wallet/index",
        name: "wallet.index",
        component: WalletIndex,
        meta:{
          auth: true,
          sort: 2,
          icon: 'mdi-wallet-giftcard',
          i18n: 'wallet.index',
          text: '钱包'
        }
      },
      {
        path: "index",
        alias: "/options/index",
        name: "options.index",
        component: OptionsIndex,
        meta: {
          auth: true,
          sort: 3,
          icon: 'mdi-cog-outline',
          i18n: 'options.index',
          text: '钱包'
        }
      }
    ],
    meta:{
      auth: true,
      i18n:'home',
      text:'首页',
      icon:''
    }
  },
]
