export const APP_ROLE = 'app';

import iconPassbook from '@/assets/icons/icon-passbook.png';
import iconWallet from '@/assets/icons/icon-wallet.png';
import iconExport from '@/assets/icons/icon-ex.png';
import iconImport from '@/assets/icons/icon-im.png';
import iconOptions from '@/assets/icons/icon-options.png';

export const navs = [
  {
    path: '/passbook',
    name: 'passbook',
    i18n: 'passbook.index',
    text: '密码本',
    icon: 'mdi-wallet-giftcard',
    iconImg: iconPassbook,
    roles: ['app', 'p3'],
  },
  {
    path: '/wallet',
    name: '',
    i18n: 'wallet.index',
    text: '钱包',
    icon: 'mdi-shield-key-outline',
    iconImg: iconWallet,
    roles: ['app', 'p3'],
  },
  // {
  //   path: '/importor',
  //   name: 'importor',
  //   i18n: 'importor.index',
  //   text: '导入账户',
  //   icon: 'mdi-content-duplicate',
  //   iconImg: iconImport,
  //   roles: ['p3'],
  // },
  {
    path: '/exportor',
    name: 'exportor',
    i18n: 'exportor.index',
    text: '导出账户',
    icon: 'mdi-export',
    iconImg: iconExport,
    roles: ['p3'],
  },
  {
    path: '/options',
    name: 'settings',
    i18n: 'passbook.index',
    text: '设置',
    icon: 'mdi-cog',
    iconImg: iconOptions,
    roles: ['p3'],
  },
];

export const appnavs = navs.filter((nav) => nav.roles && nav.roles.includes(APP_ROLE));

export const popupnavs = [...navs];
