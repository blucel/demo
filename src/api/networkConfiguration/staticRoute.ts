/*
 * @Description: 路由配置接口
 * @Author: tqh
 * @Date: 2023-7-11 14:50
 */

import { http } from "@/utils/https";
/**
 * @description: 新增
 */
export const add = (params) => {
  return http.post("/routeConfig/add", params);
};
/**
 * @description: 列表
 */
export const list = (data) => {
  return http.get("/routeConfig/listPage", data);
};
/**
 * @description: 接口下拉框
 */
 export const listSelect = (data) => {
  return http.get("/networkInterfaceCardConfig/list", data);
};
/**
 * @description: 路由删除
 */
 export const deleteOne = (params) => {
  return http.post("/routeConfig/delete", params);
};
/**
 * @description: 路由编辑
 */
 export const edit = (params) => {
  return http.post("/routeConfig/edit", params);
};