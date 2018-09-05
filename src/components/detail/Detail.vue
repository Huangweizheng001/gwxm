<template>
    <div class="detail">
        <div class="desc" v-if="!nodata" v-html="list.introlduce"></div>
        <div class="loading-container" v-show="!isload">
            <loading></loading>
        </div>
        <div v-if="nodata">
            <nodata></nodata>
        </div>
    </div>
</template>
<script>
import {schoolInfo} from '@/api/dynamic'
import Loading from '@/base/loading/Loading'
import Nodata from '@/base/nodata/Nodata'
export default {
    data() {
        return {
            isload: false,
            nodata: false,
            list: {}
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.isload = false
            this.nodata = false
            schoolInfo().then(res => {
                this.isload = true
                if (res.code == 200) {
                    if (res.rows.length < 1) {
                        // console.log("没有数据")
                        this.nodata = true
                    }
                    this.list = res.rows[0]
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
    .detail{
        min-height: 600px;
        .desc{
            padding: 20px 0;
        }
    }
</style>