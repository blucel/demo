/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 20:00:58
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-13 14:16:47
 * @FilePath: \safe-product-authority-browser\src\utils\log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const projectName = import.meta.env.VITE_GLOB_APP_SHORT_NAME;

export function warn(message: string) {
  console.warn(`[${projectName} error]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}
