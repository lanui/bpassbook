export const APP_ROLE = 'app'
export const navs = [
  {
    path: "/wallet",
    name: "",
    i18n: "wallet.index",
    text: "钱包",
    icon: 'mdi-shield-key-outline',
    roles: [
      'app', 'p3'
    ]
  },
  {
    path: "/passbook",
    name: "passbook",
    i18n: "passbook.index",
    text: "密码本",
    icon:'mdi-wallet-giftcard',
    roles: [
      'app', 'p3'
    ]
  },
  {
    path: "/wallet/buybts",
    name: "wallet.buybts",
    i18n: "wallet.buybts",
    text: "购买钻石",
    icon: 'mdi-diamond-stone',
    roles: [
      'p3'
    ]
  },
  {
    path: "/importor",
    name: "importor",
    i18n: "importor.index",
    text: "导入账户",
    icon: 'mdi-content-duplicate',
    roles: [
      'p3'
    ]
  },
  {
    path: "/exportor",
    name: "exportor",
    i18n: "exportor.index",
    text: "导出账户",
    icon: 'mdi-export',
    roles: [
      'p3'
    ]
  },
  {
    path: "/options",
    name: "settings",
    i18n: "passbook.index",
    text: "设置",
    icon: 'mdi-cog',
    roles: [
      'p3'
    ]
  }
]

export const appnavs = navs.filter(nav => nav.roles && nav.roles.includes(APP_ROLE))

export const popupnavs = [
  ...navs,

]


