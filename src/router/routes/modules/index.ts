/*
 * @Description: 
 * @Autor: chengq
 * @Date: 2022-03-16 09:53:17
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-08-24 14:58:04
 */
import type { AppRouteModule } from "../../types";
const LAYOUT = () => import("../../../views/layout/index.vue");

const home: AppRouteModule = {
  // path: '/license',
  // name: 'license',
  // component: LAYOUT,
  // meta: {
  //   title: 'license管理1',
  //   id: 1,
  // },
  // redirect: '/license/management',
  // children: [
  //   {
  //     path: 'management',
  //     name: 'management',
  //     meta: {
  //       title: 'license管理ww',
  //       id: 2,
  //     },
  //     component: () => import('../../../views/license/Management.vue'),
  //   },

  //   {
  //     path: 'pm',
  //     name: 'ProductManagement',
  //     meta: {
  //       title: '产品管理',
  //       id: 3,
  //     },
  //     component: () => import('../../../views/license/ProductManagement.vue'),
  //   }
  // ],
};

export default home;
