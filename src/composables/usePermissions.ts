/*
 * @Author: ChangJun
 * @FilePath: /safe-product-authority-browser/src/composables/usePermissions.ts
 * @Date: 2022-08-08 10:38:47
 * @Description: 
 */
import { useUserStoreWithOut } from '@/store/modules/users'
import { useRoute } from 'vue-router'

/**
 * @description: 获取当前页面的权限按钮
 * @return {*}
 * @author: changjun
 */
export const usePermissions = () => {
  const userStore = useUserStoreWithOut()
  const route = useRoute()
  const {path } = route
  const permissionsButton = userStore.getPermissionsButton
  const permissionsButtons = [] as any
  permissionsButton.forEach(item => {
    if(item.url.includes(path)){
      permissionsButtons.push(item)
    }
  })
  return { permissionsButtons }
}
