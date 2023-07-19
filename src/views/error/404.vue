<!--
 * @Author: changjun
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/views/error/404.vue
 * @Date: 2022-08-10 17:29:57
 * @Description: 
 * @LastEditTime: 2022-08-24 14:31:53
 * @LastEditors: ChangJun
-->
<template>
  <ya-error :type="type"></ya-error>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute()
    console.log('异常页面', route)
    const errorCodes = [403, 404, 504, 502]
    const routePaths = route.params?.path || ''
    const currentPath = routePaths[routePaths.length - 1] || '404'
    let code = 404
    if(errorCodes.includes(Number(currentPath))) {
      code = Number(currentPath)
    } 
    let type = ref(0)
    type.value = Number(code)

    return {
      ref,
      useRoute,
      route,
      type,
    };
  },
});
</script>
