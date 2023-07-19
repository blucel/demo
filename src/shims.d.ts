/// <reference types="vue/macros-global" />
/*
 * @Description: 决解vue引用报错问题
 * @Autor: xiezhongbin
 * @Date: 2021-11-02 10:08:37
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-07-13 08:53:42
 */
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
