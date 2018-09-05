<template>
    <div class="download-wrapper">
        <div class="container">
            <div class="download">
                <div class="top">
                    <span>首页 ></span>
                    <router-link :to="{path: '/resource'}" tag="a">校园资源 ></router-link>
                    <!-- <span>校园资源 ></span> -->
                    <b>教学资源</b>
                </div>
                <div class="download-content clearfix" v-if="!nodata">
                    <div class="span6">
                        <div class="left">
                            <img :src="resource.iconPath|addImg" alt="">
                        </div>
                    </div>
                    <div class="span6">
                        <div class="right">
                            <h1 class="name">{{resource.title}}</h1>
                            <div class="text">课件类型 : {{resource.fileType}}</div>
                            <div class="text">课件大小 : {{resource.fileSize}}</div>
                            <div class="text">上传时间 : {{resource.publishDate}}</div>
                            <a :href="resource.downLoadPath|addFile" class="button" download="resource.downLoadPath">下载</a>
                        </div>
                    </div>
                </div>
                <div class="desc" v-if="!nodata">
                    <span class="intro">课件简介:</span>
                    <div class="content" v-html="resource.desc"></div>
                </div>
                <div class="loading-container" v-show="!isload">
                    <loading></loading>
                </div>
                <div v-if="nodata">
                    <nodata></nodata>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/base/loading/Loading'
import Nodata from '@/base/nodata/Nodata'
import {getResourceDetail} from '@/api/dynamic'
import config from '@/common/config'
export default {
    data() {
        return {
            isload: false,
            nodata: false,
            resource: {}
        }
    },
    filters: {
        addImg: (url) => {
            return config.FILEHOST + url
        },
        addFile: (url) => {
            return config.FILEHOST + url
        }
    },
    mounted() {
        let id = this.$route.query.rid
        if (id == undefined || id == '' || id == null) {
            this.nodata = true
            this.isload = true
        } else {
            this.getDetail(id)
        }
    },
    methods: {
        getDetail(id) {
            this.isload = false
            this.nodata = false
            getResourceDetail(id).then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows.length < 1) {
                        // console.log("没有数据")
                        this.nodata = true
                    }
                    this.resource = res.rows[0]
                }
            })
        }
    },
    components: {
        Loading,
        Nodata
    }
}
</script>
<style lang="scss" scoped>
    .download-wrapper{
        background: #f4f4f4;
        padding: 20px 0;
        .container{
            background: #fff;
            position: relative;
            padding: 0 26px;
            .download{
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
                .download-content{
                    margin-top: 30px;
                    .left{
                        padding-right: 40px;
                        img{
                            width: 100%;
                        }
                    }
                    .right{
                        .name{
                            font-size: 24px;
                            color: #111;
                            padding-bottom: 20px;
                            line-height: 1;
                        }
                        .text{
                            font-size: 18px;
                            color: #333;
                            padding: 20px 0;
                        }
                        .button{
                            display: block;
                            margin-top: 20px;
                            width: 140px;
                            height: 40px;
                            line-height: 40px;
                            color: #fff;
                            background: $mainColor;
                            border-radius: 5px;
                            text-align: center;
                            font-size: 18px;
                        }
                    }
                }
                .desc{
                    padding: 30px 0;
                    .intro{
                        display: block;
                        font-size: 16px;
                        color: #333;
                    }
                    .content{
                        padding: 20px 0;
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
        }
    }
</style>

