/*
 * @Description:
 * @Autor: ChangJun
 * @Date: 2021-10-28 15:02:31
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-15 11:14:49
 */

/**
 * @description: 去除多余props
 * @param {*} origin
 * @param {*} prop
 * @return {*}
 * @author: xiezhongbin
 */
import { EnclosureHttpRequestConfig } from "./types.d";
export function excludeProps<T extends { [key: string]: any }>(
  origin: T,
  prop: string
): { [key: string]: T } {
  return Object.keys(origin)
    .filter((key) => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key];
      return res;
    }, {} as { [key: string]: T });
}

export function transformConfigByMethod(
  params: any,
  config: EnclosureHttpRequestConfig
): EnclosureHttpRequestConfig {
  const { method } = config;
  const props = ["delete", "get", "head", "options"].includes(
    method!.toLocaleLowerCase()
  )
    ? "params"
    : "data";
  return {
    ...config,
    [props]: params,
  };
}


function getUrlQuery(url) {
  if (url.indexOf("?") != -1){
    const result = {}
    let str = url.substr(1);
    const strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      result[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
    return result;
  }
  return {}
  
}

export const addQueryToUrl = function (param, url) {
  if (!url) return ''
  if (!param || !Object.keys(param).length) return url
  let _url = url
  if (url.indexOf('?') > -1) {
    param = Object.assign(
      {},
      {
        ...param,
        ...getUrlQuery(url)
      }
    )
    _url = url.split('?')[0]
  }
  let result = '?'
  for (const key in param) {
    if (param[key] !== undefined && param[key] !== null) {
      result += `${key}=${param[key]}&`
    }
  }
  return `${_url}${result.slice(0, -1)}`
}
