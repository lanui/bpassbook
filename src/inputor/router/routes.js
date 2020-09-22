import InputorIndex from '@/inputor/views/Index.vue';
import InputorAddPassbook from '@/inputor/views/AddPassbook.vue';

const routes = [
  {
    path: '/',
    alias: '/index',
    component: InputorAddPassbook,
  },
  // {
  //   path: '/',
  //   alias: '/index',
  //   component: InputorIndex,
  // },
  {
    path: '/addPassbook',
    component: InputorAddPassbook,
  },
];

export default routes;
