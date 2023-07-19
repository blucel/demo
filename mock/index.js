/*
 * @Descripttion: mock数据模块
 * @version:
 * @Author: 李佐宁
 * @Date: 2023-06-16 14:16:01
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2023-07-10 10:06:38
 */
import login from './login';
import alarmManage from './alarmManage';

const handleInterface = (...args) => {
  args.map(item => {
    item.map((child) => {
      child.response = () => {
        return {
          code: child.code || 200,
          data: child.data,
          message: child.message,
        };
      };
    });
  })
};
handleInterface(login,alarmManage);

export default [...login,...alarmManage];
