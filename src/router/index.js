import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import {mapMutations} from 'vuex'
// const _import = require('./_import_' + process.env.NODE_ENV)
import Index from '@/components/index/Index'
import MiddleLayer from '@/components/middleLayer/MiddleLayer'
import Detail from '@/components/detail/Detail'
import Textures from '@/components/textures/Textures'
import Card from '@/components/card/Card'
import List from '@/components/list/List'
import Store from '@/store/index'

Vue.use(Router)
let indexRouter = new Router({
  routes: [
    // 静态路由
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
      path: '/school',
      name: '学校概况',
      redirect: '/school/1',
      component: MiddleLayer,
      children: [
        {
          path: '1',
          name: '学校简介',
          component: Detail
        },
        {
          path: '2',
          name: '现任领导',
          component: Textures
        },
        {
          path: '3',
          name: '校园风采',
          component: Card
        },
        {
          path: '4',
          name: '学校荣誉',
          component: Card
        },
        {
          path: '5',
          name: '校训校徽校歌',
          component: List
        }
      ]
    },
    {
      path: '/resource',
      name: '校园资源',
      redirect: '/resource/1',
      component: MiddleLayer,
      children: [
        {
          path: '1',
          name: '在线课堂',
          component: Card
        },
        {
          path: '2',
          name: '教学资源',
          component: Card
        },
        {
          path: '3',
          name: '数字图书馆',
          component: Card
        }
      ]
    }
  ]
})
// 添加动态路由
Axios.get('./static/data.json').then(res => {
  let router = res.data.data
  // router = filterAsyncRouter(getAsycRouter(router))
  router = getAsycRouter(router)
  indexRouter.addRoutes(router)
})
// 遍历创建路由表
function getAsycRouter(object) {
  let result = []
  for (let i = 0; i < object.length; i++) {
    let temporary = {}
    if (object[i].children) {
      let child = object[i].children
      temporary.redirect = object[i].id + '/' + child[0].id
      let childArr = []
      for (let j = 0; j < child.length; j++) {
        let childItem = {}
        childItem.path = '/' + object[i].id + '/' + child[j].id
        childItem.name = child[j].name
        childItem.component = getType(child[j].type)
        childArr.push(childItem)
      }
      temporary.children = childArr
    }
    temporary.path = '/' + object[i].id
    temporary.name = object[i].name
    temporary.component = MiddleLayer
    result.push(temporary)
  }
  return result
}
// 添加coponent
// function filterAsyncRouter(asyncRouterMap) {
//   const AsycRouter = asyncRouterMap.filter(route => {
//     if (route.component) {
//       route.component = _import(route.component)
//     }
//     if (route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children)
//     }

//     return true
//   })
//   return AsycRouter
// }
function getType(type) {
  let str
  switch (type) {
    case 1:
      str = List
      break
    case 2:
      str = Textures
      break
    case 3:
      str = Card
      break
    case 4:
      str = Card
      break
  }
  return str
}
export default indexRouter
