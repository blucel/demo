const LAYOUT = () => import("../../views/layout/index.vue")

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import("../../views/error/404.vue"),
      meta: {
        title: 'ErrorPage',
      },
    }
  ]
}
