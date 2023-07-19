<!--
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-05 16:20:25
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-07-06 14:10:53
 * @FilePath: \safe-product-authority-browser\app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-config-provider :locale="locale">
    <YaLayout>
      <router-view></router-view>
    </YaLayout>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = zhCn;
</script>

<style></style>
