/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 19:55:25
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-11-01 13:53:38
 * @FilePath: /safe-product-authority-browser/src/utils/https/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Axios, {
  AxiosRequestConfig,
  CancelTokenStatic,
  AxiosInstance,
} from "axios";
import qs from "qs";
import { genConfig } from "./config";
import { transformConfigByMethod } from "./utils";
import { getUserInfoCache } from '../auth/user'
import settings from "../../settings";
import { getTokenTypeCache, getTokenValueCache } from "../../utils/auth/token";
import { yaErrorMessage } from '../../utils/message'
import {
  cancelTokenType,
  RequestMethods,
  EnclosureHttpRequestConfig,
  EnclosureHttpResoponse,
  EnclosureHttpError,
} from "./types.d";
import { useUserStoreWithOut } from '@/store/modules/users'
import { router } from "../../router"

class EnclosureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // private 私有属性，只可内部使用
  // 初始化配置对象
  private static initConfig: EnclosureHttpRequestConfig = {};

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(genConfig());

  // 保存 EnclosureHttp实例
  private static EnclosureHttpInstance: EnclosureHttp;

  // axios取消对象
  private CancelToken: CancelTokenStatic = Axios.CancelToken;

  // 取消的凭证数组
  private sourceTokenList: Array<cancelTokenType> = [];

  // 记录当前这一次cancelToken的key
  private currentCancelTokenKey = "";

  private beforeRequestCallback: EnclosureHttpRequestConfig["beforeRequestCallback"] =
    undefined;

  private beforeResponseCallback: EnclosureHttpRequestConfig["beforeResponseCallback"] =
    undefined;

  // public 公共属性,外部也可以使用
  public get cancelTokenList(): Array<cancelTokenType> {
    return this.sourceTokenList;
  }

  // eslint-disable-next-line class-methods-use-this
  public set cancelTokenList(value) {
    throw new Error("cancelTokenList不允许赋值");
  }

  /**
   * @description 生成唯一取消key
   * @param config axios配置
   * @returns string
   */
  // eslint-disable-next-line class-methods-use-this
  private static genUniqueKey(config: EnclosureHttpRequestConfig): string {
    return `${config.url}--${JSON.stringify(config.method == 'get'? config.params :config.data)}`;
  }

  /**
   * @description 取消重复请求
   * @returns void 0
   */
  private cancelRepeatRequest(): void {
    const temp: { [key: string]: boolean } = {};

    this.sourceTokenList = this.sourceTokenList.reduce<Array<cancelTokenType>>(
      (res: Array<cancelTokenType>, cancelToken: cancelTokenType) => {
        const { cancelKey, cancelExecutor } = cancelToken;
        if (!temp[cancelKey]) {
          temp[cancelKey] = true;
          res.push(cancelToken);
        } else {
          cancelExecutor();
        }
        return res;
      },
      []
    );
  }

  /**
   * @description 删除指定的CancelToken
   * @returns void 0
   */
  private deleteCancelTokenByCancelKey(cancelKey: string): void {
    this.sourceTokenList =
      this.sourceTokenList.length < 1
        ? this.sourceTokenList.filter(
          (cancelToken) => cancelToken.cancelKey !== cancelKey
        )
        : [];
  }

  /**
   * @description 拦截请求
   * @returns void 0
   */

  private httpInterceptorsRequest(): void {
    EnclosureHttp.axiosInstance.interceptors.request.use(
      (config: EnclosureHttpRequestConfig) => {
        const $config = config;
        // NProgress.start(); // 每次切换页面时，调用进度条
        const cancelKey = EnclosureHttp.genUniqueKey($config);
        $config.cancelToken = new this.CancelToken(
          (cancelExecutor: (cancel: any) => void) => {
            this.sourceTokenList.push({ cancelKey, cancelExecutor });
          }
        );

        // 请求拦截 携带 token
        const tokenWhiteList = ["captcha", 'token'];
        const isNeedToken = tokenWhiteList.some(item => $config.url.includes(item));
        console.log('$config.url', $config.url)
        if (!isNeedToken) {
          // @ts-ignore
          $config.headers[settings.tokenName] = getTokenValueCache()
            ? `${getTokenTypeCache()} ${getTokenValueCache()}`
            : "Basic eXVhbjp5dWFuMTIz";
        } else {
          // @ts-ignore
          $config.headers[settings.tokenName] = "Basic eXVhbjp5dWFuMTIz"
        }
          this.cancelRepeatRequest();
          this.currentCancelTokenKey = cancelKey;
        
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof this.beforeRequestCallback === "function") {
          this.beforeRequestCallback($config);
          this.beforeRequestCallback = undefined;
          return $config;
        }
        if (EnclosureHttp.initConfig.beforeRequestCallback) {
          EnclosureHttp.initConfig.beforeRequestCallback($config);
          return $config;
        }

        return $config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 清空当前cancelTokenList
   * @returns void 0
   */
  public clearCancelTokenList(): void {
    this.sourceTokenList.length = 0;
  }

  /**
   * @description 拦截响应
   * @returns void 0
   */
  private httpInterceptorsResponse(): void {
    const instance = EnclosureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: EnclosureHttpResoponse) => {
        const status = response?.status || 200
        const code = Number(response?.data?.code) || 200;
        let message = response?.data?.message || "";
        
        // 当 HttpCode 为 200时，此时都是业务错误，如果 message 存在就将其抛出
        if (code !== 200 && response.data?.message){  
          yaErrorMessage(message);
        }

        // 请求每次成功一次就删除当前canceltoken标记
        const cancelKey = EnclosureHttp.genUniqueKey(response.config);
        this.deleteCancelTokenByCancelKey(cancelKey);
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof this.beforeResponseCallback === "function") {
          this.beforeResponseCallback(response);
          this.beforeResponseCallback = undefined;
          return response.data;
        }
        if (EnclosureHttp.initConfig.beforeResponseCallback) {
          EnclosureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
          // NProgress.done();
        }

        return response.data;
      },
      (error: EnclosureHttpError) => {
        const $error = error;
        const userStore = useUserStoreWithOut()
        if (this.currentCancelTokenKey) {
          const haskey = this.sourceTokenList.filter(
            (cancelToken) =>
              cancelToken.cancelKey === this.currentCancelTokenKey
          ).length;
          if (haskey) {
            this.sourceTokenList = this.sourceTokenList.filter(
              (cancelToken) =>
                cancelToken.cancelKey !== this.currentCancelTokenKey
            );
            this.currentCancelTokenKey = "";
          }
        }
        $error.isCancelRequest = Axios.isCancel($error);
        // NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        // 全局错误处理
        try {
          const { response = {}, code = null, message = "", config } = $error || {};
          const status = Number(response?.status)

          const _errorCode = response.data?.code
          const _errorMessage = response.data?.message
          const errorUrl = response?.request?.responseURL
          const isLogoutRequest = errorUrl.includes('signout')
          // 跳转异常页面
          function toErrorPageRouter(errorCode){
            const { menuId } = router.currentRoute.value.meta
            const { fullPath } = router.currentRoute.value
            if(fullPath && fullPath.includes(errorCode)) return;
            const _errorPath = `${fullPath}/${errorCode}?menuid=${menuId}`
            console.log(_errorPath, '_errorPath')
            router.push({ path: _errorPath })
          }

          if (code === '"ECONNABORTED"') {
            // 服务超时
            toErrorPageRouter('504')
          } else {
            switch (status) {
              case 502:
                // 服务器异常
                yaErrorMessage('服务器异常');
                toErrorPageRouter('502')
                break
              case 403: // 无权限
                toErrorPageRouter('403')
                break;
              default:
                if(_errorMessage && !isLogoutRequest){
                  yaErrorMessage(_errorMessage)
                }
               
                // token 无效的跳转登录
                if(_errorCode && _errorCode === 401 && !isLogoutRequest){
                  userStore.logoutAction(router)
                  return;
                }
                break
            }
          }

        } catch (error) {
          throw new Error(error as unknown as string);
        }
        return Promise.reject($error);
        // sudo
      }
    );
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: EnclosureHttpRequestConfig
  ): Promise<T> {
    const userinfo = getUserInfoCache() || {}
    axiosConfig = axiosConfig || {}
    const headers = axiosConfig.headers || {}
    axiosConfig.headers = Object.assign({ adminName: userinfo.name }, headers)

    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig,
    } as EnclosureHttpRequestConfig);
    // 单独处理自定义请求/响应回掉
    if (axiosConfig?.beforeRequestCallback) {
      this.beforeRequestCallback = axiosConfig.beforeRequestCallback;
    }
    if (axiosConfig?.beforeResponseCallback) {
      this.beforeResponseCallback = axiosConfig.beforeResponseCallback;
    }
    return new Promise((resolve, reject) => {
      EnclosureHttp.axiosInstance
        .request(config)
        .then((response) => {
          return resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public post<T>(
    url: string,
    params?: T,
    config?: EnclosureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, config);
  }

  public get<T>(
    url: string,
    params?: T,
    config?: EnclosureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, config);
  }
  public delete<T>(
    url: string,
    params?: T,
    config?: EnclosureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("delete", url, params, config);
  }
}

export const http = new EnclosureHttp();
