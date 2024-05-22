import {RouteRecordRaw} from "vue-router";
import SettingsPage from "../pages/SettingsPage.vue";
import OrderBookPage from "../pages/OrderBookPage.vue";
import HomePage from "../pages/HomePage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
  {
    path: '/orderBook',
    name: 'OrderBook',
    component: OrderBookPage,
  }
]
