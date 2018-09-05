<template>
    <div class="middleLayer">
        <div class="container">
            <div class="left">
                <div class="top">
                    <span>首页 ></span>
                    <router-link :to="{path: '/' + currentPath.split('/')[1]}" tag="a">{{firNavName}} ></router-link>
                    <!-- <span>{{firNavName}} ></span> -->
                    <b>{{subNavName}}</b>
                </div>
                <router-view/>
            </div>
            <div class="right" v-if="rightArr.length>0">
                <right-nav :array="rightArr" :firNavName="firNavName" :isShow="isShow"></right-nav>
            </div>
        </div>
    </div>
</template>
<script>
import RightNav from '@/components/Layout/rightNav/RightNav'
import {getHeadNav, getRightNav} from '@/api/dynamic'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            rightArr: [
            ],
            // 一级导航名字
            firNavName: '',
            // 二级导航名字
            subNavName: '',
            currentPath: '',
            isShow: false //是否显示3d校园
        }
    },
    mounted() {
        this.getNav()
    },
    methods: {
        // 获取右侧路由地址
        getNav() {
            this.subNavName = this.$route.name
            this.currentPath = this.$route.path
            let id = this.$route.path.split('/')[1]
            if (id == 'school') {
                this.firNavName = "学校概况"
                this.isShow = true
                this.rightArr = [
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
                return
            }
            if (id == 'resource') {
                this.firNavName = "校园资源"
                this.isShow = false
                this.rightArr = [
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
                return
            }
            if (id == 'search') {
                this.firNavName = "搜索"
                this.isShow = false
                getHeadNav().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        if (res.rows && res.rows.length > 0) {
                            let searchRouter = res.rows
                            let result = []
                            for (let i = 0; i < searchRouter.length; i++) {
                                let object = {}
                                let keys = this.$route.query.key == undefined ? '' : this.$route.query.key
                                object.path = '/' + id + '/' + searchRouter[i].newsTypeId + '?key=' + keys
                                object.name = searchRouter[i].name
                                result.push(object)
                            }
                            this.rightArr = result
                            return
                        }
                    }
                })
                return
            }
            getRightNav(id).then(res => {
                if (res.code == 200) {
                    if (res.rows && res.rows.length > 0){
                        this.firNavName = res.rows[0].name
                        let asycR = res.rows[0].children;
                        // console.log(asycR)
                        let result = []
                        for (let i = 0; i < asycR.length; i++) {
                            let object = {}
                            object.path = '/' + id + "/" + asycR[i].newsTypeId
                            object.name = asycR[i].name
                            result.push(object)
                        }
                        this.rightArr = result
                        this.isShow = false
                    }
                }
            })
        }
    },
    watch: {
        // 监听路由变化
        $route(to, from){
            // 如果只是二级导航内跳转 不做处理
            if (to.path.split('/')[1] == from.path.split('/')[1]) {
                return
            }
            this.getNav()
        }
    },
    components: {
        RightNav
    }
}
</script>
<style lang="scss" scoped>
    .middleLayer{
        background: #f4f4f4;
        padding: 20px 0;
        .container{
            background: #fff;
            position: relative;
            padding: 0 26px;
            .left{
                margin-right: 360px;
                min-height: 900px;
                .top{
                    border-bottom: 1px solid #eee;
                    height: 50px;
                    padding-top: 15px;
                    box-sizing: border-box;
                    span{
                        font-size: 18px;
                        color: #111;
                        font-weight: 500;
                    }
                    a{
                        font-size: 18px;
                    }
                    b{
                        font-size: 16px;
                        color: $mainColor;
                        font-weight: normal;
                    }
                }
            }
            .right{
                position: absolute;
                right: 26px;
                top: 50px;
                width: 300px;
            }
        }
    }
</style>
