/*
 * @Description: 基础配置项
 * @Autor: xiezhongbin
 * @Date: 2021-11-02 16:50:13
 * @LastEditors: ChangJun
 * @LastEditTime: 2022-08-26 15:23:07
 */

import type { appSettingInterface } from "../types/config";
import { LOGO_IMG } from './constant'

export const appSetting: appSettingInterface = {
  title: "权限模块",
  menuMode: "vertical",
  theme: "dark",
  classics: "#108FEA",
  logo: LOGO_IMG,
  HomePath: '/system'
};

export default {
  tokenName: "Authorization",
};
