import {RouteRecordRaw} from "vue-router";

// TODO сделать обработку возможных ошибок при async import при дальнейших доработках

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/SettingsPage.vue'),
  },
  {
    path: '/orderBook',
    name: 'OrderBook',
    component: () => import('../pages/OrderBookPage.vue'),
  }
]
