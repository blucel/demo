/*
 * @Description:
 * @Author: xuch
 * @FilePath: \yuan-qingdao-zld-browser\src\utils\utils.ts
 * @Date: 2022-08-30 16:16:39
 * @LastEditTime: 2023-04-24 09:27:49
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 */
/**
 * @description: 通用下载 (要求返回文件流)
 * @param {*} data 数据
 * @param {*} name 文件名称
 * @param {*} type 文件类型
 * @author changjun
 */
 export function downLoadFile(data, name, type = "xlsx") {
  // data =
  if (!data) return;
  const mimeType = {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    pdf: "application/pdf",
    zip: "application/x-zip-compressed",
    csv: "text/csv",
  };
  const blob = new Blob([data], { type: mimeType[type] });
  // const blob = new Blob([data], { type: data.type })
  const _link = document.createElement("a");
  _link.download = name;
  _link.style.display = "none";
  _link.href = URL.createObjectURL(blob);
  document.body.appendChild(_link);
  _link.click();
  URL.revokeObjectURL(_link.href);
  document.body.removeChild(_link);
}
