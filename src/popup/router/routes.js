import PopupIndex from '../views/Index';
import MainLayout from '@/popup/layouts/MainLayout'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path:'index',
        alias:'/',
        component:PopupIndex
      }
    ]
  },
];
