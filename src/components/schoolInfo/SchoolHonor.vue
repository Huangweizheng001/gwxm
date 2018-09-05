<template>
    <div>
        <div class="schoolHonor">
            <div class="onlineClass-content clearfix" v-if="!nodata">
                <div class="span4" v-for="item in list" @click="showView(item.videoId,item.title,item.photo)">
                    <div class="class-item">
                        <div class="image">
                            <img :src="item.photo|addImg" alt="">
                            <div class="mark" v-if="item.videoId"><i></i></div>
                        </div>
                        <div class="name">{{item.title}}</div>
                    </div>
                </div>
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
import Video from '@/components/onlineClass/Video'
import config from '@/common/config'
import {schoolHonor} from '@/api/dynamic'
import ImgsShow from '@/components/index/ImgsShow'
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
            return config.FILEHOST + url.split(',')[0]
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
        this.getList(1)
    },
    methods: {
        // 获取荣誉列表
        getList(pageIndex) {
            this.isload = false
            this.nodata = false
            schoolHonor(pageIndex, 9).then(res => {
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
        showView(id, title, imgs) {//弹框视频or图片
            if (id == '' || id == undefined || id == null) {
                this.$layer.iframe({
                    content: {
                        content: ImgsShow,
                        parent: this,
                        data: {
                            imgs: imgs
                        }
                    },
                    area: ['800px', '600px'],
                    title: title
                })
            }   else {
                this.$layer.iframe({
                    content: {
                        content: Video,
                        parent: this,
                        data: {
                            vid: id
                        }
                    },
                    area: ['800px', '600px'],
                    title: title
                })
            }
            
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
    .schoolHonor{
        min-height: 900px;
        padding-bottom: 160px;
        position: relative;
        .onlineClass-content{
            margin-left: -20px;
            .class-item{
                margin-left: 20px;
                margin-top: 20px;
                cursor: pointer;
                .image{
                    position: relative;
                    width: 100%;
                    height: 170px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .mark{
                        position: absolute;
                        left: 0;
                        width: 100%;
                        top: 0;
                        height: 100%;
                        background: rgba(0,0,0,.3);
                        i{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 30px;
                            height: 30px;
                            margin-top: -15px;
                            margin-left: -15px;
                            background: url('play-icon.png') no-repeat center;
                        }
                    }
                }
                .name{
                    font-size: 16px;
                    color: #333;
                    line-height: 46px;
                    text-align: center;
                    height: 46px;
                    border-bottom: 3px solid transparent;
                    box-sizing: border-box;
                    background: #f6f6f6;
                }
                &:hover .name{
                    background: #fdfafa;
                    color: $mainColor;
                    border-color: $mainColor;
                }
            }
        }
    }
</style>

