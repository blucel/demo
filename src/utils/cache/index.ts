/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 20:07:07
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-15 11:12:26
 * @FilePath: \safe-product-authority-browser\src\utils\cache\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

type StorageType = "localStorage" | "sessionStorage";

// Storage 基类
class Storage {
  static type: StorageType;

  constructor(type: StorageType) {
    Storage.type = type;
  }

  /* 本方法获取本地存储值 */
  getKey(key: string): string {
    let result: any = window[Storage.type].getItem(key);
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }

  /* 本方法设置本地存储值 */
  setKey(key: string, value: string | number): void {
    const val = typeof value === "string" ? value : JSON.stringify(value);
    window[Storage.type].setItem(key, val);
  }

  /* 本方法移除指定的本地存储值 */
  removeKey(key: string): void {
    window[Storage.type].removeItem(key);
  }

  /* 本方法清除所有的本地存储值 */
  clear() {
    window[Storage.type].clear();
  }
}



export const getLocal = () => {
  return new Storage("localStorage");
}

export const getSession = () => {
  return new Storage("sessionStorage")
}
