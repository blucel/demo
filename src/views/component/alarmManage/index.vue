<!--
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2023-07-19 14:58:43
 * @LastEditors: 曹文丽 caowenli@yuan-info.com
 * @LastEditTime: 2023-07-21 15:02:08
 * @FilePath: \safe-product-alarm-browser\src\views\component\alarmManage\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ya-box">
    <YaEditForm :formColumns="formColumns" @submit="handlerToSubmit"></YaEditForm>
  </div>
</template>
<script lang="ts" setup>
import { yaMessage } from "../../../utils/message";
import { handleGetIndex } from "../../../utils/tools/index";
import { ref ,onMounted} from "vue";
import {
  queryType,
  saveType,
} from "../../../api/alarmManage";
import {getDictTypeList} from '../../../api/common'
import { log } from "console";
const typeCode=ref([])
const protocols=ref([])
const hide=ref(true)
const formColumns = ref([
  {
    key: "typeCode",
    label: "告警方式",
    type: "checkbox",
    rules:true,
    options:typeCode,
    onChange(data){ 
      hide.value=!data?.includes(2)
    },
    value:[]
  },
  {
    key: "host",
    label: "服务器地址",
    type: "input",
    rules:true,
    maxLength: 40,
    clearable: true,
    hide:hide,
    value:null
  },
  {
    key: "username",
    label: "用户",
    type: "input",
    rules:true,
    maxLength: 40,
    clearable: true,
    hide:hide,
    value:null
  },
  {
    key: "password",
    label: "密码",
    type: "password",
    rules:true,
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
    hide:hide,
    value:null
  },
  {
    key: "protocol",
    label: "协议",
    type: "select",
    options: protocols,
    clearable: true,
    rules:true,
    hide:hide,
    value:''
  },
  {
    key: "port",
    label: "端口",
    type: "input",
    isType: "port",
    customType: "port",
    clearable: true,
    rules:true,
    hide:hide,
    value:null
  },
]);

//数据初始化
const initData=()=>{
  queryType().then(res=>{
   let {code,data}=res||{}
   data=data||{}
   if(code==200&&data){
    let params=JSON.parse(JSON.stringify(data))
    let i=handleGetIndex(formColumns.value,'key','typeCode')
    formColumns.value[i].value=[]
    params.forEach(item=>{
      //获取告警配置
      item.key=item.type
      item.value=item.typeCode
      //将status为1的赋值给告警配置的value  status-1--开启 status-0--关闭
      item.status&&formColumns.value[i].value.push(item.typeCode)
      //默认选中了邮箱下面的邮箱设置的参数则显示
      hide.value=!formColumns.value[i].value?.includes(2)
      //当typeCode==2时，为邮箱配置，此时的extra参数为邮箱配置的相关参数
      if(item.typeCode==2){
        //将邮箱配置的参数赋值给对应的formColumns的对应value
        for(let key in item.mailConfig){
          formColumns.value.find(child=>{
            if(child.key==key){
              child.value=item.mailConfig[key]
            }
          })
        }
      }
    })
    typeCode.value=params
   }
  })
}   
//保存按钮的事件
const handlerToSubmit=(data)=>{
  let params={}
  params.typeCode= data.typeCode?.toString(',')
  params.mailConfig=JSON.parse(JSON.stringify(data))
  delete params.mailConfig.typeCode
  saveType(params).then(res=>{
    let {code,message}=res||{}
    if(code==200){
      yaMessage(message,'success')
    }
  }).finally(()=> initData())
}
//字典数据
const initDict=()=>{
  getDictTypeList('alarmMailProtocol').then(res=>{
    protocols.value=res
  })
}
onMounted(()=>{
initData()
initDict()
})
</script>
