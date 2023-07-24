/*
 * @Descripttion:
 * @version:
 * @Author: tqh
 * @Date: 2023-07-14 09:36:50
 * @LastEditors: 曹文丽 caowenli@yuan-info.com
 * @LastEditTime: 2023-07-21 14:38:42
 */
const arr = [
  {
    url: "/api/alarm/alarmDesign/getssss",
    method: "get",
    data: [
      {
        type: "站内信",
        typeCode: 1,
        status: 0,
        extra: null,
      },
      {
        type: "邮件",
        typeCode: 2,
        status: 1,
        extra: {
          host: "smtp.163.com",
          username: "a1525878682@163.com",
          password: "RWIEEEMEKKKWYCUS",
          protocol: "smtp",
          port: 25,
        },
      },
    ],
  },
  {
    url: "/api/sys/dict/listssss",
    method: "get",
    data: [
      {
        key: "smtp",
        value: 1,
      },
      {
        key: "imap",
        value: 2,
      },
      {
        key: "POP",
        value: 3,
      },
    ],
  },
  {
    url: "/api/alarm/alarmDesign/updatesss",
    method: "post",
    data: null,
    message: "保存成功",
  },
];

export default arr;
