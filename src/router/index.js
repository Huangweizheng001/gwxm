import Vue from 'vue'
import Router from 'vue-router'
import {getHeadNav} from '@/api/dynamic'
import MiddleLayer from '@/components/Layout/middleLayer/MiddleLayer'
import Detail from '@/components/detail/Detail'
import Textures from '@/components/textures/Textures'
import List from '@/components/list/List'
import Index from '@/components/index/Index'
import Threed from '@/components/threed/Threed'
import OnlineClass from '@/components/onlineClass/OnlineClass'
import TeachResource from '@/components/teachResource/TeachResource'
import Download from '@/components/teachResource/Download'
import Tips404 from '@/base/404/404'
import DigitalLibrary from '@/components/digitalLibrary/DigitalLibrary'
import BooK from '@/components/digitalLibrary/BooK'
import SchoolHonor from '@/components/schoolInfo/SchoolHonor'
import SchoolSong from '@/components/schoolInfo/SchoolSong'
import SchoolStyle from '@/components/schoolInfo/SchoolStyle'


Vue.use(Router)
let indexRouter = new Router({
  mode:'history',
  routes: [
    // 静态路由
    {
      path: '/',
      redirect: '/index'
    },
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
          component: SchoolStyle
        },
        {
          path: '4',
          name: '学校荣誉',
          component: SchoolHonor
        },
        {
          path: '5',
          name: '校训校徽校歌',
          component: SchoolSong
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
          component: OnlineClass
        },
        {
          path: '2',
          name: '教学资源',
          component: TeachResource
        },
        {
          path: '3',
          name: '数字图书馆',
          component: DigitalLibrary
        }
      ]
    },
    {
      path: '/download',
      name: '资源下载',
      component: Download
    },
    {
      path: '/book',
      name: '电子图书',
      component: BooK
    },
    {
      path:'/33',
      name:'学校新闻',
      component: MiddleLayer,
      redirect:'/33/34',
      children:[
        {
           path:'34',
           name:'校园新闻',
           component:List
        },
        {
           path:'35',
           name:'专属报道',
           component:List
        },
        {
           path:'36',
           name:'在线课堂  ', 
           component:List
        }
      ]
    },
    // {
    //   path:'*',
    //   name:'/tips',
    //   component: Tips404
    // }
  ]
})
// 添加动态路由
getHeadNav().then(res => {
  if (res.code == 200) {
    let router = res.rows
    let asyc = getAsycRouter(router)
    indexRouter.addRoutes(asyc)
    let search = searchRouter(router)
    // console.log(search)
    indexRouter.addRoutes(search)
  }
  
})
// 遍历创建路由表
function getAsycRouter(object) {
  let result = []
  for (let i = 0; i < object.length; i++) {
    let temporary = {}
    if (object[i].children) {
      let child = object[i].children
      temporary.redirect = object[i].newsTypeId + '/' + child[0].newsTypeId
      let childArr = []
      for (let j = 0; j < child.length; j++) {
        let childItem = {}
        childItem.path = '/' + object[i].newsTypeId + '/' + child[j].newsTypeId
        childItem.name = child[j].name
        childItem.component = getType(child[j].mode)
        childArr.push(childItem)
      }
      temporary.children = childArr
    }
    temporary.path = '/' + object[i].newsTypeId
    temporary.name = object[i].name
    temporary.component = MiddleLayer
    result.push(temporary)
  }
  return result
}
//遍历创建search路由
function searchRouter(obj) {
  // console.log(obj)
  let result = []
  let temporary = {}
  let childArr = []
  childArr.push({path: '/search/0', name: '全部',component: List})

  for (let i = 0; i < obj.length; i++) {
    let childItem = {}
    childItem.path = '/search/' + obj[i].newsTypeId
    childItem.name = obj[i].name + " "
    childItem.component = List
    childArr.push(childItem)
  }
  temporary.redirect = 'search/0'
  temporary.children = childArr
  temporary.path = '/search'
  temporary.name = '搜索'
  temporary.component = MiddleLayer
  result.push(temporary)
  return result
}
function getType(type) {
  let str
  switch (type) {
    case '1':
      str = List
      break
    case '2':
      str = Textures
      break
    case '3':
      str = Threed
      break
  }
  return str
}
export default indexRouter
