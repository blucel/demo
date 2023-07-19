/*
 * @Descripttion:
 * @version:
 * @Author: 李佐宁
 * @Date: 2022-07-05 08:31:11
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-08-27 09:17:21
 */
import {
  useRoute,
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'
import { basicRoutes } from "./routes";
import  { App } from 'vue';

export const WHITE_NAME_LIST: string[] = ['Login', '404', '502'];

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
