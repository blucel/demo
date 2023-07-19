/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-12 19:15:28
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-11-28 18:59:15
 * @FilePath: /safe-product-authority-browser/src/router/guard/index.ts
 */

import type { Router, RouteRecordRaw } from "vue-router";
import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { getTokenValueCache } from "../../utils/auth/token";
type Recordable<T = any> = Record<string, T>;
import {handleMenuToRoute} from '../../utils/tools'
import { useUserStoreWithOut } from '@/store/modules/users'
import { PAGE_NOT_FOUND_ROUTE } from '../../router/routes/basic';
import { appSetting } from '../../settings/index'


export function createPermissionGuard(router: Router) {
  // 无需登录触发路由
  const permissionStore = usePermissionStoreWithOut();
  // 白名单，无需登录即可跳转
  const whitePathList = ['/login', '/404', '/502'];
  let fresh = true
  router.beforeEach(async (to, from, next) => {
    const routes = await permissionStore.buildRoutesAction() || [];;
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
    permissionStore.setDynamicAddedRoute(true);
    if(fresh){
      fresh = false
      next({
        path: '/system/alarmManage/alarm',
        replace: true,
      });
      return;
    } else {
      next()
    }
  });
}
