import Welcome from '@/popup/views/Login/Welcome';
import MainLayout from '@/popup/layouts/MainLayout';
import SingleLayout from '@/popup/layouts/SingleLayout';
import PopupIndex from '@popup/views/Index';
import SignInIndex from '@popup/views/Login/SignIn';
import SignUpIndex from '@popup/views/Login/SignUp';
import WalletIndex from '@popup/views/Wallet/Index';
import OptionsIndex from '@popup/views/Options/Index';
import ImportWallet from '@popup/views/Wallet/ImportWallet';
import ExportWallet from '@/popup/views/Wallet/ExportWallet';
import AddPassBookItem from '@popup/views/PassBook/AddPassItem';
import EditPassBookItem from '@popup/views/PassBook/EditPassItem';

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'index',
        alias: '/',
        component: PopupIndex,
        meta: {
          auth: true,
        },
      },
      {
        path: 'options',
        alias: '/options',
        component: OptionsIndex,
        meta: {
          auth: true,
        },
      },
      {
        path: 'exportor',
        alias: '/exportor',
        component: ExportWallet,
        meta: {
          auth: true,
        },
      },
      {
        path: 'importor',
        alias: '/importor',
        component: ImportWallet,
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: '/passbook',
    component: MainLayout,
    children: [
      {
        path: 'index',
        alias: '/passbook',
        component: PopupIndex,
        meta: {
          auth: true,
        },
      },
      {
        name: 'addPassbook',
        path: 'add',
        component: AddPassBookItem,
        meta: {
          auth: true,
        },
      },
      {
        name: 'editPassbook',
        path: 'edit',
        component: EditPassBookItem,
        meta: {
          auth: true,
        },
      },
    ],
    meta: {
      auth: true,
    },
  },

  {
    path: '/wallet',
    component: MainLayout,
    children: [
      {
        path: 'index',
        component: WalletIndex,
        alias: '/wallet',
        meta: {
          auth: true,
        },
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: '/',
    component: SingleLayout,
    children: [
      {
        path: 'signup',
        alias: '/signup',
        component: SignUpIndex,
      },
      {
        path: 'signin',
        alias: '/signin',
        component: SignInIndex,
      },
      {
        path: 'welcome',
        alias: '/welcome',
        component: Welcome,
      },
    ],
  },
];
