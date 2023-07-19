import { getLocal } from '../../utils/cache'
const MENU_KET = 'YA_LAYOT_MENU'
const YA_PERMISSIONS_BUTTON_KEY = 'YA_PERMISSIONS_BUTTON'
const local = getLocal()

export const setLayoutMenuCache = (menu) => {
  local.setKey(MENU_KET, menu)
}

export const getLayoutMenuCache = ()=>{
  return local.getKey(MENU_KET)
}

export const removeLayoutMenuCache = () => {
  local.removeKey(MENU_KET)
}


export const setPermissionsButtonCache = (permissionsButton) => {
  local.setKey(YA_PERMISSIONS_BUTTON_KEY, permissionsButton)
}

export const getPermissionsButtonCache = ()=>{
  return local.getKey(YA_PERMISSIONS_BUTTON_KEY)
}

export const removePermissionsButtonCache = () => {
  local.removeKey(YA_PERMISSIONS_BUTTON_KEY)
}
