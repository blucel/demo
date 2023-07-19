/*
 * @Description: 
 * @Author: xuch
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/components.ts
 * @Date: 2022-07-22 17:08:53
 * @LastEditTime: 2023-07-19 15:02:24
 */
import {
  YaTable,
  YaButton,
  YaPagination,
  YaInput,
  YaForm,
  YaDialog,
  YaPopover,
  YaLayout,
  YaSearch,
  YaLogin,
  YaPageContent,
  YaTree,
  YaTreeSelect,
  YaUpload,
  YaError,
  YaDrawer,
  YaDropDown,
  YaTreeNode,
  CustomTooltip,
  YaTabs,
  YaList
} from "yuan-pluss";
// component-library/packages/components
import "yuan-pluss/theme-chalk/css/index.css";
import component, {
  YaLoginPage,
  YaChangeInitPassword,
  YaImportLicense
} from "safe-product-authority-browser";

import {YaAlarm} from "./views/index"

export const setupComponent = (app: any) => {
  app.use(component)
  app.use(YaLoginPage)
  app.use(YaChangeInitPassword)
  app.use(YaImportLicense)
  app.use(YaInput)
  app.use(YaForm);
  app.use(YaDialog);
  app.use(YaTable);
  app.use(YaButton);
  app.use(YaPagination);
  app.use(YaPopover);
  app.use(YaLayout);
  app.use(YaSearch);
  app.use(YaPageContent);
  app.use(YaLogin);
  app.use(YaTree)
  app.use(YaTreeSelect)
  app.use(YaUpload)
  app.use(YaError)
  app.use(YaDrawer)
  app.use(YaDropDown)
  app.use(YaTreeNode)
  app.use(CustomTooltip)
  app.use(YaTabs);
  app.use(YaList);
  
  // 通用告警模块
  app.use(YaAlarm)
}
