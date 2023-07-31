/*
 * @Descripttion:
 * @version:
 * @Author: 李佐宁
 * @Date: 2022-06-29 16:13:44
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2023-07-31 14:28:09
 */

import App from "./src/app.vue";
import { createApp } from "vue";
// 无需登录触发路由

async function init(){
  const app = createApp(App);
  app.mount('#app');
}

init()
