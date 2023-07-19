import { getLocal } from '../../utils/cache'

const userInfoKey = 'YA_USER_INFO'
const local = getLocal()

export const setUserInfoCache = (userInfo) => {
  local.setKey(userInfoKey, userInfo)
}

export const getUserInfoCache = ()=>{
  return local.getKey(userInfoKey)
}

export const removeUserInfoCache = () => {
  local.removeKey(userInfoKey)
}
