<template>
    <div>
        <div class="onlineBook">
            <div class="list-item" v-for="(item,index) in list" :key="index">
                <router-link :to='{path: "/book", query:{bid: item.bookId}}' class="item clearfix" tag="a" target="_blank">
                    <div class="image">
                        <img :src="item.iconPath|addImg" alt="">
                    </div>
                    <div class="rightBox">
                        <h1 class="title">{{item.bookName}}</h1>
                        <div class="intro">{{item.author}}&nbsp;&nbsp;{{item.press}}&nbsp;&nbsp;{{item.publishDate}}</div>
                        <div class="desc">{{item.description}}</div>
                    </div>
                </router-link>
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
    </div>
</template>
<script>
import Loading from '@/base/loading/Loading'
import Nodata from '@/base/nodata/Nodata'
import config from '@/common/config'
import {getOnlineBook} from '@/api/dynamic'
export default {
    data() {
        return {
            showItem:4,//页码显示条数
            allpage: 0,//总页数
            current:1,//当前页
            nodata: false,
            isload: false, //是否加载完成
            list: [] //课程列表
        }
    },
    filters: {
        addImg: (url) => {
            return config.FILEHOST + url
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
        this.getList(this.current)
    },
    methods: {
        // 获取图书列表
        getList(pageIndex) {
            this.isload = false
            this.nodata = false
            getOnlineBook(pageIndex, 5).then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows.length < 1) {
                        // console.log("没有数据")
                        this.nodata = true
                    }
                    this.list = res.rows
                    this.allpage = res.totalPageCount
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
    components: {
        Loading,
        Nodata
    }
}
</script>
<style lang="scss" scoped>
    .onlineBook{
        min-height: 900px;
        padding-bottom: 160px;
        position: relative;
        padding-top: 10px;
        .list-item{
            .item{
                display: block;
                padding: 20px;
                transition: all .3s linear;
                .image{
                    float: left;
                    width: 158px;
                    height: 158px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .rightBox{
                    padding-left: 178px;
                    .title{
                        font-size: 16px;
                        color: #333;
                    }
                    .intro{
                        padding: 10px 0 10px;
                        font-size: 14px;
                        color: #666;
                    }
                    .desc{
                        color: #999;
                    }
                }
                &:hover {
                    background: #f5f5f5;
                }
            }
        }
    }
</style>

