<template>
    <div class="list-wrapper">
        <div v-if="isShowList" class="list-content">
            <div class="list-item" v-for="item in listArr">
                <router-link :to='{path: currentPath, query:{nid: item.id}}' class="item" tag="a" target="_blank">
                    <i class="circle"></i>
                    {{item.name}}
                    <span class="time"><b></b>{{item.reportDate}}</span>
                </router-link>
                <!-- <a target="_blank" class="item" @click="goToDetail(item.newsId)">
                    <i class="circle"></i>
                    {{item.name}}
                    <span class="time"><b></b>{{item.reportDate}}</span>
                </a> -->
            </div> 
            <!--枫叶-->
            <ul class="pagenationbox" style="position: absolute;bottom: 0;left: 0;right: 0">
                <li v-cloak v-show="current != 1" @click="current-- && goto(current--)">
                    <a href="#this">上一页</a>
                </li>
                <li v-cloak v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                    <a href="#this">{{index}}</a>
                </li>
                <li v-cloak v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
                    <a href="#this">下一页</a>
                </li>
            </ul>
            <div class="loading-container" v-show="!isload">
                <loading></loading>
            </div>
            <div v-if="nodata">
                <nodata></nodata>
            </div>
        </div>
        <div v-if="!isShowList" class="detail">
            <div class="loading-container" v-show="!isload">
                <loading></loading>
            </div>
            <div class="title">{{detail.name}}</div>
            <p class="time">发布时间 : {{detail.reportDate}}</p>
            <div class="desc" v-html="detail.newsDetail"></div>
            <!-- <div class="enclosure">
                <span>附件:</span>
                <a href="#this">清华丘成桐数学科学中心华丘成桐数学科华丘成桐数学科</a>
            </div> -->
        </div>
    </div>
</template>
<script>
import Loading from '@/base/loading/Loading'
import Nodata from '@/base/nodata/Nodata'
import {schoolSong, schoolSongDetail} from '@/api/dynamic'
export default {
    data() {
        return {
            isShowList: true, //判断是否展示列表状态
            showItem:4,//页码显示条数
            allpage: 0,//总页数
            current:1,//当前页
            listArr: [], //列表数组
            nodata: false, //没有数据
            currentPath: '', //当前路由地址
            detail: {}, //详情信息
            isload: false //是否加载完成
        }
    },
    computed: {
        pages: function() {
            var pag = [];
            if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while(i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if(middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while(i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    mounted() {
        this.isShowList = this.$route.query.nid == undefined ? true : false
        if (this.isShowList) {
            // 加载列表
            this.getList(1)
        } else {
            // 加载详情
            this.getDetail()
        }  
    },
    methods: {
        getList(pageIndex) {//默认列表
            // 获取二级导航id
            this.currentPath = this.$route.path
            this.isload = false
            this.nodata = false
            schoolSong().then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows.length < 1) {
                        // console.log("没有数据")
                        this.nodata = true
                    }
                    this.listArr = res.rows
                    this.allpage = res.totalPageCount
                }
            })
        },
        getDetail() {//单条详情
            this.isload = false
            // console.log(this.$route.query.nid)
            schoolSongDetail(this.$route.query.nid).then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows && res.rows.length > 0) {
                        this.detail = res.rows[0]
                    }
                }
            })
        },
        goto: function(index) { //枫叶处理
            var _this=this;
            if(index == this.current) return;
            if(index > this.allpage) {
                this.current = this.current - 2;
                // layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            this.current = index;
            this.getList(this.current)
        }
    },
    watch: {
        // 监听路由变化
        $route(to, from){
            this.isShowList = this.$route.query.nid == undefined ? true : false
            if (this.isShowList) {
                // 加载列表
                this.getList(1)
            } else {
                // 加载详情
                this.getDetail()
            }
        }
    },
    components: {
        Loading,
        Nodata
    }
}
</script>
<style lang="scss" scoped>
    .list-wrapper{
        position: relative;
        min-height: 900px;
        .list-content{
            padding-bottom: 160px;
            .list-item{
                padding: 20px 0;
                border-bottom: 1px solid #ededed;
                box-sizing: border-box;
                .item{
                    display: block;
                    font-size: 14px;
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-right: 160px;
                    position: relative;
                    .circle{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border: 2px solid $mainColor;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    .time{
                        position: absolute;
                        right: 0;
                        color: #999;
                        b{
                            display: inline-block;
                            margin-top: 2px;
                            margin-right: 5px;
                            width: 14px;
                            height: 14px;
                            background: url('time-icon.png') no-repeat center
                        }
                    }
                    &:hover{
                        color: $mainColor;
                    }
                }
            }
        }
        .detail{
            padding-bottom: 70px;
            .title{
                font-size: 32px;
                color: #111;
                padding: 30px 0;
                text-align: center;
            }
            .time{
                text-align: right;
                font-size: 12px;
                color: #999;
                padding-bottom: 10px;
                border-bottom: 1px solid #e6e6e6;
            }
            .desc{
                padding: 20px 0;
                font-size: 14px;
                color: #333;
            }
            .enclosure{
                padding-top: 30px;
                span{
                    display: block;
                    padding-bottom: 10px;
                }
                a{
                    color: $mainColor;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
