import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import {MenuConfig} from "@/utils/config/menu-config";

let customRoutes = MenuConfig.toRouteRecordRawArray();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: customRoutes
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
