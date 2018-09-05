<template>
    <div>
        <div class="onlineClass">
            <select-box @select="onSelect"></select-box>
            <div class="onlineClass-content clearfix">
                <div class="span4" v-for="item in list" @click="showView(item.videoId,item.courseName)">
                    <div class="class-item">
                        <div class="image">
                            <img :src="item.iconPath|addImg" alt="">
                            <div class="mark"><i></i></div>
                        </div>
                        <div class="name">{{item.courseName}}</div>
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
import SelectBox from '@/base/selectBox/SelectBox'
import Video from '@/components/onlineClass/Video'
import {getOnlineList} from '@/api/dynamic'
import config from '@/common/config'
export default {
    data() {
        return {
            showItem:4,//页码显示条数
            allpage: 0,//总页数
            current:1,//当前页
            subjectId: '',
            gradeId: '',
            termId: '',
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
    methods: {
        // 子组件筛选触发函数
        onSelect(subjectId, gradeId, termId) {
            // console.log(subjectId + '-' + gradeId + '-' + termId)
            this.subjectId = subjectId
            this.gradeId = gradeId
            this.termId = termId
            this.current = 1
            this.getOnlineClass(this.subjectId, this.gradeId, this.termId, this.current)
        },
        // 获取课程列表
        getOnlineClass(subjectId, gradeId, termId, pageIndex) {
            this.isload = false
            this.nodata = false
            getOnlineList(subjectId, gradeId, termId, pageIndex, 9).then(res => {
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
        showView(id, title) {//弹框视频
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
            this.getOnlineClass(this.subjectId, this.gradeId, this.termId, this.current)
        }
    },
    components: {
        SelectBox,
        Loading,
        Video,
        Nodata
    }
}
</script>
<style lang="scss" scoped>
    .onlineClass{
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

