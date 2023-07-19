/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-20 22:48:59
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-21 00:05:28
 * @FilePath: \safe-product-authority-browser\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as components from './views'
import {
  YaTable,
  YaButton,
  YaPagination,
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
  YaError
} from "yuan-pluss";

const install = (app) => {
  app.use(YaPagination)
  app.use(YaTable)
  app.use(YaButton)
  app.use(YaForm)
  app.use(YaDialog)
  app.use(YaPopover)
  app.use(YaLayout)
  app.use(YaSearch)
  app.use(YaLogin)
  app.use(YaPageContent)
  app.use(YaTree)
  app.use(YaTreeSelect)
  app.use(YaUpload)
  app.use(YaError)
  // Object.entries(components).forEach(([name, component]) => {
  //   return app.component(name, component)
  // })
}

export default {
  install,
}

export * from './views'