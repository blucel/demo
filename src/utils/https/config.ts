/*
 * @Description:
 * @Autor: ChangJun
 * @Date: 2021-10-26 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-28 15:59:06
 */
import { AxiosRequestConfig } from "axios";
import { excludeProps } from "./utils";
import { useGlobSetting } from "../../utils/env";
const globSetting = useGlobSetting();
console.log('template: globSetting', globSetting);
/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: globSetting.apiUrl,
  //10秒超时
  timeout: 5000000,
  headers: {
    // Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
    // "X-Requested-With": "XMLHttpRequest",
  },
};

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig;
  }
  const { headers } = config;

  if (headers && typeof headers === "object") {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers,
    };
  }
  return { ...excludeProps(config!, "headers"), ...defaultConfig };
}

export const METHODS = ["post", "get", "put", "delete", "option", "patch"];
