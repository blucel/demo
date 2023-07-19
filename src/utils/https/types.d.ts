/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-06-13 14:25:00
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-15 11:14:26
 * @FilePath: \safe-product-authority-browser\src\utils\https\types.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Axios, {
  AxiosRequestConfig,
  Canceler,
  AxiosResponse,
  Method,
  AxiosError,
} from "axios";
import { METHODS } from "./config";

export type cancelTokenType = { cancelKey: string; cancelExecutor: Canceler };

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface EnclosureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: EnclosureHttpRequestConfig) => void; // 请求发送之前
  beforeResponseCallback?: (response: EnclosureHttpResoponse) => void; // 相应返回之前
}

export interface EnclosureHttpResoponse extends AxiosResponse {
  config: EnclosureHttpRequestConfig;
}

export interface EnclosureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export default class EnclosureHttp {
  cancelTokenList: Array<cancelTokenType>;
  clearCancelTokenList(): void;
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: EnclosureHttpRequestConfig
  ): Promise<T>;
  post<T>(
    url: string,
    params?: T,
    config?: EnclosureHttpRequestConfig
  ): Promise<T>;
  get<T>(
    url: string,
    params?: T,
    config?: EnclosureHttpRequestConfig
  ): Promise<T>;
}
