<!--
 * @Author: changjun
 * @FilePath: /safe-product-authority-browser/src/views/layout/index.vue
 * @Date: 2022-08-03 14:05:47
 * @Description: 
 * @LastEditTime: 2023-07-10 09:50:25
 * @LastEditors: 李佐宁 lizuoning@yuan-info.com
-->
<script setup lang="ts">
import { ref, Transition } from 'vue'
import { LayoutDataItem,dataQueryById } from 'yuan-pluss'
import { useRouter, useRoute } from 'vue-router';
import HeaderRight from './HeaderRight.vue'
import { useUserStoreWithOut } from '@/store/modules/users'
import { matchingErroUpRouter } from '../../router/helper/menuHelper'

const router = useRouter()
const route = useRoute()
const userStore = useUserStoreWithOut()

console.log('route', route.meta);

const name = ref('浙江御安信息技术有限公司')
const logo = ref('data:image/png;base64,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')


const defaultActiveId = computed(() => {
  console.log('router', router)
  console.log('route', route);
  const _metaId = route.meta.menuId
  if(_metaId) {
    return _metaId
  }
  
  // 对于跳转到的错误异常页面，首先获取地址上附带的 metaid 参数
  // 该参数会在所有对于异常跳转的地方拼上当前的菜单 id，用于获取异常情况下对于菜单 id 的定位

  const queryMenuId = route.query?.menuid
  if(queryMenuId) {
    return Number(queryMenuId)
  }
  // 再做一次处理，此处理可能用不到，兼容没有携带异常的 metaid 的情况，通过 url 去查找上一层
  const errMetaId = matchingErroUpRouter(route.path, getLayoutMenu.value, route.params.path[route.params.path.length - 1])
  if(errMetaId) {
    return Number(errMetaId)
  }
  // 默认返回第一级菜单 Id
  return getLayoutMenu.value[0]?.id || ''
})


const getLayoutMenu = computed(() => {
  console.log('getLayoutMenu', userStore.getLayoutMenu)
  return userStore.getLayoutMenu
})

const menuData: LayoutDataItem[] = getLayoutMenu.value

const select = (id) => {
  console.log('select', id)
  const _item = dataQueryById(menuData, id)
  let toPath = getAfterHandlePath(_item, menuData)
  routerToOpenByPath(toPath, _item, router)
} 


function getAfterHandlePath(item, menuData) {
  const { parentId, id, level, path ='' } = item

  if(path !== '') return path;
  
  let toPath = path || ''
  let oneItem = null as any
  let towItem = null as any

  if(level === 1) {
    toPath = '/404'
  }

  if(level === 2) {
    oneItem = dataQueryById(menuData, parentId)
    toPath = oneItem.path + '/404'
  }

  if(level === 3) {
    towItem = dataQueryById(menuData, parentId)
    oneItem = dataQueryById(menuData, towItem.parentId)
    toPath = oneItem.path + '/' + towItem.path + '/404'
  }

  // 对于没有 path 的情况下跳转 404 拼接上当前 metaid
  return `${toPath}?menuid=${id}`
}

function routerToOpenByPath(path, item, router){
  const { target = '' } = item
  const isUrl = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(path);
  if(target === '_blank') {
    const _href = isUrl ? path : router.resolve(path).href
    window.open(_href, '_blank')
    return;
  }
  router.push(path)
}
</script>

<template>
  <YaLayout :name="name" :logo="logo" size="small" :data="menuData" :default-active-id="defaultActiveId" @select="select">
    <template #headerRight>
      <HeaderRight></HeaderRight>
    </template>
    <router-view v-slot="{ Component }">
      <Transition name="fade-page" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" />
      </Transition>
    </router-view>
  </YaLayout>
</template>

<style>
.custom-page-transition-view {
  width: 100%;
  height: 100%;
}
</style>
