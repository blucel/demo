/*
 * @Author: changjun
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/utils/helper/conversionMenu.ts
 * @Date: 2022-07-20 14:44:53
 * @Description: 对于菜单栏的处理
 * @LastEditTime: 2022-08-19 14:17:00
 * @LastEditors: ChangJun
 */
export const conversionMenu = (list: any[]) => {
  const result = [] as any
  list.forEach((item) => {
    const { id, menuId, url, pid, children, perType, ...other  } = item;
    const _children = children.length>0 ? conversionMenu(children) : []
    const newItem = {
      id: menuId,
      path: url,
      parentId: pid,
      hide: false,
      perType,
      ...other,
    }
    
    // 如果有子菜单再追加子菜单
    if(_children.length>0){
      newItem.children = _children
    }

    // perType 0 菜单 1 按钮  
    if(perType === 0){
      result.push(newItem)
    }

    // 如果当前是页面级按钮，则将其在菜单栏中隐藏
    if(perType === 1 && other.isPage === 0){
      newItem.hide = true
    }

    // 如果是页面级按钮追加到菜单栏中
    if(perType === 1 && newItem.isPage === 0){
      result.push(newItem)
    }
  })
  return result
}

/**
 * @author: changjun
 * @description: 从菜单栏数据中获取所有的权限按钮列表
 * @param list 菜单栏数据
 * @returns 返回当前多有有权限的按钮
 */
export const getPermissionsButton = (list: any[]) => {
  const result = [] as any
  list.forEach((item) => {
      const { children, perType, ...other  } = item;
      const _children = children.length>0 ? getPermissionsButton(children) : []
      const newItem = {
        ...other,
      }
      if(perType === 1){
        result.push(newItem)
      }
      result.push(..._children)
    }
  )
  return result
}
