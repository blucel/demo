/*
 * @Description: 网络配置接口
 * @Author: tqh
 * @Date: 2023-7-14 09:30:00
 */

import { http } from "@/utils/https";
/**
 * @description: 编辑
 */
export const edit = (params) => {
  return http.post("/networkInterfaceCardConfig/edit", params);
};
/**
 * @description: 列表
 */
export const list = (data) => {
  return http.get("/networkInterfaceCardConfig/listPage", data);
};
/**
 * @description: 开启/禁用网卡
 */
 export const onoff = (params) => {
  return http.post("/networkInterfaceCardConfig/onoff", params);
};
/**
 * @description: 设置dns
 */
 export const setDns = (params) => {
  return http.post("/networkInterfaceCardConfig/setDns", params);
};