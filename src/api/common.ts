/*
 * @Description: 通用接口
 * @Author: tqh
 * @Date: 2022-9-1 09:00
 */

import { http } from "@/utils/https";
import {downLoadFile } from "../utils/utils";


/**
 * @description: 获取字典列表
 * @param {string}  dictType
 */
 export const getDictTypeList = (data) => {
  return new Promise((resolve, reject) => {
    return http.get("/sys/dict/list", {dictType:data}).then(res => {
      const {code, data=[]} = res || {}
      if (code === 200) {
        data.forEach((item) => {
          item.key = item.dictName;
          item.value = item.dictValue;
          item.label = item.dictName;
        });
        resolve(data)
      } else {
        reject()
      }
    })
  })
};
