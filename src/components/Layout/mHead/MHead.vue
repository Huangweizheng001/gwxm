<template>
    <div class="m-head">
        <div class="container">
            <!-- <div class="nav-item">
                <router-link tag="a" to="/index" class="item">
                    <span>首页</span>
                </router-link>
            </div> -->
        
            <!-- 静态学校概况路由 -->
            <!-- <div class="nav-item" v-for="(item,index1) in schoolRouter" >
                <router-link tag="a" to="/school" class="item">
                    <span>{{item.name}}</span>
                </router-link>
                <div class="dropdown-box">
                    <div class="dropdown-Item" v-for="(i,index2) in item.children">
                        <router-link tag="a" :to="i.path" >
                            <span>{{i.name}}</span>
                        </router-link>
                    </div>
                </div>
            </div> -->
        
            <!-- 动态路由 -->
            <!-- eslint-disable-next-line -->
            <div v-for="(item,index3) in routers"  class="nav-item" :key="index3">
                <router-link tag="a" :to="item.path" class="item" v-if="item.path != '/zhxy'">
                    <span>{{item.name}}</span>
                </router-link>
                <a href="http://www.baidu.com" class="item" v-else target="_blank">智慧校园</a>
                <div class="dropdown-box">
                    <div class="dropdown-Item" v-for="(i,index4) in item.children" :key="index4">
                        <router-link tag="a" :to="i.path">
                            <span>{{i.name}}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        
            <!-- 静态校园资源路由 -->
            <!-- <div class="nav-item" v-for="(item,index5) in resourceRouter" >
                <router-link tag="a" to="/resource" class="item">
                    <span>{{item.name}}</span>
                </router-link>
                <div class="dropdown-box">
                    <div class="dropdown-Item" v-for="(i,index6) in item.children" >
                        <router-link tag="a" :to="i.path" >
                            <span>{{i.name}}</span>
                        </router-link>
                    </div>
                </div>
            </div> -->
            <!-- <div class="nav-item">
                <a href="#this" class="item">智慧校园</a>
            </div> -->
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {getHeadNav} from '@/api/dynamic'
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
        getHeadNav().then(res => {
            if (res.code == 200) {
                let asycR = res.rows
                // console.log(asycR)
                // let result = []
                this.routers.push({path: '/index',name: '首页'})
                this.routers.push(this.schoolRouter[0])
                for (let i = 0; i < asycR.length; i++) {
                    let object = {}
                    if (asycR[i].children) {
                        let child = asycR[i].children
                        let childArr = []
                        for (let j = 0; j < child.length; j++) {
                            let childItem = {}
                            childItem.path = '/' + asycR[i].newsTypeId + '/' + child[j].newsTypeId
                            childItem.name = child[j].name
                            childArr.push(childItem)
                        }
                        object.children = childArr
                    }
                    object.path = '/' + asycR[i].newsTypeId
                    object.name = asycR[i].name
                    // result.push(object)
                    this.routers.push(object)
                }
                this.routers.push(this.resourceRouter[0])
                this.routers.push({path: '/zhxy' , name: '智慧校园'})
                // this.routers = result
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .m-head{
        background: $mainColor;
        height: 60px;
        .container{
            display: table;
            .nav-item{
                display: table-cell;
                width: 1%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                position: relative;
                a.item{
                    display: block;
                    color: #fff;
                    font-size: 18px;
                    span{
                        display: inline-block;
                        padding: 0 4px;
                        height: 60px;
                        line-height: 60px;
                        box-sizing: border-box;
                    }
                }
                .dropdown-box{
                    display: none;
                    position: absolute;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,.7);
                    z-index: 100;
                    .dropdown-Item{
                        font-size: 18px;
                        height: 45px;
                        line-height: 45px;
                        a{
                            display: block;
                            color: #fff;
                        }
                        &:hover{
                            background: $mainColor;
                        }
                    }
                }
                &:hover .dropdown-box{
                    display: block;
                }
                .router-link-active.item{
                    span{
                        border-bottom: 3px solid #fff;
                    }
                }
            }
        }

    }
</style>

