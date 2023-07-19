/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 17:50:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 10:17:22
 * @FilePath: /safe-product-authority-browser/src/store/modules/permission.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteRecordRaw, Menu } from "../../router/types";
import { defineStore } from "pinia";
import { basicRoutes, asyncRoutes } from "../../router/routes";
import { store } from "../index";
// import { filter } from "../../utils/helper/treeHelper";
import { filterButtonBackMenu, transformBackMenuToRouter } from '../../router/helper/routerHelper'
import { useUserStore } from '@/store/modules/users'
import { router } from '../../router'

interface PermissionState {
  constantRoutes: AppRouteRecordRaw[];
  asyncMenu: AppRouteRecordRaw[];
  isDynamicAddedRoute: boolean
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 静态路由
    constantRoutes: basicRoutes,
    asyncMenu: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    asyncMenuGetter():Object[] {
      return this.asyncMenu
    },

    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },


    /**
     * @description: 设置动态路由
     * @param {Array} routes - 路由集
     */    
    handleSetAsyncRoutes(routes) {
      this.asyncMenu = routes
    },
    /**
     * @description: 动态路由配置
     */
     async buildRoutesAction(){
      try {
        const userStore = useUserStore();
        const backMenu = await userStore.getDynamicMenuAction()
        const backPageMenu = filterButtonBackMenu(backMenu)
        const frontPageMenu = transformBackMenuToRouter(backPageMenu)
        console.log('frontPageMenu', frontPageMenu)
        let routes: AppRouteRecordRaw[] = frontPageMenu;
        return routes;
      } catch (error) {
        // 如果在加载动态路由的过程中出现错误 跳转到服务器异常
        router.push({ path: '/502' })
      }
     }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
