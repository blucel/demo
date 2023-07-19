import { http } from "../utils/https";
import qs from "qs";



export const getCaptcha = (key) => {
  return http.get(`/captcha?key=${key}`, {}, {
    responseType: "blob"
  })
}

export const loginRequest = (params) => {
  return http.request("post", "/oauth/token", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
}

export const userInfoRequest = (config) => {
  return http.get('/user', null, config)
}

export const getUserRoleMenu = (roleId) => {
  return http.get(`/role/initPermissionByRoleId?roleId=${roleId}&type=1`)
}

export const logooutRequest = () => {
  return http.delete('/signout')
}

export const checkLicense = () => {
  // http://10.1.1.65:8090/license-manage-api/license/checkLicense
  return http.post('/license/checkLicense')
}
