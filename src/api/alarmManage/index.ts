/*
 * @Author: 曹文丽 caowenli@yuan-info.com
 * @Date: 2023-07-21 09:48:03
 * @LastEditors: 曹文丽 caowenli@yuan-info.com
 * @LastEditTime: 2023-07-25 11:10:06
 * @FilePath: \safe-product-alarm-browser\src\api\alarmManage\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "@/utils/https";
/**
 * @description: 查询告警类型
 */
export const queryType = () => {
  return http.get("/alarm/alarmDesign/get");
};

/**
 * @description:保存告警类型
 */
 export const saveType = (params) => {
  return http.post("/alarm/alarmDesign/update", params);
};
