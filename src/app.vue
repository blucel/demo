<!--
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-05 16:20:25
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
 * @LastEditTime: 2022-12-08 17:29:08
-->
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = zhCn;
localStorage.setItem('YA_THEME', 'true')
</script>

<style lang="scss">
.el-notification.ya-notify {
  --el-notification-width: 460px;
  --el-notification-padding: 24px 24px 16px 24px;
  --el-notification-title-color: rgba(0, 0, 0, 0.8);
  --el-notification-radius: 2px;

  .el-notification__title {
    font-weight: 500;
  }

  .ya-change-pwd-notify-content {
    display: flex;
    flex-direction: column;

    .top {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      display: inline-flex;

      .change-pwd-text {
        display: inline-flex;
        color: #0095ff;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .bottom {
      margin-top: 24px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
