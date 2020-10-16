//lauouts
import DefaultLayout from '../layouts/DefaultLayout.vue';
import GuessLayout from '../layouts/GuessLayout.vue';

//Pages
import HomeIndex from '@/popapp/views/Home/Index.vue';
import SignIn from '@/popapp/views/Login/SignIn.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'index',
        alias: '/',
        name: 'homeIndex',
        component: HomeIndex,
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
    component: GuessLayout,
    children: [
      {
        path: 'login',
        name: 'signIn',
        alias: '/sigin',
        component: SignIn,
        meta: {},
      },
    ],
    meta: {},
  },
];

export default routes;
