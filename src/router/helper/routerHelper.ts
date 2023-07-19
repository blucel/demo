/*
 * @Author: changjun
 * @FilePath: /component-library/Users/changjun/yuan/safe-product-authority-browser/src/router/helper/routerHelper.ts
 * @Date: 2022-07-27 09:29:27
 * @Description: 
 * @LastEditTime: 2022-08-24 14:57:53
 * @LastEditors: ChangJun
 */
const LAYOUT = () => import("../../views/layout/index.vue")
const NOT_FOUND = ()=> import("../../views/error/404Error.vue")

const getRouterName = (router) => {
	const { url = '' } = router
	if (url === '') return ''
	const arr = url.split('/')
	return arr[arr.length - 1]
}


function getViews(path) {
  let modules = import.meta.glob('../../views/**/*.vue')
  return modules['../../views' + path + '.vue']
}

const getLevel4Router = (_list) => {
	const result = [] as any
	_list.forEach(item => {
		const { children = [] } = item
		if (children.length > 0) {
			result.push(...children)
			delete item.children
		}
	})
	return result
}


/**
 * @description: 将后端菜单转换成前端路由
 * @param {*} list 后端菜单（只包含页面级）
 * @return {*} 返回前端路由
 * @author: changjun 
 */
export const transformBackMenuToRouter = (list) => {
	const result = [] as any
	list.forEach(item => {
		let { url = '', level, children, ...other } = item
		const name = getRouterName(item)
		let  _children = children ? transformBackMenuToRouter(children) : []
		const _redirect = _children.length > 0 ? _children[0].path : ''
	

		const meta = {
			title: item.label,
			level: level,
			...other
		}


		const newItem = {
			path: url,
			name,
			meta,
		} as any
		// 一级路由需要设置 布局组件
		if (level === 1) {
			newItem.component = LAYOUT
		} else {
			newItem.component = getViews(url)
		}

		// 有子在追加
		if(_children.length > 0) {
			newItem.children = _children
		}

		if(_redirect && level < 3){
			newItem.redirect = _redirect
		}
		
		// 如果是二级并且有子路由的情况下，需要将四级按钮级路由提取到三级下
		if(level === 2 && newItem.children && newItem.children.length>0) {
			const _getLevel4Router = getLevel4Router(newItem.children)
			newItem.children = [...newItem.children, ..._getLevel4Router]
		}
		// 当层级大于 1 并且没有重定向（没有子路由）并且前端匹配不到对应组件的时候，将其组件设置到 404
		if(level > 1 && !newItem.redirect  && !newItem.component){
			newItem.component = NOT_FOUND
		}
		
		// 过滤 url 为空的路由
		if(newItem.path !== ''){
			result.push(newItem)
		}
	})

	return result
}






/**
 * @description: 过滤后端菜单中的权限按钮
 * @param {*} list 后端菜单
 * @return {*} 过滤后的菜单
 * @author: changjun
 */
export const filterButtonBackMenu = (list) => {
	const result = [] as any
	list.forEach((item) => {
		const { children, ...other } = item;
		let _children = children.length > 0 ? filterButtonBackMenu(children) : []
		const newItem = {
			...other,
		}
		// 判断是否仅有三级路由，意味三级是按钮级别页面，如果有则需要提取到二级同一层级下
		const hasOnlyThreeLevel = other.level === 2 && _children.length > 0 && _children.every(item => item.level === 3 && item.perType === 1 && item.isPage === 0)

		if(hasOnlyThreeLevel) {
			_children.forEach(item => {
				result.push(item)
			})
			_children = []
		}

		if(_children.length > 0){
			newItem.children = _children
		}

		if (other.perType === 0) {
			result.push(newItem)
		}
		if( other.perType === 1 && other.isPage === 0) {
			result.push(newItem)
		}
	}
	)
	return result
}

