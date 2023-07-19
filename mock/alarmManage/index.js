/*
 * @Descripttion:
 * @version:
 * @Author: tqh
 * @Date: 2023-07-14 09:36:50
 * @LastEditors: tqh
 * @LastEditTime: 2023-07-14 09:36:50
 */
const arr = [
  {
    url: '/api/networkInterfaceCardConfig/listPage-s',
    method: 'get',
    // code: '500' 默认200，可不填
    // message: ''
    data: {
      firstChoiceDns: '首选项',
      secondChoiceDns: '备选',
      total: 1,
      records:[
        {
          device: '接口',
          ipv4Ipaddr: 'ipv4地址',
          ipv4Netmask: 'ipv4子网掩码',
          ipv6Ipaddr: 'ipv6地址',
          prefixlen: '前缀长度',
          ipv6Gateway: 'ipv6网关',
          mode: '网卡模式',
          speed: '速率',
          status: 'up'
        }
      ]
    }
  },
  // {
  //   url: '/api/networkInterfaceCardConfig/edit',
  //   method: 'post',
  //   response: ({
  //       body
  //   }),
  //   data: { }
  // },
];

export default arr;
