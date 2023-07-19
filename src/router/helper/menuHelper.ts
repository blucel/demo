/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 19:25:31
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-08-18 17:44:40
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/router/helper/menuHelper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export function transformRouteToMenu(
  routeModList: AppRouteModule[],
  routerMapping = false
) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (
      routerMapping &&
      item.meta.hideChildrenInMenu &&
      typeof item.redirect === "string"
    ) {
      item.path = item.redirect;
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { hideMenu = false } = {}, name } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: name,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      };
    },
  });
  joinParentPath(list);
  return cloneDeep(list);
}


export const matchingErroUpRouter = (url, menuData, errorCode) => {
  const urlArr = url.split(`/${errorCode}`) || [];
  if(urlArr.length === 0) return;

  const urlPath = urlArr[0];
  const currentMenu = dataQueryByPath(menuData, urlPath);
  return currentMenu?.id;
}

export const dataQueryByPath = (tree, path) => {
  let stark = [];
  stark = stark.concat(tree);
  while(stark.length) {
      var temp = stark.shift() as any;
      if(temp.children) {
          stark = stark.concat(temp.children);
      }
      if(temp.path === path) {
          return temp;
      }
  }
}

