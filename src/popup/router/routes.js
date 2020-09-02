
import MainLayout from '@/popup/layouts/MainLayout'
import SingleLayout from '@/popup/layouts/SingleLayout'
import PopupIndex from '@popup/views/Index';
import SignInIndex from '@popup/views/Login/SignIn'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path:'index',
        alias:'/',
        component:PopupIndex,
        meta: {
          auth: true
        }
      }
    ],
    meta:{
      auth:true
    }
  },
  {
    path: "/",
    component: SingleLayout,
    children: [
      {
        path: 'signin',
        alias: '/signin',
        component: SignInIndex
      }
    ]
  },
];
