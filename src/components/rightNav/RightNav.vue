<template>
    <div class="rightNav">
        <!-- eslint-disable-next-line -->
        <router-link v-for="(item,index) in array" tag="a" :to="item.path" :key="index">
            <span>{{item.name}}</span>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        array: {
            type: Array,
            default: null
        }
    },
    created() {
        // console.log(this.array)
    }
}
</script>
<style>
    .rightNav{
        padding: 20px;
        background: #ccc
    }
    .rightNav span{
        display: block;
        padding: 20px;
    }
    .router-link-active{
        color:yellow
    }
</style>

