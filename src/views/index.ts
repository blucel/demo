/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-20 22:48:06
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2023-07-19 15:00:23
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/views/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * from './system/alarmManage'
import alarm from './component/alarmManage/index.vue'
import {withInstall} from '../utils/tools'

const YaAlarm = withInstall(alarm, 'YaAlarm')
export { YaAlarm }

