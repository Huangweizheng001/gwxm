<template>
    <div>
        <div class="teachResource">
            <select-box @select="onSelect"></select-box>
            <div class="teachResource-list">
                <div class="list-item" v-for="item in list">
                    <router-link :to='{path: "/download", query:{rid: item.resourceId}}' class="item" tag="a" target="_blank">
                        <i class="circle"></i>
                        {{item.title}}
                        <span class="time"><b></b>{{item.publishDate}}</span>
                    </router-link>
                    <!-- <a target="_blank" class="item" @click="goToDetail(item.newsId)">
                        <i class="circle"></i>
                        {{item.name}}
                        <span class="time"><b></b>{{item.reportDate}}</span>
                    </a> -->
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
import SelectBox from '@/base/selectBox/SelectBox'
import Loading from '@/base/loading/Loading'
import Nodata from '@/base/nodata/Nodata'
import {getResourceList} from '@/api/dynamic'
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
            console.log(subjectId + '-' + gradeId + '-' + termId)
            this.subjectId = subjectId
            this.gradeId = gradeId
            this.termId = termId
            this.current = 1
            this.getTeachResource(this.subjectId, this.gradeId, this.termId, this.current)
        },
        // 获取教学资源列表
        getTeachResource(subjectId, gradeId, termId, pageIndex) {
            this.isload = false
            this.nodata = false
            getResourceList(subjectId, gradeId, termId, pageIndex, 9).then(res => {
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
            this.getTeachResource(this.subjectId, this.gradeId, this.termId, this.current)
        }
    },
    components: {
        SelectBox,
        Loading,
        Nodata
    }
}
</script>
<style lang="scss" scoped>
    .teachResource{
        min-height: 900px;
        padding-bottom: 160px;
        position: relative;
        .teachResource-list{
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
    }
</style>
