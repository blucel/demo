/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 19:40:18
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2023-07-18 16:03:35
 * @FilePath: /safe-product-authority-browser/src/store/modules/users.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Router, RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { store } from "../../store";
import { getCaptcha, loginRequest, userInfoRequest, getUserRoleMenu, logooutRequest, checkLicense } from "../../api/login";
import { setUserInfoCache, getUserInfoCache, removeUserInfoCache } from '../../utils/auth/user'
import { setTokenCache, getTokenValueCache, removeTokeCache } from '../../utils/auth/token'
import { setLayoutMenuCache, getLayoutMenuCache, removeLayoutMenuCache, setPermissionsButtonCache, getPermissionsButtonCache, removePermissionsButtonCache } from '../../utils/auth/menu'
import { changePasswordNotification } from '../../utils/notification'
import { conversionMenu, getPermissionsButton } from '../../utils/helper/conversionMenu'



interface UserInfo {
  userId?: string;
  principal: {
    userId? : string;
    username?: string;
    loginFlag?: string;
    updatePwdPrompt?: string;
    licenseFlag?: any;
    roleId?:any
  };
}

interface UserState {
  userInfo: UserInfo | null | any;
  roleList: string[];
  menu: Object[];
  token?: string;
  verificationCode?: string;
  codeKey?: number;
  changePwdDialogVisible: boolean;
  layoutMenu?: Object[];
  permissionsButton?: Object[];
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    userInfo: null,
    roleList: [],
    menu: [],
    token: "",
    verificationCode: "",
    codeKey: Math.floor(Math.random()*100),
    changePwdDialogVisible: false,
    layoutMenu: [],
    permissionsButton: [],
  }),
  getters: {
    userInfoGetters(): UserInfo | null {
      return this.userInfo || null;
    },
    roleListGetters(): string[] {
      return this.roleList || [];
    },
    menuGetters(): Object[] {
      return this.menu || []
    },
    getVerCode(): string {
      return this.verificationCode || ''
    },

    getUserInfo(): UserInfo {
      return this.userInfo || getUserInfoCache() || null;
    },

    getToken(): string {
      return this.token || getTokenValueCache() || '';
    },

    getCurrentUserId(): string {
      const userInfo = this.getUserInfo || getUserInfoCache();
      return userInfo?.principal?.userId || ''
    },

    getCurrentUserName(): string {
      const userInfo = this.getUserInfo;
      return userInfo?.principal?.username || '';
    },

    getUserRoleId(): string{
      const userInfo = this.getUserInfo;
      return userInfo?.principal?.roleId || ''
    },

    getLayoutMenu(state){
      return state.layoutMenu || getLayoutMenuCache() || []
    },

    getPermissionsButton(state){
      return state.permissionsButton || getPermissionsButtonCache() || []
    },

    isAdmin(){
      const userInfo = this.getUserInfo as UserInfo;
      if(!userInfo) return false;
      const { principal } = userInfo; 
      return Number(principal.roleId) === 1;
    },

  },
  actions: {


    getHasFirstLogin(){
      const userInfo = this.getUserInfo
      const { principal } = userInfo;
      return Number(principal?.loginFlag) === 0;
    },

    getHasLicense(){
      const userInfo = this.getUserInfo;
      if(!userInfo) return false
      const { principal } = userInfo;
      // 是否开启 license 0开启 1不开启
      return Number(principal?.licenseFlag) === 0
    },

    getHasUpdatePwdPrompt(): boolean {
      const userInfo = this.getUserInfo;
      const { principal } = userInfo;
      // 密码30天未修改，需要提醒用户 0：不提醒 1：提醒
      return Number(principal?.updatePwdPrompt) === 1;
    },

    resetState(){
      this.changePwdDialogVisible = false;
      this.verificationCode = "";
      this.codeKey = Math.floor(Math.random()*100);
    },

    async refreshCodeKey(){
      this.codeKey = Math.floor(Math.random()*100);
    },
    /**
     * @description: 登出的action，清除 token 和 userInfo，跳转到登录
     * @return {*}
     * @author: changjun
     */    
    async logoutAction(router){
      try {
        await this.logoutRequestAction()
      } catch (error) {
        console.log(error);
      }finally{
        this.setUserInfo(null);
        this.setToken('')
        this.setPermissionsButton([])
        removeTokeCache()
        removeUserInfoCache()
        removeLayoutMenuCache()
        removePermissionsButtonCache()
        this.resetState()
        router.replace({ name: 'Login'})
      }
    },

    async logoutRequestAction(){
      const res = await logooutRequest();
    },

    /**
     * @description: 设置用户信息到缓存
     * @param {UserInfo} info
     * @return {*}
     * @author: changjun
     */    
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      setUserInfoCache(info)
    },

    /**
     * @description: 设置token
     * @param {*} token
     * @return {*}
     * @author: changjun
     */    
    setToken(token: {}) {
      const { access_token = '', expires_in = '' } = token as any
      this.token = access_token
      setTokenCache(token, expires_in)
    },

    /**
     * @description: 登录action
     * @param {*} params
     * @return {*}
     * @author: changjun
     */    
    async loginAction(params, redirect, router){
      try {
        const res = await loginRequest(params) as any
        if(res.access_token){
          this.setToken(res)
          localStorage.setItem('login_username', params.username)
          return this.afterLoginAction(redirect, router)
        }else{
          this.getCodeAction()
        }
      } catch (error) {
        console.log(error)
        return Promise.reject(error);
      }
    },

    async checkLicenseAction(){
      let res = await checkLicense() as any;
      return res?.code === -1;
    },

    /**
     * @description: 登录后的操作
     * @description: 获取用户信息，获取菜单，获取角色
     * @return {*}
     * @author: changjun
     */    
    async afterLoginAction(redirect, router){
      if (!this.getToken) return null;
      try{
        // 无需登录触发路由
        if(redirect){
          router.replace(redirect)
        }
      }catch(error){
        return Promise.reject(error);
      }
    },

    /**
     * @description: 获取用户信息
     * @return {*}
     * @author: changjun
     */    
    async getUserInfoAction() {
      if (!this.getToken) return null;
      let userInfo = await userInfoRequest({
        headers: {
          adminName: localStorage.getItem('login_username')
        }
      }) as any;
      this.setUserInfo(userInfo);
      return userInfo
    },

    /**
     * @description: 获取路由菜单
     * @return {*}
     * @author: changjun
     */    
    async getDynamicMenuAction() {
      // 无需登录触发路由
      try {
        const menu = [
          {
            "id": 139, 
            "pid": 0, 
            "label": "系统管理", 
            "icon": "icon-quanxianguanli", 
            "url": "/system", 
            "level": 1, 
            "treeName": "系统管理", 
            "perType": 0, 
            "isPage": 1, 
            "children": [
              {
                "id": 171230, 
                "pid": 3001, 
                "label": "告警配置", 
                "icon": "", 
                "url": "/system/alarmManage/alarm", 
                "level": 2, 
                "treeName": "系统管理/告警配置", 
                "perType": 0, 
                "isPage": 1, 
                "children": [], 
                "checkArr": "1", 
                "menuId": 3008
              },
            ],
            "checkArr": "1", 
            "menuId": 3001
          }
        ];
        this.setLayoutMenu(menu);
        this.setPermissionsButton(menu);
        console.log(menu, '路由菜单')
        return menu
      } catch (error) {
        console.log(error)
        return Promise.reject(error);
      }
    },

    /**
     * @description: 获取验证码
     * @return {*}
     * @author: changjun
     */    
    async getCodeAction(){
      await this.refreshCodeKey();
      const res = await getCaptcha(this.codeKey)
      console.log('获取验证码', res)
      // @ts-ignore
      const img = window.URL.createObjectURL(res);
      this.verificationCode = img || ''
      return res
    },

    /**
     * @description: 用来设置全局的修改密码弹框是否显示
     * @param {*} visible
     * @return {*}
     * @author: changjun
     */    
    async setChangePwdDialogVisible(visible){
      this.changePwdDialogVisible = visible
    },


    async setLayoutMenu(menu){
      console.log(menu, 'menu')
      const result = conversionMenu(menu)
      this.layoutMenu = result
      setLayoutMenuCache(result)
      console.log(this.layoutMenu, 'this.layoutMenu')
    },

    async setPermissionsButton(menu){
      const res = await getPermissionsButton(menu)
      console.log(res, '获取的按钮权限')
      this.permissionsButton = res
      setPermissionsButtonCache(res)
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
