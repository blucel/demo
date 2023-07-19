/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-12 15:04:53
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-12-08 20:49:27
 * @FilePath: \safe-product-authority-browser\src\utils\tools\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export const LAYOUT = () => import("../../views/layout/index.vue")
// const path = require('path')
// export {resolve} from 'path'
// import.meta.glob(`../../views/**/*.vue`)
const routeAllPathToCompMap = []
type menuItemType = {
  component: Function
  name: String,
  path: String,
  children: menuItemType[],
  parentPath: String
}

/**
 * @description: 将菜单转化路由
 * @param {Array} oldMenu 
 * @param {Array} newMenu
 * @return {Array}
 */
export const handleMenuToRoute = function(oldMenu, newMenu:menuItemType[]=[], parentPath) {
  oldMenu.forEach(item => {
    let menuItem: menuItemType = {
      component: () => {},
      name: '',
      path: '',
      parentPath: '',
      children: []
    }
    if (item.perType === 0) {
      if (!item.pid) {
        menuItem.component = LAYOUT;
        menuItem.parentPath = menuItem.path = item.path[0] === '/'?item.path:'/'+item.path
      } else {
        if (item.path[0] === '/') {
          item.path = item.path.slice(1)
        }
        menuItem.path = item.path
        menuItem.parentPath = parentPath + '/' + menuItem.path
        menuItem.component = routeAllPathToCompMap['../../views'+ menuItem.parentPath +'.vue']
      }
      menuItem.name = item.label
      if (item.children) {
        handleMenuToRoute(item.children, menuItem.children, menuItem.parentPath)
      }
      newMenu.push(menuItem)
    }
  })
  console.log(newMenu, 'newMenu');
  
  return newMenu
}

export const withInstall = (comp, name) => {
  ;(comp).install = function (app) {
    console.log(app, 'aoppppp')
    app.component(name, comp)
  }
  return comp
}

/**
 * @description: 获取数组索引
 * @param {array} arr - 遍历数据
 * @param {string} key - 键
 * @param {string} value - 键值
 * @return 返回索引
 */
export const handleGetIndex = (arr, key, value) => {
  return arr.findIndex((item) => {
    return item[key] === value;
  });
};

/**
 * @description: 通用下载 (要求返回文件流)
 * @param {*} data 数据
 * @param {*} name 文件名称
 * @param {*} type 文件类型
 * @author changjun
 */
export function downLoadFile(data, name, type = "xlsx") {
  // data =
  if (!data) return;
  const mimeType = {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    pdf: "application/pdf",
    zip: "application/x-zip-compressed",
  };
  const blob = new Blob([data], { type: mimeType[type] });
  // const blob = new Blob([data], { type: data.type })
  const _link = document.createElement("a");
  _link.download = name;
  _link.style.display = "none";
  _link.href = URL.createObjectURL(blob);
  document.body.appendChild(_link);
  _link.click();
  URL.revokeObjectURL(_link.href);
  document.body.removeChild(_link);
}