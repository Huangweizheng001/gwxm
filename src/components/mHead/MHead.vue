<template>
    <div>
        <div class="item">
            <router-link tag="a" to="/index">
                <span>首页</span>
            </router-link>
        </div>
        
        <!-- 静态学校概况路由 -->
        <div class="item" v-for="(item,index1) in schoolRouter" >
            <router-link tag="a" to="/school" >
                <span>{{item.name}}</span>
            </router-link>
            <div class="listItem">
                 <div class="list" v-for="(i,index2) in item.children">
                    <router-link tag="a" :to="i.path" >
                        <span>{{i.name}}</span>
                    </router-link>
                </div>
            </div>
        </div>
        
        <!-- 动态路由 -->
        <!-- eslint-disable-next-line -->
        <div v-for="(item,index3) in routers"  class="item" :key="index3">
            <router-link tag="a" :to="item.path">
                <span>{{item.name}}</span>
            </router-link>
            <div class="listItem">
                <div class="list" v-for="(i,index4) in item.children" :key="index4">
                    <router-link tag="a" :to="i.path">
                        <span>{{i.name}}</span>
                    </router-link>
                </div>
            </div>
        </div>
        
        <!-- 静态校园资源路由 -->
        <div class="item" v-for="(item,index5) in resourceRouter" >
            <router-link tag="a" to="/school" >
                <span>{{item.name}}</span>
            </router-link>
            <div class="listItem">
                 <div class="list" v-for="(i,index6) in item.children" >
                    <router-link tag="a" :to="i.path" >
                        <span>{{i.name}}</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Axios from 'axios'
import {getRouter} from '../../router/index'
export default {
    data() {
        return {
            // 学校概况
            schoolRouter:[
                {
                    path: '/school',
                    name: '学校概况',
                    children: [
                        {
                            path: '/school/1',
                            name: '学校简介'
                        },
                        {
                            path: '/school/2',
                            name: '现任领导'
                        },
                        {
                            path: '/school/3',
                            name: '校园风采'
                        },
                        {
                            path: '/school/4',
                            name: '学校荣誉'
                        },
                        {
                            path: '/school/5',
                            name: '校训校徽校歌'
                        }
                    ]
                }
            ],
            // 校园资源
            resourceRouter:[
                {
                    path: '/resource',
                    name: '校园资源',
                    children: [
                        {
                            path: '/resource/1',
                            name: '在线课堂'
                        },
                        {
                            path: '/resource/2',
                            name: '教学资源'
                        },
                        {
                            path: '/resource/3',
                            name: '数字图书馆'
                        }
                    ]
                }
            ],
            routers: []
        }
    },
    created() {
        // 获取动态路由链接
        Axios.get('./static/data.json').then(res => {
            let asycR = res.data.data
            // console.log(asycR)
            let result = []
            for (let i = 0; i < asycR.length; i++) {
                let object = {}
                if (asycR[i].children) {
                    let child = asycR[i].children
                    let childArr = []
                    for (let j = 0; j < child.length; j++) {
                        let childItem = {}
                        childItem.path = '/' + asycR[i].id + '/' + child[j].id
                        childItem.name = child[j].name
                        childArr.push(childItem)
                    }
                    object.children = childArr
                }
                object.path = '/' + asycR[i].id
                object.name = asycR[i].name
                result.push(object)
            }
            this.routers = result
        })
    },
    methods: {

    }
}
</script>
<style>
    .item{
        display: inline-block;
        padding: 20px;
        position: relative;
    }
    .item a{
        color: #000;
    }
    .listItem{
        display: none;
        position: absolute;
        z-index: 1000;
    
    }
    .item:hover .listItem {
        display: block
    }
    .item .router-link-active{
        color:yellow
    }
</style>

