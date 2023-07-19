import { useRoute, useRouter } from "vue-router"

/**
 * @author: changjun
 * @returns toButtonRouter 跳转方法，传入 path和要追加的参数
 * @description: 页面级按钮跳转方法，主要拼接上当前菜单 id 以应对异常情况
 */
export const useToButtonRouter = () => {
  const route = useRoute()
  const router = useRouter()
  const menuId = route.meta?.menuId

  function toButtonRouter(path, params = {} as any){
    router.push({
      path,
      query: {
        menuId,
        ...params
      }
    })
  }
  
  return {
    toButtonRouter
  }
}
