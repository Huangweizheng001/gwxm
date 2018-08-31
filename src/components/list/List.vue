<template>
    <div>
        <div v-if="isShowList">
            <router-link :to="{path: this.$router.paht, query: {nid: 1}}" tag="a" target="_blank">测试一下</router-link>
        </div>
        <div v-if="!isShowList">我是详情页</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShowList: true
        }
    },
    create() {
        
    },
    mounted() {
        this.isShowList = this.$route.query.nid == undefined ? true : false
        // console.log(this.$route.query.nid)
    },
    methods: {
        // goTo(id) {
        //     let url = this.$router.path
        //     this.$router.push({path: url, query: {nid: id}})
        // }
    }
}
</script>
