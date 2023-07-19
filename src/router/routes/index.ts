/*
 * @Description: 路由汇总
 * @Autor: ChangJun
 * @Date: 2021-11-23 16:00:25
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-11-03 16:37:41
 */
import type { AppRouteRecordRaw, AppRouteModule } from "../../router/types";
import { RouteRecordRaw } from "vue-router";
const modules = import.meta.globEager("./modules/**/*.ts");
const LAYOUT = () => import("@/views/layout/index.vue");
import { PAGE_NOT_FOUND_ROUTE } from './basic';

// 引入 modules 中所有的模块
const routeModuleList: AppRouteModule[] = [];

// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   routeModuleList.push(...modList);
// });

export const asyncRoutes = [...routeModuleList];

const RootRoute: Array<RouteRecordRaw> = []

export const ErrorRoute: AppRouteRecordRaw = {
  path: "/404",
  name: "404",
  component: () => import("../../views/error/404.vue"),
  meta: {
    title: "404",
  },
};


export const ServerErrorRoute: AppRouteRecordRaw = {
  path: "/502",
  name: "502",
  component: () => import("../../views/error/502.vue"),
  meta: {
    title: "502",
  },
};

// Basic routing without permission
export const basicRoutes = [
  ErrorRoute,
  PAGE_NOT_FOUND_ROUTE,
  ServerErrorRoute,
  ...RootRoute,
];
