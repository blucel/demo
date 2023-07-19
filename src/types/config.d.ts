/*
 * @Description: 通用ts设置
 * @Autor: ChangJun
 * @Date: 2021-10-29 10:57:01
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-08-26 15:23:04
 */

import type { RouteRecordRaw, RouteMeta } from "vue-router";

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_APP_BASE_API: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface cssVar {
  MenuText: string;
  MenuBg: string;
  MenuOpenWidth: string;
  MenuCloseWidth: string;
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = "ROLE",
  // black
  BACK = "BACK",
  // route mapping
  ROUTE_MAPPING = "ROUTE_MAPPING",
}

/**
 * 页面结构
 */
export type layoutMode = "vertical" | "horizontal-left" | "horizontal";

export type theme = "dark" | "light" | "classics";

// menu mode
export enum MenuModeEnum {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  HORIZONTAL_LEFT = "horizontal-left",
}

export enum ThemeEnum {
  DARK = "dark",
  LIGHT = "light",
  CLASSICS = "classics'",
}

// menu theme enum
export interface appSettingInterface {
  title: string;
  menuMode?: layoutMode;
  theme?: theme;
  classics?: string;
  logo?: string;
  HomePath?:string
}
