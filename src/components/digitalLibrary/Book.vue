<template>
    <div class="book">
        <div class="container">
             <div class="top">
                <span>首页 ></span>
                <router-link :to="{path: '/resource'}" tag="a">校园资源 ></router-link>
                <!-- <span>校园资源 ></span> -->
                <b>数字图书馆</b>
            </div>
            <div class="detail" v-if="!nodata">
                <iframe v-if="data.downLoadPath" id="myiframe" :src="data.downLoadPath | addFile" style="border: none; width: 100%; height: 920px;"></iframe>
            </div>
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
import {getBookDetail} from '@/api/dynamic'
import config from '@/common/config'
export default {
    data() {
        return {
            data: {},
            isload: false,
            nodata: false,
        }
    },
    filters: {
        addFile: (url) => {
            return config.FILEHOST + url 
        }
    },
    mounted() {
        let id = this.$route.query.bid
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
            getBookDetail(id).then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows.length < 1) {
                        // console.log("没有数据")
                        this.nodata = true
                    }
                    this.data = res.rows[0]
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
    .book{
        background: #f4f4f4;
        padding: 20px 0;
        .container{
            background: #fff;
            position: relative;
            padding: 0 26px;
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
            .detail{
                padding: 20px 0;
            }
        }
    }
</style>

