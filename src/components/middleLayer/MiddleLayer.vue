<template>
    <div class="listWrapper">
        <div class="left">
            <router-view/>
        </div>
        <div class="right" v-if="rightArr.length>0">
            <right-nav :array="rightArr"></right-nav>
        </div>
    </div>
</template>
<script>
import RightNav from '@/components/rightNav/RightNav'
import Axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            rightArr: [
            ],
            // a: this.$route.path
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        this.getNav()
    },
    methods: {
        getNav() {
            let id = this.$route.path.split('/')[1]
            // console.log(id)
            if (id == 'school') {
                // console.log('进来了')
                this.rightArr = [
                    {
                        path: '/school/1',
                        name: '学校简介',
                        type: 1
                    },
                    {
                        path: '/school/2',
                        name: '现任领导',
                        type: 2
                    },
                    {
                        path: '/school/3',
                        name: '校园风采',
                        type: 1
                    },
                    {
                        path: '/school/4',
                        name: '学校荣誉',
                        type: 3
                    },
                    {
                        path: '/school/5',
                        name: '校训校徽校歌',
                        type: 1
                    }
                ]
                return
            }
            if (id == 'resource') {
                this.rightArr = [
                    {
                        path: '/resource/1',
                        name: '在线课堂',
                        type: 1
                    },
                    {
                        path: '/resource/2',
                        name: '教学资源',
                        type: 2
                    },
                    {
                        path: '/resource/3',
                        name: '数字图书馆',
                        type: 1
                    }
                ]
                return
            }
            Axios.get('./static/data' + id + '.json').then(res => {
                let asycR = res.data.data
                let result = []
                for (let i = 0; i < asycR.length; i++) {
                    let object = {}
                    object.path = '/' + id + "/" + asycR[i].id
                    object.name = asycR[i].name
                    result.push(object)
                }
                this.rightArr = result
            })
        }
    },
    watch: {
        $route(to, from){
            this.getNav()
        }
    },
    components: {
        RightNav
    }
}
</script>
<style>
    .listWrapper{
        background: #f5f5f5;
        position: relative;
    }
    .left{
        width: 70%;
        height: 200px;
        background: red;
    }
    .right{
        position: absolute;
        right: 0;
        top: 0;
        width: 30%;
        height: 100%;
    }
</style>
