import AddorIndex from '@/bpaddor/views/Index.vue';
import AddorAddItem from '@/bpaddor/views/AddItem.vue';

const routes = [
  {
    path: '/',
    alias: '/index',
    component: AddorIndex,
  },
  {
    path: '/addItem',
    name: 'addItem',
    component: AddorAddItem,
  },
];

export default routes;
