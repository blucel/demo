/*
 * @Descripttion:
 * @version:
 * @Author: 李佐宁
 * @Date: 2022-06-29 16:13:44
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-12-05 15:11:06
 */

import App from "./src/app.vue";
import { createApp } from "vue";
import { router, setupRouter } from './src/router'
import { setupComponent } from './src/components'
import { setupStore } from "./src/store/index";
import { createPermissionGuard } from "./src/router/guard";
import "./src/assets/iconfont/iconfont.css";
import "./src/style/index.scss";
import dir from "./src/directive"
import { useUserStoreWithOut } from './src/store/modules/users';
const userStore = useUserStoreWithOut()
// 无需登录触发路由
userStore.getDynamicMenuAction()


async function init(){
  const app = createApp(App);
  app.directive("preventReClick", dir.preventReClick)
  setupStore(app);
  setupRouter(app);
  setupComponent(app);
  createPermissionGuard(router);
  app.mount('#app');
}

init()
